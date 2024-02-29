import * as fs from "fs";
import * as path from "path";
import * as sourceMap from "source-map";

async function findErrorLocation() {
  try {
    // 构建 .map 文件的绝对路径
    const mapFilePath = path.join(
      "/Users/paulgung/workspace/sourcemap-react-vite/dist/assets/index-hew3n7rW.js.map"
    );

    // 读取 .map 文件内容
    const rawSourceMap = JSON.parse(fs.readFileSync(mapFilePath, "utf-8"));

    // 创建 SourceMapConsumer 对象
    await new sourceMap.SourceMapConsumer(rawSourceMap).then((consumer) => {
      // 替换为实际的报错行数和列数
      const errorLine = 40;
      const errorColumn = 57484;

      // 通过源映射查找源代码位置
      const originalPosition = consumer.originalPositionFor({
        line: errorLine, // 替换为你要查找的行号
        column: errorColumn, // 替换为你要查找的列号
      });

      console.log("originalPosition", originalPosition);
      // 使用源映射还原源代码
      const originalSource = consumer.sourceContentFor(originalPosition.source);

      console.log("originalSource", originalSource);
      const sourceLines = originalSource.split("\n");

      let codes = ``;
      for (let i = 0; i < sourceLines.length; i++) {
        const line = sourceLines[i];
        const lineNumber = 1 + i;
        codes += `${lineNumber}: ${line}\n`;
      }

      const prompts =
        `请你扮演一名前端工程师,现在有一个紧急线上bug,我给你提供源代码,以及报错位置(行数以及列数),请你帮我找出代码bug,以下是源代码:\n` +
        `${codes}\n` +
        `报错代码行数：${originalPosition.line},\n` +
        `报错代码列数：${originalPosition.column}`;

      console.log(prompts);
      consumer.destroy();
    });
  } catch (error) {
    console.error("Error analyzing source map:", error + "\n");
  }
}

// 执行函数来查找报错位置
findErrorLocation();
