import axios from "axios";

export const getData = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/todo?userId=${userId}`);
    return response.data.todos;
  } catch (error) {
    throw error;
  }
};