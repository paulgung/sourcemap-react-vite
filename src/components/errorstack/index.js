const log = `Uncaught (in promise) Error: Unknown Component: interaction.tooltipThumb
    at In (helper.js:33:11)
    at l (library.js:20:32)
    at eval (library.js:24:16)
    at CO (plot.js:402:25)
    at eval (plot.js:195:41)
    at Generator.next (<anonymous>)
    at m (plot.asd.js:4:58)`;

const regex = /\(([^\s()]+):(\d+):(\d+)\)/g;
// let match;
// while ((match = regex.exec(log)) !== null) {
//   const fileName = match[1];
//   const lineNumber = match[2];
//   const columnNumber = match[3];

//   console.log(
//     `文件名: ${fileName}, 行号: ${lineNumber}, 列号: ${columnNumber}`
//   );
// }

// 正则匹配所有错误栈文件和位置信息
const matches = [];
const seenFileNames = new Set();
let match;
while ((match = regex.exec(log)) !== null) {
  const fileName = match[1];

  // 检查是否已经处理过这个fileName
  if (seenFileNames.has(fileName)) {
    continue; // 如果已经处理过，跳过当前匹配
  }

  // 添加新的匹配结果，并记录fileName
  matches.push({
    fileName,
    line: match[2],
    column: match[3],
  });
  seenFileNames.add(fileName);
}
console.log(matches)
// 前端校验
const regex_fe = /at.*?\d+:\d+/;
const res = regex_fe.test(log) && log.length <= 2500;
console.log("正则校验结果：", res);
