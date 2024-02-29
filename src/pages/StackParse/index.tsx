import { Layout, Card } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"; // 引入样式
import styles from "./index.module.css";

const { Content } = Layout;

const CodeAnalysis = () => {
  return (
    <Layout>
      <Content className={styles.codeAnalysisContent}>
        {/* 左侧 - 源代码 */}
        <div className={styles.sourceCode}>
          <Card title="源代码">
            <div id="abc">
              <SyntaxHighlighter language="jsx" style={darcula}>
                {`         <Button
            type="primary"
            onClick={analyzeCode}
            className={styles.analyzeButton}
          >
            分析代码
          </Button>`}
              </SyntaxHighlighter>
            </div>
          </Card>
        </div>
        {/* 右侧 - AI 分析结果 */}

        <div className={styles.errorStackAnalysis}>
          <div>错误栈排障结果：</div>
          <div>1231231212312312</div>
        </div>
      </Content>
    </Layout>
  );
};

export default CodeAnalysis;
