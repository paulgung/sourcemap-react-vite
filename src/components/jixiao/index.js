function matchFirstLine(inputString) {
  // 定义正则表达式，匹配第一个换行符之前的内容
  const regex = /^([^\n]*)/;
  
  // 使用正则表达式匹配字符串
  const match = inputString.match(regex);
  
  // 如果有匹配结果，返回第一个匹配的内容，否则返回整个字符串
  return match[1]
}

// 测试示例
const inputString1 = "This is the first line\nThis is the second line";
const inputString2 = "弓少旭";

console.log(matchFirstLine(inputString1)); // 输出："This is the first line"
console.log(matchFirstLine(inputString2)); // 输出："No newline character in this string"
