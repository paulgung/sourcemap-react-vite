import React, { useState, useEffect } from "react";
import { chatWithPrompt, getAlertInfo } from "@/service";
import MarkdownWithHighlight from "@/components/MarkDownCode";
import MyMoniterCSS from "@/pages/MyMoniterCSS";
import styles from "./index.module.css";
import { map, pickBy, pick } from "lodash";
import { Spin } from "antd";
import dayjs from "dayjs";

// http://localhost:5174/aielk?service=news-p-fe-anomaly-analysis&from=1&to=1707874936154

interface IAlertInfo {
  service: string;
  group: string;
  errorUrl: string;
  stack: string;
  message: string;
  log_time: string;
}

const SseTest = () => {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [alertInfoList, setAlertInfoList] = useState<IAlertInfo[]>([]);
  const [loading, setLoading] = useState(false);

  // AI分析elk
  const aiAnalysisElk = async (elkString: string) => {
    setLoading(true);
    const prompt =
      `请你扮演一名程序员,现在有一个紧急线上bug,我给你提供最近一天的告警日志,请你帮我分析bug原因,以下是日志中的报错信息:\n` +
      `${elkString}\n`;
    console.log("弓少旭想看看prompt", prompt);
    const {
      data: { res },
    } = await chatWithPrompt(prompt);
    setAiAnalysis(res);
    setLoading(false);
  };

  // 过滤告警信息, 剔除空数据
  const handleAlertData = (hits: { _source: any }[]) => {
    const _sourceList = hits.map((item) => {
      return item._source;
    });
    const alertDataList = _sourceList.map((obj) =>
      pickBy(obj, (value) => value !== "" && value !== 0)
    );

    return map(alertDataList, (obj) => {
      obj.log_time = dayjs(obj?.log_time).format("YYYY-MM-DD HH:mm:ss");

      return pick(obj, [
        "service",
        "group",
        "errorUrl",
        "stack",
        "message",
        "log_time",
      ]);
    });
  };

  // 获取告警信息
  const getAlert = async () => {
    // 获取URL参数
    const queryParams = new URLSearchParams(window.location.search);
    const service = queryParams.get("service");
    const from = queryParams.get("from");
    const to = queryParams.get("to");

    // 获取告警实例信息
    const {
      hits: { hits },
    } = await getAlertInfo({
      service: service ?? "",
      from: from ?? 0,
      to: to ?? 0,
    });

    const alertInfoList = handleAlertData(hits);
    setAlertInfoList(alertInfoList);
  };
  useEffect(() => {
    getAlert();
  }, []);

  useEffect(() => {
    if (!alertInfoList.length) return;
    // ELK信息
    const concatenatedMessages = alertInfoList
      .map((obj, index) => `${index + 1}: ${obj.message}`)
      .join(", ");

    aiAnalysisElk(concatenatedMessages);
  }, [alertInfoList]);
  return (
    <div>
      <h2>ELK排障</h2>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <MyMoniterCSS alertInfoList={alertInfoList} />
        </div>
        <div className={styles.contentRight}>
          <Spin spinning={loading}>
            <MarkdownWithHighlight content={aiAnalysis} />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default SseTest;
