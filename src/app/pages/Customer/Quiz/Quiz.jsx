import React, { useState } from "react";
import mockData from "./mock_quiz.json"; // Import JSON file

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // Trạng thái kiểm tra đã bắt đầu hay chưa

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);

    if (currentQuestion + 1 < mockData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getSkinType = () => {
    const counts = { oily: 0, dry: 0, normal: 0, combination: 0, sensitive: 0 };

    answers.forEach((answer) => {
      if (answer.includes("Oily")) counts.oily++;
      if (answer.includes("Dry")) counts.dry++;
      if (answer.includes("Smooth") || answer.includes("balanced")) counts.normal++;
      if (answer.includes("T-zone")) counts.combination++;
      if (answer.includes("Red") || answer.includes("Irritated")) counts.sensitive++;
    });

    const maxType = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    const skinTypeMap = {
      oily: "Oily Skin SHIT",
      dry: "Dry Skin",
      normal: "Normal Skin",
      combination: "Combination Skin",
      sensitive: "Sensitive Skin",
    };

    return skinTypeMap[maxType] || "Unknown Skin Type";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cream">
      <div className="bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col items-center">
        {!quizStarted ? (
          // Màn hình mở đầu
          <div className="w-full max-w-2xl p-8 text-center min-h-[250px]">
            <h2 className="text-2xl font-bold text-gray-900">What's Your Skin Type?</h2>
            <p className="text-gray-700 mt-2">
              Knowing your skin type can help you learn how to take care of your skin, 
              create the right skincare routine, and address any skin concerns you may be experiencing. 
              Take this quiz to find out if you have dry, oily, combination, normal, or sensitive skin.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="mt-6 px-6 py-3 bg-purple-900 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition"
            >
              Start
            </button>
          </div>
        ) : !showResult ? (
          // Phần câu hỏi quiz
          <div className="w-full max-w-2xl p-8 min-h-[550px]">
            {/* Số câu hỏi */}
            <div className="text-white bg-purple-900 w-fit px-4 py-1 rounded-full mb-4">
              {currentQuestion + 1}/{mockData.questions.length}
            </div>
            
            {/* Câu hỏi */}
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {mockData.questions[currentQuestion].question}
            </h2>

            {/* Danh sách đáp án */}
            <div className="space-y-3">
              {mockData.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full px-4 py-3 border-2 border-purple-900 text-gray-900 rounded-lg hover:bg-purple-100 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Kết quả
          <div className="w-full max-w-full p-8 text-center min-h-[250px]">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Skin Type:
            </h2>
            <p className="text-lg mt-2">{getSkinType()}</p>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setShowResult(false);
                setQuizStarted(false); // Quay lại màn hình mở đầu
              }}
              className="mt-4 px-6 py-3 bg-purple-900 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
