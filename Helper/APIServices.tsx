import { PostModel } from "@/Model/PostModel";
import api from "./NetworkManager";
import NetInfo from "@react-native-community/netinfo";
import { STRIPE_API_URL, STRIPE_SECRET } from "@/Utils/Constant";

export const fetchUserData = async (
  userId: string
): Promise<PostModel | null> => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    console.error("No internet connection");
    return null; // Handle no internet connection
  }
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

export const paymentIntent = async (userData: any) => {
  try {
    const response = await api.post(STRIPE_API_URL, userData, {
      baseURL: "",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRIPE_SECRET}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST API Error:", error);
    throw error; // Proper error bubbling for calling component
  }
};
