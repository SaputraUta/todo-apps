import axios from "axios";

export const getData = async (userId: string) => {
  try {
    const response = await axios.get(`https://todo-apps-ochre.vercel.app/api/todo?userId=${userId}`);
    return response.data.todos;
  } catch (error) {
    throw error;
  }
};