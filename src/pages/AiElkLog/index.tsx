import React, { useState, useEffect } from "react";
import { chatWithPrompt, getAlertInfo } from "@/service";
import MarkdownWithHighlight from "@/components/MarkDownCode";
import MyMoniterCSS from "@/pages/MyMoniterCSS";
import styles from "./index.module.css";
import { map, omit, pickBy, pick } from "lodash";

const SseTest = () => {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [alertInfo, setAlertInfo] = useState([]);
  
  // chat with prompt
  const chatGpt = async () => {
    const prompt =
      `请你扮演一名程序员,现在有一个紧急线上bug,我给你提供最近一天的告警日志,请你帮我分析bug原因,以下是日志中的报错信息:\n` +
      `${errorStack}\n`;
    const {
      data: { res },
    } = await chatWithPrompt(prompt);
    setAiAnalysis(res);
  };

  // 过滤告警信息
  const handleAlertData = (hits) => {
    const originalAlertData = hits.map((item) => {
      return item._source;
      //
    });
    return originalAlertData.map((obj) =>
      pickBy(obj, (value) => value !== "" && value !== 0)
    );
  };

  // 获取告警信息中的错误栈以及message
  const handleAlertDataV2 = (hits) => {
    return map(hits, (obj) =>
      omit(obj, [
        "grade",
        "category",
        "uniqueId",
        "subGroup",
        "indexTime",
        "elkIndexTime",
        "sdkVersion",
      ])
    );
  };

  // 获取告警信息
  const getAlert = async () => {
    // 获取URL参数
    const queryParams = new URLSearchParams(window.location.search);
    const service = queryParams.get("service");
    const from = queryParams.get("from");
    const to = queryParams.get("to");

    // 获取告警实例信息
    console.log("弓少旭想看看 alert,from,to", service, from, to);
    const {
      hits: { hits },
    } = await getAlertInfo({
      service: service ?? "",
      from: from ?? 0,
      to: to ?? 0,
    });
    console.log("弓少旭想看看hits", hits);
    const alertInfo = handleAlertData(hits);
    const alertInfoV2: any = handleAlertDataV2(alertInfo);
    setAlertInfo(alertInfoV2);
  };
  useEffect(() => {
    getAlert();
  }, []);

  return (
    <div>
      <h2>ELK排障</h2>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <MyMoniterCSS alertInfo={alertInfo} />
        </div>
        <div className={styles.contentRight}>
          <MarkdownWithHighlight content={aiAnalysis} />
        </div>
      </div>
    </div>
  );
};

export default SseTest;
