import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHackathons, fetchHackathonDetails, createHackathonApi } from '../../api/hackathons';

// Fetch hackathons based on pagination and search query
export const loadHackathons = createAsyncThunk('hackathons/loadHackathons', async ({ page, limit, searchQuery }, { getState }) => {
    try {
        const data = await fetchHackathons({ page, limit, searchQuery });
        return data;  // Assuming `data` is the correct shape
    } catch (error) {
        return Promise.reject(error.message);  // Return the error message to be handled in the `rejected` state
    }
});

// Create a new hackathon
export const createHackathon = createAsyncThunk('hackathons/createHackathon', async (formData, { rejectWithValue }) => {
    try {
        const newHackathon = await createHackathonApi(formData);
        return newHackathon;  // Return the created hackathon to add to the state
    } catch (error) {
        return rejectWithValue(error.message);  // Return the error message to be handled in the `rejected` state
    }
});

// Initial state
const initialState = {
    items: [],
    currentPage: 1,
    hasMore: true,
    searchQuery: '',
    status: 'idle',  // idle, loading, succeeded, failed
    error: null,  // Store error message in case of failed requests
};

// Slice definition
export const hackathonsSlice = createSlice({
    name: 'hackathons',
    initialState,

    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.items = [];  // Reset hackathons on search query change
            state.currentPage = 1;  // Reset page on new search
            state.hasMore = true;  // Reset pagination state
        }
    },

    extraReducers: (builder) => {
        // Load hackathons actions
        builder
            .addCase(loadHackathons.pending, (state) => {
                state.status = 'loading';
                state.error = null;  // Reset error on new request
            })
            .addCase(loadHackathons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const hackathons = action.payload?.docs || [];
                if (Array.isArray(hackathons)) {
                    // Filter out duplicate hackathons based on _id
                    const uniqueHackathons = hackathons.filter(
                        (hackathon) => !state.items.some((existing) => existing._id === hackathon._id)
                    );
                    
                    // Append unique hackathons to the state
                    state.items = [...state.items, ...uniqueHackathons];  
                    state.hasMore = uniqueHackathons.length > 0;  // Check if there are more hackathons
                    state.currentPage += 1;  // Update current page after successful load
                } else {
                    console.error("Unexpected payload data format:", action.payload);
                }
            })
            .addCase(loadHackathons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;  // Save the error message
            })

        // Create hackathon actions
        builder
            .addCase(createHackathon.pending, (state) => {
                state.status = 'loading';
                state.error = null;  // Reset error on new request
            })
            .addCase(createHackathon.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.unshift(action.payload);  // Add the new hackathon to the front
            })
            .addCase(createHackathon.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;  // Save the error message
            });
    }
});

// Export the search query action
export const { setSearchQuery } = hackathonsSlice.actions;

export default hackathonsSlice.reducer;
