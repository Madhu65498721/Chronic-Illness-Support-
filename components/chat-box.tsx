import { useEffect, useState } from "react";
import { type Message, initialMessages, ChatMessage } from "./chat-message";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "next-openai-chatgpt";

const PreLoader = () => (
  <div className="prompt left">
    <p className="name">AI</p>
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="question">
    <input
      type="text"
      aria-label="chat input"
      required
      value={input}
      placeholder="Type a message to start the conversation"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <button
      type="submit"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Ask
    </button>
  </div>
);

const defaultQuestions = [
  "What are some effective strategies for managing my chronic illness?",
  "How can I cope with the emotional stress of living with a chronic illness?",
  "What dietary changes can help improve my condition?",
  "How do I communicate my needs to family and friends?",
  "What resources are available for financial assistance?",
  "Can you recommend any support groups for my specific condition?",
];

const DefaultQuestions = ({ onClick }: any) => (
  <div className="default-questions">
    {defaultQuestions.map((question, index) => (
      <button key={index} onClick={() => onClick(question)}>
        {question}
      </button>
    ))}
  </div>
);

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  const sendMessage = async (message: string) => {
    setLoading(true);

    const newMessages = [
      ...messages,
      { message: message, who: "user" } as Message,
    ];
    setMessages(newMessages);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
        user: cookie[COOKIE_NAME],
      }),
    });

    const data = await response.json();

    setMessages([
      ...newMessages,
      { message: data.text.trim(), who: "bot" } as Message,
    ]);

    setLoading(false);
  };

  const handleDefaultQuestionClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="dialogue">
      <DefaultQuestions onClick={handleDefaultQuestionClick} />

      {messages.map(({ message, who }, index) => (
        <ChatMessage key={index} who={who} message={message} />
      ))}

      {loading && <PreLoader />}

      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
