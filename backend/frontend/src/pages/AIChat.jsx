import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import API from "../services/api";
import "./AIChat.css";

function AIChat() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello ${user?.name || ""}! 👋

I'm your AI Nutrition Assistant.

You can ask me about:

• Healthy diet plans
• Weight loss
• Weight gain
• Calories
• Protein
• Vitamins
• Exercise nutrition
• Healthy recipes

How can I help you today?`,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Send message to AI
  const sendMessage = async (question) => {
    // Make sure user is logged in
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

    const userMessage = {
      sender: "user",
      text: question,
    };

    // Show user's message immediately
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      // Send user_id + question to backend
      const response = await API.post("/chatbot/", {
        user_id: user.id,
        question: question,
      });

      const aiMessage = {
        sender: "ai",
        text: response.data.answer,
      };

      // Show AI response
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);

      let errorMessage =
        "❌ Unable to connect to NutriGuardian AI. Please try again.";

      // Show backend error when available
      if (error.response?.data?.detail) {
        errorMessage = `❌ ${error.response.data.detail}`;
      }

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

  // Clear current chat
  const clearChat = () => {
    setMessages([
      {
        sender: "ai",
        text: `Hello ${user?.name || ""}! 👋

I'm your AI Nutrition Assistant.

Ask me anything about nutrition, healthy foods, calories or meal planning.`,
      },
    ]);
  };

  return (
    <div className="ai-layout">
      <Sidebar clearChat={clearChat} />

      <div className="chat-section">
        {/* Header */}
        <div className="chat-header">
          <h1>🥗 NutriGuardian AI</h1>
          <p>AI Nutrition Assistant</p>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              sender={message.sender}
              text={message.text}
            />
          ))}

          {/* Typing Animation */}
          {loading && (
            <div className="typing-container">
              <div className="typing-avatar">🤖</div>

              <div className="typing-box">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Chat Input */}
        <ChatInput
          onSend={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default AIChat;