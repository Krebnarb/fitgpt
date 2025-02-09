import React, { useEffect, useState } from "react";

const socket = new WebSocket("ws://localhost:3000/updates");

const Python = () => {
  const [messages, setMessages] = useState<{ agent: string; message: string }[]>([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    };
  }, []);

  return (
    <div>
      <h1>LangChain Agent Updates</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.agent}: {msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Python;
