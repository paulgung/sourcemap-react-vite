import * as fs from 'fs';
import * as path from 'path';
import * as sourceMap from 'source-map';

async function findErrorLocation() {
  try {
    // 构建 .map 文件的绝对路径
    const mapFilePath = path.join('/Users/paulgung/workspace/sourcemap-react-vite/dist/assets/index-zLwRTL1F.js.map');

    // 读取 .map 文件内容
    const rawSourceMap = JSON.parse(fs.readFileSync(mapFilePath, 'utf-8'));

    console.log(rawSourceMap)
    // 创建 SourceMapConsumer 对象
    await new sourceMap.SourceMapConsumer(rawSourceMap)
      .then(consumer => {
        // 替换为实际的报错行数和列数
        const errorLine = 1;
        const errorColumn = 1123;

        // 查找报错位置
        const errorPosition = consumer.originalPositionFor({
          line: errorLine,
          column: errorColumn,
        });

        // 输出报错位置
        console.log(`报错位置：${errorPosition.source}:${errorPosition.line}:${errorPosition.column}`);
      });
  } catch (error) {
    console.error('Error analyzing source map:', error);
  }
}

// 执行函数来查找报错位置
findErrorLocation();
