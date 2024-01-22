import { Layout, Card } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"; // 引入样式
import styles from "./index.module.css";
import MarkdownWithHighlight2 from "../MarkDown2";
const { Content } = Layout;

const MarkDown = () => {
  const test1 = {
    res: "根据给出的源代码，报错位置在第20行第36列。让我们来看看这个报错位置附近的代码。在这里，报错位置是指`value={countData.interception?.project}`。\n\n根据报错位置附近的代码，我们可以看到`countData`是通过`useState`定义的一个状态变量。在第5行，`useState<IDeploymentCount>(DEFAULT_DEPLOYMENT_COUNT as IDeploymentCount)`中，`DEFAULT_DEPLOYMENT_COUNT`是一个对象，包含了`total`和`interception`两个键，每个键对应一个对象。\n\n然而，在第20行中，我们试图获取`countData.interception.project`的值。根据代码，这是一个嵌套的属性访问。问题出在没有正确处理可能的空值。这是一个常见的错误。\n\n为了解决这个问题，我们可以在访问这个属性之前进行判断，确保它没有空值。我们可以使用可选链操作符（optional chaining operator `?.`）来检查嵌套属性是否存在，如果不存在则返回 `undefined`。\n\n对于第20行和第22行，我们可以修改如下：\n\n```javascript\nvalue={countData.interception?.project}\n```\n\n```javascript\nvalue={countData.interception?.deployment}\n```\n\n这样，我们就避免了在空值上尝试访问属性而导致的错误。",
  };

  const test2 = {
    res: '```<Button type="primary" onClick={analyzeCode} className={styles.analyzeButton}>分析代码</Button>```',
  };
  return (
    <Layout>
      <Content className={styles.codeAnalysisContent}>
        {/* 左侧 - 源代码 */}
        <div className={styles.sourceCode}>
          <Card title="源代码">
            <SyntaxHighlighter language="jsx" style={darcula}>
              {`         <Button
            type="primary"
            onClick={analyzeCode}
            className={styles.analyzeButton}
          >
            分析代码
          </Button>`}
            </SyntaxHighlighter>
          </Card>
        </div>
        {/* 右侧 - AI 分析结果 */}

        <div className={styles.errorStackAnalysis}>
          <div>错误栈排障结果：</div>
          <div>
            {/* <ReactMarkdown>{test1.res}</ReactMarkdown> */}
            {/* <ReactMarkdown>```js const a =1```</ReactMarkdown>{" "} */}
            {/* <MarkdownWithHighlight markdownText={test1.res} /> */}
            <MarkdownWithHighlight2 content={test2.res} />
            {/* <Markdown># Hello world!</Markdown> */}
            {/* <Markdown value={markdowntest} renderer={renderer} /> */}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default MarkDown;
