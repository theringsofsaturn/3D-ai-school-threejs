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
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Type your question..."
            className="chat-input"
          />
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      )}
      {teacherResponse && (
        <div className="chat-box">
          <p className="teacher-response">{teacherResponse}</p>
        </div>
      )}
    </div>
  );
};
