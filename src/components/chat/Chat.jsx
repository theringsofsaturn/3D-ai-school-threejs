import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

export const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/chatgpt",
        {
          message: userInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const generatedText = response.data.response;
      setChatHistory([...chatHistory, { user: userInput, bot: generatedText }]);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleClear = () => {
    setChatHistory([]);
    setUserInput("");
  };

  return (
    <div className="chat-component">
      <button className="chat-button" onClick={toggleInput}>
        {showInput ? "Close Chat" : "Ask a Question"}
      </button>
      {showInput && (
        <div className={`chat-box ${showInput ? "show" : ""}`}>
          <div id="container">
            <div className="container-inner">
              <div className="content">
                {chatHistory.length === 0 ? (
                  <p className="welcome-message">
                    Welcome to the chat! Ask a question to start a conversation
                    with the Teacher Emilian.
                  </p>
                ) : (
                  chatHistory.map((chat, index) => (
                    <div key={index}>
                      <p className="user-message">
                        <strong>You:</strong> {chat.user}
                      </p>
                      <p className="teacher-response">
                        <strong>ChatGPT:</strong> {chat.bot}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="input-container">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    placeholder="Type your message..."
                    required
                  />
                  <button type="submit" disabled={loading}>
                    <i className="send-icon">{loading ? "Sending..." : "➤"}</i>
                    <span>Send</span>
                  </button>
                </form>
              </div>
              {chatHistory.length > 0 && (
                <div className="buttons">
                  <button
                    type="button"
                    className="confirm"
                    onClick={toggleInput}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="cancel"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
