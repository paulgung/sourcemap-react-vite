import React, { useState, useEffect } from "react";
import { ChatWithPrompt } from "@/components/chatgpt";
const SseTest = () => {
  const [aiAnalysis, setAiAnalysis] = useState("");

  const getChatId222 = async () => {
    ChatWithPrompt("如何创业成功？企业家的潜质是什么",setAiAnalysis);
  };
  useEffect(() => {
    getChatId222();
  }, []);

  return (
    <div>
      <h2>AI排障</h2>
      <div>{aiAnalysis}</div>
    </div>
  );
};

export default SseTest;
