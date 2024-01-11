import { parse } from 'stacktrace-parser';

try {
  // 抛出一个自定义错误
  throw new Error('This is a custom error message');
} catch (error) {
  // 使用 stacktrace-parser 解析错误堆栈
  const stackFrames = parse(error.stack);

  // 遍历解析后的堆栈帧
  stackFrames.forEach((frame) => {
    console.log(`Function: ${frame.methodName}`);
    console.log(`File: ${frame.fileName}`);
    console.log(`Line: ${frame.lineNumber}`);
    console.log(`Column: ${frame.column}`);
  });
}
