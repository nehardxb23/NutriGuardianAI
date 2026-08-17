import { useState } from "react";
import "./ChatInput.css";

function ChatInput({ onSend, loading }) {
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    if (!question.trim()) return;

    onSend(question);
    setQuestion("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">

      <input
        type="text"
        className="chat-input"
        placeholder="Ask anything about nutrition..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="send-btn"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? "..." : "➤"}
      </button>

    </div>
  );
}

export default ChatInput;