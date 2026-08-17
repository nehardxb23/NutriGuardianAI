import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "./Agent.css";

function Agent() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // ==========================================
  // Scroll to latest message
  // ==========================================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);


  // ==========================================
  // Welcome message
  // ==========================================

  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: `Hello ${user?.name || ""}! 👋

I'm your NutriGuardian AI Agent.

I can analyze your available nutrition information such as:

• Weight tracking
• Calorie tracking
• Previous meal plans
• Diet goals
• Diet type

Ask me something like:

"How can I gain weight?"
"Am I eating enough calories?"
"How is my weight progressing?"
"How can I improve my diet?"`,
      },
    ]);
  }, [user?.name]);


  // ==========================================
  // Send question to Agent
  // ==========================================

  const runAgent = async (e) => {
    e.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    if (!user?.id) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ User information not found. Please login again.",
        },
      ]);

      return;
    }

    // Show user's question immediately
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: trimmedQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await API.post("/agent/", {
        user_id: user.id,
        question: trimmedQuestion,
      });

      // Show Agent response
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error("Agent Error:", error);

      const errorMessage =
        error.response?.data?.detail ||
        "❌ Unable to connect to NutriGuardian AI Agent. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // Clear current conversation
  // ==========================================

  const clearAgentChat = () => {
    setMessages([
      {
        sender: "ai",
        text: `Hello ${user?.name || ""}! 👋

I'm your NutriGuardian AI Agent.

Ask me anything about your nutrition, weight, calories, meals or diet.`,
      },
    ]);

    setQuestion("");
  };


  return (
    <div className="agent-layout">

      <Sidebar />

      <div className="agent-container">

        {/* Header */}
        <div className="agent-header">

          <h1>🧠 NutriGuardian AI Agent</h1>

          <p>
            Personalized nutrition assistant using your health data
          </p>

          <button
            className="agent-clear-btn"
            onClick={clearAgentChat}
            type="button"
          >
            🗑️ Clear Chat
          </button>

        </div>


        {/* Messages */}
        <div className="agent-messages">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`agent-message ${
                message.sender === "user"
                  ? "user-message"
                  : "ai-message"
              }`}
            >

              <div className="agent-avatar">
                {message.sender === "user" ? "👤" : "🤖"}
              </div>

              <div className="agent-message-content">

                <div className="agent-message-name">
                  {message.sender === "user"
                    ? "You"
                    : "NutriGuardian Agent"}
                </div>

                <div className="agent-message-text">
                  {message.text}
                </div>

              </div>

            </div>
          ))}


          {/* Loading */}
          {loading && (
            <div className="agent-message ai-message">

              <div className="agent-avatar">
                🤖
              </div>

              <div className="agent-message-content">

                <div className="agent-message-name">
                  NutriGuardian Agent
                </div>

                <div className="agent-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>

            </div>
          )}

          <div ref={bottomRef}></div>

        </div>


        {/* Input */}
        <form
          className="agent-input-form"
          onSubmit={runAgent}
        >

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your AI Agent..."
            rows="2"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
          >
            {loading ? "Thinking..." : "Send 🚀"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Agent;