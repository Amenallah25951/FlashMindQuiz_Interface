import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

// Configuration d'Axios avec intercepteur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  // Inscription
  async signup(userData) {
    try {
      const response = await api.post("/signup", userData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  },

  // Connexion
  async login(email, password) {
    try {
      const response = await api.post("/login", { email, password });
      const { token, refreshToken, username, role, firstName, lastName } =
        response.data;

      // Sauvegarder les informations dans localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  },

  // Vérification d'email
  async verifyEmail(token) {
    try {
      const response = await api.get(`/verify-email?token=${token}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      throw error;
    }
  },

  // Renvoyer l'email de vérification
  async resendVerificationEmail(email) {
    try {
      const response = await api.post("/resend-verification", { email });
      return response.data;
    } catch (error) {
      console.error("Erreur lors du renvoi de l'email:", error);
      throw error;
    }
  },

  // ========== NOUVELLES MÉTHODES POUR RESET PASSWORD ==========

  // Demander une réinitialisation de mot de passe
  async requestPasswordReset(email) {
    try {
      const response = await api.post("/forgot-password", { email });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation:", error);
      throw error;
    }
  },

  // Valider le token de réinitialisation
  async validateResetToken(token) {
    try {
      const response = await api.get(`/validate-reset-token?token=${token}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la validation du token:", error);
      throw error;
    }
  },

  // Réinitialiser le mot de passe
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post("/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe:",
        error
      );
      throw error;
    }
  },

  // ========== FIN NOUVELLES MÉTHODES ==========

  // Déconnexion
  async logout() {
    try {
      const email = localStorage.getItem("email");
      if (email) {
        await api.post("/logout", { email });
      }

      // Nettoyer le localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      window.location.href = "/";

      return true;
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      localStorage.clear();
      throw error;
    }
  },

  // Rafraîchir le token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("Aucun refresh token disponible");
      }

      const response = await api.post("/refresh-token", { refreshToken });
      const { token: newToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      return response.data;
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token:", error);
      // Si le refresh échoue, déconnecter l'utilisateur
      this.logout();
      throw error;
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  },

  // Obtenir les informations de l'utilisateur connecté
  getCurrentUser() {
    return {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    };
  },

  // Obtenir le rôle de l'utilisateur
  getUserRole() {
    return localStorage.getItem("role");
  },

  // Redirection selon le rôle
  redirectToDashboard(role) {
    if (role === "student") {
      window.location.href = "/student/dashboard";
    } else if (role === "professor") {
      window.location.href = "/professor/dashboard";
    } else if (role == "admin") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/dashboard";
    }
  },
};

export default authService;
