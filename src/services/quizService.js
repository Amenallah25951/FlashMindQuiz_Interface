import api from './api';

export const quizService = {
  // Récupérer tous les quiz publics
  getPublicQuizzes: async () => {
    const response = await api.get('/quizzes/public');
    return response.data;
  },

  // Récupérer un quiz par code
  getQuizByCode: async (code) => {
    const response = await api.get(`/quizzes/code/${code}`);
    return response.data;
  },

  // Récupérer un quiz par ID
  getQuizById: async (id) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  // Récupérer les questions d'un quiz
  getQuizQuestions: async (quizId) => {
    const response = await api.get(`/quizzes/${quizId}/questions`);
    return response.data;
  },

  // Soumettre les réponses du quiz
  submitQuizAnswers: async (quizId, data) => {
    const response = await api.post(`/quizzes/${quizId}/submit`, data);
    return response.data;
  },

  // Démarrer un quiz
  startQuiz: async (quizId) => {
    const response = await api.post(`/quizzes/${quizId}/start`);
    return response.data;
  }
};