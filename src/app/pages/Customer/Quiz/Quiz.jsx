import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchActiveQuizzes } from "./quizApi";
import Loading from "../../../components/Loading/Loading";
import { HeartOutlined, SearchOutlined } from "@ant-design/icons";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await fetchActiveQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <Loading />; //
  }

  return (
    <div className="px-24 p-6 min-h-screen bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Explore Our Quizzes</h2>
      <p className="text-center text-gray-600 mb-10">Discover quizzes tailored for your skincare needs</p>

      <div className="space-y-6">
        {quizzes.map((quiz) => (
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-4xl font-semibold text-gray-800">{quiz.name}</h3>
                <div className="flex space-x-3">
                  <HeartOutlined className="text-gray-500 hover:text-red-500 cursor-pointer text-2xl" />
                  <SearchOutlined className="text-gray-500 hover:text-blue-500 cursor-pointer text-2xl" />
                </div>
              </div>

              <p className="text-gray-600 text-sm mt-2">{quiz.description}</p>
              <p className="text-gray-500 text-sm mt-1">Points: {quiz.totalPoints} | {quiz.category}</p>

              <div className="flex items-center mt-4 space-x-4">
                <Link to={`/quiz/${quiz.quizId}`}>
                  <button className="py-2 px-4 bg-lime-500 hover:bg-lime-600 text-white rounded-lg shadow-md transition duration-300">
                    Start Quiz
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
