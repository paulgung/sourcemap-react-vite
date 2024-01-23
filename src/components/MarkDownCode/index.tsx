import { useEffect, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import styles from "./index.module.css";

marked.setOptions({
  highlight: (code: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

const MarkDownGpt = ({ content }: { content: string }) => {
  const markdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const htest = marked.parse(content);

    if (markdownRef.current) {
      // 使用dangerouslySetInnerHTML将HTML内容设置到div元素中
      markdownRef.current.innerHTML = htest;
    }
  }, [content]);
  return <div ref={markdownRef} className={styles.markdown}></div>;
};

export default MarkDownGpt;
