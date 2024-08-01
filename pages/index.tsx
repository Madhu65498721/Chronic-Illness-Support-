import { ChatBox } from "../components/chat-box";

function Home() {
  return (
    <div className="wrapper">
      <section>
        <h1>Chronic Illness Support Chatbot</h1>
        <p>
          Welcome to the Chronic Illness Support Chatbot.I am here to provide support and answer your questions related to managing chronic illnesses.
        </p>
      </section>
      <section>
        <ChatBox />
      </section>
    </div>
  );
}

export default Home;
