import React from 'react';
import { HeartOutlined, SearchOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from 'react-router-dom';

export default function QuizCard(quiz) {
    const navigate = useNavigate();
    const location = useLocation();
    const handleDoQuiz = (quizId) => {
        const token = Cookies.get("__atok");
        if (token) {
            navigate(`/quiz/${quizId}`)
        } else {
            navigate("/login", { state: { from: location } });
        }
    };

    return (
        <div
            key={quiz.quizId}
            className="flex flex-col md:flex-row items-center bg-white border border-lime-200 shadow-md rounded-xl overflow-hidden transition duration-300 hover:border-lime-400"
        >
            {/* Ảnh Quiz */}
            <div className="md:w-1/3 w-full relative">
                <img src={quiz.imageUrl} alt={quiz.name} className="w-full h-72 object-cover border border-lime-200 rounded-md shadow-sm hover:scale-105" />
            </div>

            {/* Nội dung Quiz */}
            <div className="md:w-2/3 w-full p-6">
                <div className="flex justify-start items-center mb-4">
                    <h3 className="text-4xl font-semibold text-gray-800">{quiz.name}</h3>
                </div>

                <p className="text-gray-600 text-sm mt-2">{quiz.description}</p>
                <p className="text-gray-500 text-sm mt-1">Points: {quiz.totalPoints} | {quiz.category}</p>

                <div className="flex items-center mt-4 space-x-4">
                    <button
                        className="py-2 px-4 bg-lime-500 hover:bg-lime-600 text-white rounded-lg shadow-md transition duration-300"
                        onClick={() => handleDoQuiz(quiz.quizId)}
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    )
}
