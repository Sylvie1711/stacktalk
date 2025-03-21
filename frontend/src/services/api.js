import axios from 'axios';

const USER_API = 'http://localhost:5000/user';
const QNA_API = 'http://localhost:5001/questions';

// User Service
export const userService = {
  // Create or fetch user
  createUser: async (username) => {
    const response = await axios.post(USER_API, { username });
    return response.data;
  },

  // Check if username is available
  checkUsername: async (username) => {
    const response = await axios.get(`${USER_API}/check/${username}`);
    return response.data;
  },

  // Get user by username
  getUser: async (username) => {
    const response = await axios.get(`${USER_API}/${username}`);
    return response.data;
  }
};

// QnA Service
export const qnaService = {
  // Get all questions
  getAllQuestions: async () => {
    const response = await axios.get(QNA_API);
    return response.data;
  },

  // Get a specific question
  getQuestion: async (id) => {
    const response = await axios.get(`${QNA_API}/${id}`);
    return response.data;
  },

  // Create a new question
  createQuestion: async (questionData) => {
    const response = await axios.post(QNA_API, questionData);
    return response.data;
  },

  // Add an answer to a question
  addAnswer: async (questionId, answerData) => {
    const response = await axios.post(`${QNA_API}/${questionId}/answers`, answerData);
    return response.data;
  },

  // Get questions by username
  getUserQuestions: async (username) => {
    const response = await axios.get(`${QNA_API}/user/${username}`);
    return response.data;
  }
}; 