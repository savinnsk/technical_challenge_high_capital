import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:5202",
  headers: {
    "Content-Type": "application/json",
  },
});


function handleResponseWithToken(response: any) {
  if (response.data?.acessToken) return response.data.acessToken;
  throw new Error("Erro na autorização");
}

function handleResponseAuthenticated(response: any) {
  if (response.data?.authenticated) return response.data.authenticated;
  throw new Error("Erro na autorização");
}

export const authorization = async (formData: { password: string; email: string }) => {
  try {
    const response = await api.post("/api/v1/Authorization", formData);
    return handleResponseWithToken(response);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const validadeToken = async (token: string) => {
  try {
    const response = await api.get("/api/v1/Authorization/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponseAuthenticated(response);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const createUser = async (formData: { password: string; email: string; name: string }) => {
  try {
    const response = await api.post("/api/v1/Users", formData);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getChatboots = async (token: string) => {
  try {
    const response = await api.get("/api/v1/Chatbots", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getOneChatboots = async (data: { id: string; token: string }) => {
  try {
    const response = await api.get(`/api/v1/Chatbots/${data.id}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteOneChatboots = async (data: { id: string; token: string }) => {
  try {
    const response = await api.delete(`/api/v1/Chatbots/${data.id}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const createChatboots = async (
  token: string,
  formData: { name: string; context: string }
) => {
  try {
    const response = await api.post("/api/v1/Chatbots", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const createMessage = async (
  token: string,
  formData: { chatBotId: string; content: string }
) => {
  try {
    const response = await api.post("/api/v1/Messages", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getAllMessagesFromBot = async (token: string, chatBotId: string) => {
  try {
    const response = await api.get(`/api/v1/Messages/${chatBotId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
