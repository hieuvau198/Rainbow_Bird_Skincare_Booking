import React, { useState } from "react";
import chatBotAI from "../../modules/ChatBot/chatBotAI";
import chatbotImg from "../../assets/img/chatbot.png";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm Prestine Care Assistants. What skincare support do you need?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isBotResponding, setIsBotResponding] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    setIsBotResponding(true);
    setMessages((prev) => [...prev, { sender: "bot", text: "...", loading: true }]);

    const botResponse = await chatBotAI(currentInput);

    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages[newMessages.length - 1]?.loading) {
        newMessages.pop();
      }
      return [...newMessages, { sender: "bot", text: botResponse }];
    });
    setIsBotResponding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[9999]">
      {!isOpen ? (
        <img
          src={chatbotImg}
          alt="Chatbot"
          className="w-16 h-16 bg-lime-500 hover:bg-lime-600 rounded-full shadow-lg cursor-pointer animate-shake"
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <div className="w-96 bg-white rounded-md shadow-xl border transition-all duration-300 absolute bottom-0 right-0 opacity-100 translate-y-0">
          <div className="flex justify-between items-center bg-lime-500 text-white p-3 rounded-t-md">
            <span className="font-semibold">Prestine Care Assistants</span>
            <button onClick={() => setIsOpen(false)} className="text-white">
              ✕
            </button>
          </div>
          <div className="h-96 overflow-y-auto p-3 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${msg.sender === "bot" ? "text-left" : "text-right"}`}
              >
                <div
                  className={`inline-block rounded-xl px-3 py-2 ${
                    msg.sender === "bot" ? "bg-gray-200" : "bg-lime-400 text-white"
                  } ${msg.loading ? "animate-pulse" : ""}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 flex gap-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-md"
            />
            <button
              onClick={sendMessage}
              className="bg-lime-500 text-white rounded-md px-3"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
