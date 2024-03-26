import React from "react";

function TextWithLinks(text: string) {
  const parsedText = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );

  // 使用dangerouslySetInnerHTML将解析后的文本作为 HTML 渲染
  return <div dangerouslySetInnerHTML={{ __html: parsedText }} />;
}

const str = "这是一段包含[xxxx](https://example.com)的文字。";

const App = () => <div>{TextWithLinks(str)}</div>;

export default App;
