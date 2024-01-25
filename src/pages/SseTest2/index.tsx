import React, { useState, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
const controller = new AbortController();
const signal = controller.signal;
let content = "";
const handleMessage = (stream: any) => {
  const { choices, id } = JSON.parse(stream.data) as any;

  // 兼容新消息 可能会没有choices
  if (!choices?.length) return;

  const firstChoice = choices[0];

  if (["stop", "length", "error"].includes(firstChoice.finish_reason)) {
    controller.abort();
  } else {
    // 处理消息内容
    content += firstChoice.delta.content;
    console.log("弓少旭想看看content", content);
    if (firstChoice.delta.cmpStatus === "error") {
      controller.abort();
    }
  }
};
const chatWithPrompt = (prompt: string) => {
  const sseUrl = "http://localhost:3000/chat-gpt/sse-post";

  const form = new FormData();
  form.append("prompt", prompt);

  console.log("弓少旭想看看form", form);

  fetchEventSource(sseUrl, {
    method: "POST",
    body: form,
    signal: signal,
    openWhenHidden: true, // 控制切换时不关闭sse链接
    onopen(res) {
      if (res.status !== 200) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    onmessage(ev) {
      handleMessage(ev);
    },
  });

  return content;
};

const SseTest = () => {
  useEffect(() => {
    chatWithPrompt("VUE3有哪些特性");
  }, []);

  return (
    <div>
      <h2>SSE Messages</h2>
    </div>
  );
};

export default SseTest;
