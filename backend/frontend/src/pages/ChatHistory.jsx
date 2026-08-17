import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "./ChatHistory.css";

function ChatHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    if (!user?.id) {
      setError("❌ Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await API.get(`/chat-history/${user.id}`);

      console.log("Chat History:", response.data);

      setHistory(response.data);
    } catch (error) {
      console.error("Chat History Error:", error);

      setError(
        error.response?.data?.detail ||
          "❌ Unable to load chat history."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-layout">
      <Sidebar />

      <div className="history-container">

        {/* Header */}
        <div className="history-header">
          <h1>💬 Chat History</h1>

          <p>
            View your previous conversations with NutriGuardian AI
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="history-message">
            <h2>⏳ Loading...</h2>
            <p>Fetching your conversations.</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="history-message error-message">
            {error}
          </div>
        )}

        {/* Empty history */}
        {!loading && !error && history.length === 0 && (
          <div className="history-message">
            <h2>📭 No Chat History</h2>

            <p>
              Your AI conversations will appear here after you
              chat with NutriGuardian AI.
            </p>
          </div>
        )}

        {/* Chat history */}
        {!loading && !error && history.length > 0 && (
          <div className="history-list">

            {history.map((chat) => (
              <div
                className="history-card"
                key={chat.id}
              >

                {/* Date */}
                <div className="history-date">
                  {chat.created_at
                    ? new Date(chat.created_at).toLocaleString()
                    : "Date unavailable"}
                </div>

                {/* Question */}
                <div className="history-question">
                  <div className="message-label">
                    👤 You
                  </div>

                  <p>{chat.question}</p>
                </div>

                {/* Answer */}
                <div className="history-answer">
                  <div className="message-label">
                    🤖 NutriGuardian AI
                  </div>

                  <p>{chat.answer}</p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default ChatHistory;