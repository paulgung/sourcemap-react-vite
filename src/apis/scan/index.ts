import { globSync } from 'glob'
import { map, delay } from 'bluebird'
import { getLog } from '@king-fisher/inspection-core' 
import { uploadSourceMapFile, saveSourceMapData } from '..'
import { IOssData, ISourceMapData } from '../../interface'
import { createReadStream, unlinkSync } from 'fs'


// 获取所有的sourceMap数据
const getAllSourceMap = (dist: string) => {
  const mapFiles: string[] = globSync('**/*.map', {
    cwd: dist,
    absolute: true,
  })
  return mapFiles
}

const getSourceMapData = (sourceMapFilePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(sourceMapFilePath, {
      highWaterMark: 1024,
    })

    let content = ''

    stream.on('data', (chunk) => {
      content += chunk.toString()
    })

    stream.on('end', () => {
      resolve(content)
    })

    stream.on('err', (error) => {
      reject(error)
    })
  })
}

const getOriginFilePath = async (sourceMapFilePath: string) => {
  try {
    const data = await getSourceMapData(sourceMapFilePath)
    const json = JSON.parse(data)
    const { file } = json
    return file
  } catch (e) {
    console.log(e)
    return ''
  }
}

// 组装oss上报数据
const makeSourceMapData = (originFilePath: string, ossData: IOssData): ISourceMapData => {
  const { Location: sourceMapPath, Key: sourceMapKey } = ossData
  // 获取全局变量
  const envs = getLog('envs')
  const {
    GRONE_TRIGGER_REPO_ALIAS: biz_tree_name,
    CI_PROGRAM_VERSION,
    CI_BUILD_NUMBER,
    CI_PROGRAM_BUILD_VERSION: program_build_version,
    DRONE_COMMIT_SHA: commit_id,
    DRONE_REPO_NAMESPACE: repo_namespace,
    DRONE_REPO_NAME: repo_name,
    CI_BUILD_NUMBER: build_number,
  } = envs

  const sourceMapData: ISourceMapData = {
    sourceMapPath,
    sourceMapKey,
    sourceFilePath: originFilePath,
    biz_tree_name,
    program_version: `${CI_PROGRAM_VERSION}.${CI_BUILD_NUMBER}`,
    program_build_version,
    commit_id,
    repo_namespace,
    repo_name,
    build_number,
  }
  return sourceMapData 
}

// 存储sourceMap文件，并上报数据
const sourceMapStore = async (dist: string) => {
  const files = getAllSourceMap(dist)
  // 遍历处理文件，支持并发
  await map(files, async (filePath: string) => {
    const originFilePath = await getOriginFilePath(filePath)
    // 如果源地址不存在，就不做处理
    if (originFilePath === '') {
      return
    }

    try {
      // 上传到oss
      const ossData = await uploadSourceMapFile(filePath)

      // 组装数据
      const data = makeSourceMapData(originFilePath, ossData)

      // 上报到数据库
      await saveSourceMapData(data)
      // 删除SourceMap文件
      unlinkSync(filePath)

      await delay(100)
    } catch (e) {
      console.log(e)
    }
  }, {
    concurrency: 1,
  })

  // 返回是否存在sourceMap即可
  return files.length !== 0
}

export {
  getAllSourceMap,
  sourceMapStore,
}
