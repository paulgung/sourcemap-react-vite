import fetch from "node-fetch";
import { readFileSync } from "fs";

const api = {
  UPLOAD_FILE:
    "https://occ-test.10jqka.com.cn/loki/api/sourcemap/v1/file/upload",
  SAVE_DATA: "https://occ-test.10jqka.com.cn/loki/api/sourcemap/v1/file/save",
};

// 上传sourceMap
const uploadSourceMapFile = async (filePath) => {
  const filename = filePath.substring(filePath.lastIndexOf("/") + 1);
  const file = readFileSync(filePath, "base64");
  let ossData = {};
  const params = {
    file,
    filename,
  };

  const res = await fetch(api.UPLOAD_FILE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const result = await res.json();

  const { data, status_code } = result;

  if (status_code === 0) {
    ossData = data;
  }

  return ossData;
};

// 保存依赖数据
const saveSourceMapData = async (body) => {
  const response = await fetch(api.SAVE_DATA, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json());
  return data.data;
};
const ossData = await uploadSourceMapFile("/Users/paulgung/workspace/sourcemap-react-vite/src/apis/umi.315e23b8.js.map");
console.log(ossData)
// // 组装数据
// const data = makeSourceMapData(originFilePath, ossData);

// // 上报到数据库
// await saveSourceMapData(data);
console.log(111);
export { uploadSourceMapFile, saveSourceMapData };
