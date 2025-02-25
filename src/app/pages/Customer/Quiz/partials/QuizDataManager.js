// QuizDataManager.js - Handles quiz data loading and processing

import { 
    fetchQuiz, 
    fetchQuizQuestions, 
    fetchQuestionAnswers,
    createCustomerQuiz,
    recordCustomerAnswer 
  } from './QuizApiService';
  
  /**
   * Loads a complete quiz with questions and answers
   * @param {number} quizId - The ID of the quiz to load
   * @returns {Promise<Object>} - Processed quiz data ready for UI
   */
  export const loadFullQuizData = async (quizId) => {
    try {
      // 1. Fetch basic quiz data
      const quizData = await fetchQuiz(quizId);
      
      // 2. Fetch questions for this quiz
      const questionsData = await fetchQuizQuestions(quizId);
      
      // 3. Fetch answers for each question
      const questionsWithAnswers = await Promise.all(
        questionsData.map(async (question) => {
          const answers = await fetchQuestionAnswers(question.questionId);
          return {
            ...question,
            answers: answers
          };
        })
      );
      
      // 4. Format quiz data for UI
      return {
        quizId: quizData.quizId,
        name: quizData.name,
        description: quizData.description,
        category: quizData.category,
        totalPoints: quizData.totalPoints,
        isActive: quizData.isActive,
        createdAt: quizData.createdAt,
        questions: questionsWithAnswers.map(q => ({
          questionId: q.questionId,
          content: q.content,
          points: q.points,
          isMultipleChoice: q.isMultipleChoice,
          displayOrder: q.displayOrder,
          answers: q.answers.map(a => ({
            answerId: a.answerId,
            content: a.content,
            points: a.points,
            isCorrect: a.points > 0 // Assuming answers with points > 0 are correct
          }))
        }))
      };
    } catch (error) {
      throw new Error(`Error loading quiz data: ${error.message}`);
    }
  };
  
  /**
   * Starts a customer quiz session
   * @param {number} customerId - The ID of the customer
   * @param {number} quizId - The ID of the quiz
   * @returns {Promise<number>} - The ID of the created customer quiz
   */
  export const startCustomerQuiz = async (customerId, quizId) => {
    try {
      const result = await createCustomerQuiz(customerId, quizId);
      return result.customerQuizId || result.id; // Depending on what your API returns
    } catch (error) {
      throw new Error(`Error starting quiz: ${error.message}`);
    }
  };
  
  /**
   * Submits a customer's answer to a question
   * @param {number} customerQuizId - The ID of the customer quiz
   * @param {number} questionId - The ID of the question
   * @param {number} answerId - The ID of the selected answer
   * @param {number} pointsEarned - Points earned for this answer
   * @returns {Promise<Object>} - Result of the submission
   */
  export const submitCustomerAnswer = async (customerQuizId, questionId, answerId, pointsEarned) => {
    try {
      return await recordCustomerAnswer(
        customerQuizId,
        questionId,
        answerId,
        pointsEarned
      );
    } catch (error) {
      throw new Error(`Error submitting answer: ${error.message}`);
    }
  };