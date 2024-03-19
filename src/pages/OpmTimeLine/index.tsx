import React from "react";

function renderJumpLinks(str: string) {
  // 匹配字符串中的 [跳转](地址) 格式
  const regex = /\[跳转\]\((.*?)\)/g;
  return str.split(regex).map((part, index) => {
    if (index % 2 === 0) {
      // 文本部分
      return <span key={index}>{part}</span>;
    } else {
      // 链接部分
      const url = part.substring(part.indexOf("(") + 1, part.indexOf(")"));
      return (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
  });
}

function OpmTimeLine() {
  const str = "这是一段包含[跳转](https://example.com)的文字。";
  const renderedContent = renderJumpLinks(str);

  return <div>{renderedContent}</div>;
}

export default OpmTimeLine;
