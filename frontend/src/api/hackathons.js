import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

export const fetchHackathons = async ({page = 1, limit = 6, searchQuery = ""}) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/hackathons/all-hackathons`, {
            params: { page, limit, search: searchQuery }
        });

        console.log(response.data.data)
        return response.data.data; 
    } catch (error) {
        throw error;
    }
}

export const fetchHackathonDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/hackathons/${id}`);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}

export const createHackathonApi = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/hackathons`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data

    } catch (error) {
        throw error
    }
}