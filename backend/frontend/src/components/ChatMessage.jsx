import "./ChatMessage.css";

function ChatMessage({ sender, text }) {
  return (
    <div className={`message ${sender}`}>

      <div className="message-avatar">
        {sender === "user" ? "👤" : "🤖"}
      </div>

      <div className="message-content">

        <div className="message-name">
          {sender === "user" ? "You" : "NutriGuardian AI"}
        </div>

        <div className="message-text">
          {text.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

      </div>

    </div>
  );
}

export default ChatMessage;