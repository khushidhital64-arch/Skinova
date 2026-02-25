import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");

  // Fetch all questions
  useEffect(() => {
    axios.get("http://localhost:3001/api/chat/questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.error("Failed to fetch questions:", err));
  }, []);

  // Get answer when user clicks a question
  const sendQuestion = (q) => {
    axios.post("http://localhost:3001/api/chat/answer", { question: q })
      .then(res => setAnswer(res.data.answer))
      .catch(err => console.error("Failed to fetch answer:", err));
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Help Center</h2>

      <div className="space-y-2">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => sendQuestion(q.question)}
            className="block w-full text-left p-2 border rounded hover:bg-gray-100"
          >
            {q.question}
          </button>
        ))}
      </div>

      {answer && (
        <div className="mt-5 p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;