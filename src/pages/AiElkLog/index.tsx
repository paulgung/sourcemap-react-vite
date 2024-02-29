import React, { useState, useEffect } from "react";

const SseTest = () => {
  const [messages, setMessages] = useState<{ message: string }[]>([]);

  useEffect(() => {
    // 创建一个新的 EventSource 实例连接到 SSE 端点
    const eventSource = new EventSource("http://localhost:3000/chat-gpt/sse"); // 替换为您的 SSE 端点 URL

    // 监听消息事件
    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log("新消息:", newMessage); // 打印最新的消息
      setMessages((prev) => [...prev, newMessage]);
    };

    // 监听错误事件
    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    // 清理函数
    return () => {
      eventSource.close();
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
