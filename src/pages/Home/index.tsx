import { useState } from "react";
import { Input, Button } from "antd";
import styles from "./index.module.css";
import axios from "axios";

const { TextArea } = Input;

function Home() {
  const [errorStack, setErrorStack] = useState("");
  const [errorStackAnalysis, setErrorStackAnalysis] = useState<{
    res: string;
  }>();

  const handleTroubleshoot = async () => {
    if (!errorStack) return;
    // prompt
    const prompts =
      `请你扮演一名前端工程师,现在有一个紧急线上bug,我给你提供错误栈,请你帮我分析bug原因,以下是错误栈:\n` +
      `${errorStack}\n`;

    const res = await axios.post(
      "https://frontend.myhexin.com/kingfisher/robot/homeworkChat",
      {
        content: prompts,
        source: "homework-47-wangxiaolong",
        token: "610EE45BF-Qtc2VydmU=",
        temperature: 1,
      }
    );
    console.log(res);
    setErrorStackAnalysis(res.data?.data);
  };

  return (
    <div>
      <h1>SOURCE MAP 排障</h1>
      <div className={styles.container}>
        <div className={styles.errorStack}>
          <TextArea
            rows={4}
            cols={8}
            value={errorStack}
            onChange={(e) => setErrorStack(e.target.value)}
            placeholder="请输入错误栈信息："
            allowClear
            autoSize={{ minRows: 14 }}
          />
          <Button
            className={styles.analysisBtn}
            type="primary"
            onClick={handleTroubleshoot}
          >
            排障
          </Button>
        </div>

        <div className={styles.errorStackAnalysis}>
          <div>错误栈排障结果：</div>
          <div>{errorStackAnalysis?.res}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
