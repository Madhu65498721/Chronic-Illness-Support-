export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Hi! I'm a friendly AI assistant specialized in Chronic Illness Support. How can I help you today?",
  },
];

const responses = {
  "What are some effective strategies for managing my chronic illness?": "Some effective strategies for managing chronic illness include adhering to your treatment plan, maintaining a healthy lifestyle, staying active, and seeking support from healthcare professionals and support groups.",
  "How can I cope with the emotional stress of living with a chronic illness?": "Coping with the emotional stress of living with a chronic illness can involve practicing mindfulness, seeking counseling or therapy, joining support groups, and finding hobbies or activities that bring joy.",
  "What dietary changes can help improve my condition?": "Dietary changes that may help improve your condition include eating a balanced diet rich in fruits, vegetables, lean proteins, and whole grains. It's also important to stay hydrated and limit processed foods and sugars.",
  "How do I communicate my needs to family and friends?": "Communicating your needs to family and friends involves being honest and clear about your condition, expressing your needs and limitations, and asking for specific support. It can also be helpful to provide them with information about your illness.",
  "What resources are available for financial assistance?": "Resources for financial assistance can include government programs, non-profit organizations, patient assistance programs, and community resources. Your healthcare provider or social worker may also have information on available support.",
  "Can you recommend any support groups for my specific condition?": "I can help you find support groups specific to your condition. Please let me know your condition, and I will provide some recommendations.",
};

export function ChatMessage({ who = "bot", message }: Message) {
  if (!message) {
    return null;
  }

  return (
    <div className={`prompt ${who !== "bot" ? "right" : "left"}`}>
      <div>
        <p className="name">{who !== "bot" ? "You" : "AI"}</p>
        <p className="msg">{message}</p>
      </div>
    </div>
  );
}

// Function to get response for a given question or handle unrelated questions
export function getResponse(message: string): string {
  if (responses[message]) {
    return responses[message];
  }
  return "I'm sorry, I'm a Chronic Illness Support chatbot. I can only provide solutions for managing chronic illnesses.";
}
