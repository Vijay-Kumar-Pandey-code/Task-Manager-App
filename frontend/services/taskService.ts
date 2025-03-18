import axios from "axios";

const API_URL = "/api/tasks"; // ✅ Uses Next.js proxy to call backend API

// ✅ Function to fetch tasks from the backend
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

