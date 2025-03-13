import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import QuizCard from "./partials/QuizCard";
import QuizHistory from "./partials/QuizHistory";
import { fetchActiveQuizzes } from "./quizApi";
import Cookies from "js-cookie";

const Quiz = () => {
  const token = Cookies.get("__atok");
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
    return <Loading />;
  }

  return (
    <div className="px-24 p-6 min-h-screen bg-white">
      <div>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Explore Our Quizzes
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Discover quizzes tailored for your skincare needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className={`space-y-6 transition-all duration-500 ${token ? "col-span-2" : "col-span-3"}`}
        >
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.quizId} {...quiz} />
          ))}
        </div>

        {token ? (
          <div className="col-span-1">
            <QuizHistory />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Quiz;
