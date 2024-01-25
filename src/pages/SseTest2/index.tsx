import React, { useState, useEffect } from "react";

const SseTest = () => {

  useEffect(() => {
    // 创建一个新的 EventSource 实例连接到 SSE 端点
    const chatWithPrompt = (prompt: string): Promise<any> => {
      const sseUrl = 'http://localhost:3000/chat-gpt/sse-post';

      const dialogId = await this.getDialogId();
      console.log("弓少旭想看看dialogId", dialogId);

      const form = new FormData();
      form.append("model", "pass");
      form.append("dialogId", dialogId);
      form.append("content", prompt);

      console.log("弓少旭想看看form", form);

      fetchEventSource(sseUrl, {
        method: "POST",
        body: form,
        signal: this.signal,
        openWhenHidden: true, // 控制切换时不关闭sse链接
        onopen(res) {
          if (res.status !== 200) {
            return Promise.reject();
          }
          return Promise.resolve();
        },
        onmessage(ev) {
          this.handleMessage(ev);
        },
      });

      return this.content;
    };
  }, []);

  return (
    <div>
      <h2>SSE Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SseTest;
