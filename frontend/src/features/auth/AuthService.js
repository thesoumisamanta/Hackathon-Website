import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/users/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const registerUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/users/register`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
}