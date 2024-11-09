import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

export const fetchHackathons = async ({page = 1, limit = 6, searchQuery = ""}) => {
    try {
        const response = await axios.get(`${API_URL}/hackathons`, {
            params: {
                page,
                limit,
                search: searchQuery
            }
        });
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const fetchHackathonDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/hackathons/${id}`);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}