import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

export const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [teacherResponse, setTeacherResponse] = useState("");
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
      setTeacherResponse(generatedText);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="chat-component">
      <button className="chat-button" onClick={toggleInput}>
        {showInput ? "Close Chat" : "Ask a Question"}
      </button>
      {showInput && (
        <div className={`chat-form ${showInput ? "show" : ""}`}>
          <div id="cover">
            <form onSubmit={handleSubmit}>
              <div className="tb">
                <div className="td">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    placeholder="Type your message..."
                    required
                  />
                  <button type="submit" disabled={loading}>
                    <i className="send-icon">{loading ? "Sending..." : "➤"}</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {teacherResponse && (
        <div className={`chat-box ${teacherResponse ? "show" : ""}`}>
          <div id="container">
            <div className="container-inner">
              <div className="content">
                <p className="teacher-response">{teacherResponse}</p>
              </div>
              <div className="buttons">
                <button type="button" className="confirm">
                  Close
                </button>
                <button type="button" className="cancel">
                  New Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
