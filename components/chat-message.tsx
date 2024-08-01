export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Hi! I'm a friendly AI assistant. Ask me anything about managing chronic illnesses!",
  },
];

export const responses: { [key: string]: string } = {
  "What are some effective strategies for managing my chronic illness?": "Some effective strategies include...",
  "How can I cope with the emotional stress of living with a chronic illness?": "Coping with emotional stress can be achieved by...",
  "What dietary changes can help improve my condition?": "Dietary changes might include...",
  "How do I communicate my needs to family and friends?": "Communicating your needs effectively can be done by...",
  "What resources are available for financial assistance?": "Financial assistance resources include...",
  "Can you recommend any support groups for my specific condition?": "Support groups can be found through...",
};

export function getResponse(message: string): string {
  if (responses[message]) {
    return responses[message];
  }
  return "I'm sorry, I'm a Chronic Illness Support chatbot. I can only provide solutions for managing chronic illnesses.";
}

export function ChatMessage({ who = "bot", message }: Message) {
  if (!message) {
    return null;
  }

  return (
    <div className={`prompt ${who != "bot" ? "right" : "left"}`}>
      <div>
        <p className="name">{who != "bot" ? "You" : "AI"}</p>
        <p className="msg">{message}</p>
      </div>
    </div>
  );
}
