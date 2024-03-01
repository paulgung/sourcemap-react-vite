import React, { useState, useEffect } from "react";
import { chatWithPrompt, getAlertInfo } from "@/service";
import MarkdownWithHighlight from "@/components/MarkDownCode";
import MyMoniterCSS from "@/pages/MyMoniterCSS";
import styles from "./index.module.css";

const SseTest = () => {
  const [aiAnalysis, setAiAnalysis] = useState("");

  const init = async () => {
    // const { res } = await chatWithPrompt("如何创业成功？企业家的潜质是什么?");
    // setAiAnalysis(res);
    const queryParams = new URLSearchParams(window.location.search);
    const service = queryParams.get("service");
    const from = queryParams.get("from");
    const to = queryParams.get("to");
    console.log("弓少旭想看看 alert,from,to", service, from, to);
    const { res } = await getAlertInfo({
      service: "news-p-fe-anomaly-analysis",
      from: 1707874936152,
      to: 1707874936154,
    });
    console.log("弓少旭想看看res", res);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h2>ELK排障</h2>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <MyMoniterCSS />
        </div>
        <div className={styles.contentRight}>
          <MarkdownWithHighlight content={aiAnalysis} />
        </div>
      </div>
    </div>
  );
};

export default SseTest;
