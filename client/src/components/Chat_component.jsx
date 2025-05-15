import React, { useState } from "react";
import axios from "axios";

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: message,
      });
      const botResponse = { sender: "bot", text: res.data.response };
      setChatHistory((prev) => [...prev, botResponse]);
    } catch (err) {
      const errorResponse = {
        sender: "bot",
        text: "Something went wrong. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorResponse]);
    } finally {
      setLoading(false);
      setMessage(""); // Clear input automatically
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 16px",
            borderRadius: "30px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          Chat with us 🌿
        </button>
      )}

      {/* Chat Dialog */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "320px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            maxHeight: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <strong>EcoBliss Chatbot</strong>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Chat History */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              marginBottom: "8px",
              padding: "8px",
              backgroundColor: "#f9f9f9",
              borderRadius: "6px",
            }}
          >
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "6px",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 10px",
                    borderRadius: "12px",
                    backgroundColor:
                      msg.sender === "user" ? "#dcf8c6" : "#ececec",
                    color: "#333",
                    maxWidth: "90%",
                  }}
                >
                  <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <textarea
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              resize: "none",
              padding: "6px",
              width: "100%",
              marginBottom: "6px",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
