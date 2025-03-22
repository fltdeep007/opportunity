import api from "./api";

export const userService = {
  async getAllUsers() {
    try {
      const response = await api.get("/users");
      return response.data.map((user) => ({
        ...user,
      }));
    } catch (error) {
      console.log("Error fetching Users", error);
      throw error;
    }
  },

  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      const userData = {
        ...response.data,
      };
      return userData;
    } catch (error) {
      console.log(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  async addUser(user) {
    try {
      const response = await api.post("/users", user);
      return response.data;
    } catch (error) {
      console.log("Error Adding User", error);
      throw error;
    }
  },

  async updateUser(id, user) {
    try {
      const response = await api.put(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.log(`Error updating user with user id ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error deleting user with user id ${id}:`, error);
      throw error;
    }
  },
};
