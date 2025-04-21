import { PostModel } from "@/Model/PostModel";
import api from "./NetworkManager";

export const fetchUserData = async (
  userId: string
): Promise<PostModel | null> => {
  try {
    const response = await api.get(`posts/${userId}`);
    return response.data as PostModel; // validate structure here
  } catch (error) {
    console.error("GET API Error:", error);
    throw error; // Proper error bubbling for calling component
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("POST API Error:", error);
    throw error; // Proper error bubbling for calling component
  }
};
