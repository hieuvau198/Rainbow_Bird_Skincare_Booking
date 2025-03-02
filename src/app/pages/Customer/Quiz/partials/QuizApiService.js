// QuizApiService.js - Centralized API service for quiz-related operations

const API_BASE_URL = "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api";

/**
 * Fetches a quiz by its ID
 * @param {number} quizId - The ID of the quiz to fetch
 * @returns {Promise<Object>} - Quiz data
 */
export const fetchQuiz = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Quiz/${quizId}`);
    if (!response.ok) {
      throw new Error("Không thể tải dữ liệu bài kiểm tra.");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Fetches questions for a quiz
 * @param {number} quizId - The ID of the quiz
 * @returns {Promise<Array>} - Array of question data
 */
export const fetchQuizQuestions = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Question/quiz/${quizId}`);
    if (!response.ok) {
      throw new Error("Không thể tải câu hỏi bài kiểm tra.");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Fetches answers for a question
 * @param {number} questionId - The ID of the question
 * @returns {Promise<Array>} - Array of answer data
 */
export const fetchQuestionAnswers = async (questionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Answer/question/${questionId}`);
    if (!response.ok) {
      throw new Error("Không thể tải câu trả lời.");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Creates a new customer quiz record
 * @param {number} customerId - The ID of the customer
 * @param {number} quizId - The ID of the quiz
 * @returns {Promise<Object>} - Created customer quiz data
 */
export const createCustomerQuiz = async (customerId, quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/CustomerQuiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        quizId
      }),
    });
    
    if (!response.ok) {
      throw new Error("Không thể tạo bản ghi khách hàng làm bài kiểm tra.");
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Records a customer's answer to a question
 * @param {number} customerQuizId - The ID of the customer quiz
 * @param {number} questionId - The ID of the question
 * @param {number} answerId - The ID of the selected answer
 * @param {number} pointsEarned - Points earned for this answer
 * @returns {Promise<Object>} - Created customer answer data
 */
export const recordCustomerAnswer = async (customerQuizId, questionId, answerId, pointsEarned) => {
  try {
    const response = await fetch(`${API_BASE_URL}/CustomerAnswers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerQuizId,
        questionId,
        answerId,
        pointsEarned
      }),
    });
    
    if (!response.ok) {
      throw new Error("Không thể lưu câu trả lời của khách hàng.");
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Fetches quiz recommendations
 * @returns {Promise<Array>} - Array of quiz recommendations
 */
export const fetchQuizRecommendations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/QuizRecommendations`);
    if (!response.ok) {
      throw new Error("Không thể tải danh sách gợi ý.");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Fetches all services
 * @returns {Promise<Array>} - Array of all services
 */
export const fetchAllServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Service`);
    if (!response.ok) {
      throw new Error("Không thể tải danh sách dịch vụ.");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
