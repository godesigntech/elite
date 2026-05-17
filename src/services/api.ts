import axios from "axios";

const API_BASE_URL = "/api";

export const api = {
  getHealth: async () => {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  },

  getCompetitions: async () => {
    // In a real app, this would fetch from the server
    // For now, we use the mock data in the component
    return [];
  },

  submitScore: async (competitionId: string, score: number, userId: string) => {
    const response = await axios.post(`${API_BASE_URL}/scores/submit`, {
      competitionId,
      score,
      userId,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  },

  getLeaderboard: async (competitionId: string) => {
    const response = await axios.get(`${API_BASE_URL}/competitions/${competitionId}/leaderboard`);
    return response.data;
  }
};
