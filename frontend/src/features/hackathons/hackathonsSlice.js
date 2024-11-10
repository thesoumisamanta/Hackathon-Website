import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHackathons, fetchHackathonDetails, createHackathonApi } from '../../api/hackathons';

export const loadHackathons = createAsyncThunk('hackathons/loadHackathons', async ({ page, limit, searchQuery }, { getState }) => {
    try {
        return await fetchHackathons({ page, limit, searchQuery });
    } catch (error) {
        return error.message
    }
})

export const createHackathon = createAsyncThunk('hackathons/createHackathon', async (formData, { rejectWithValue }) => {
    try {
        return await createHackathonApi(formData);
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const initialState = {
    items: [],
    currentPage: 1,
    hasMore: true,
    searchQuery: '',
    status: 'idle',
}

export const hackathonsSlice = createSlice({
    name: 'hackathons',
    initialState,

    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.items = [];
            state.currentPage = 1;
            state.hasMore = true;

        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadHackathons.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(loadHackathons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const hackathons = action.payload?.docs || []
                if (Array.isArray(hackathons)) {
                    state.items = [...state.items, ...hackathons];
                    state.hasMore = hackathons.length > 0;
                    state.currentPage += 1;
                } else {
                    console.error("Unexpected payload data format:", action.payload);
                }
            })

            .addCase(loadHackathons.rejected, (state, action) => {
                state.status = 'failed';
            })


            .addCase(createHackathon.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(createHackathon.fulfilled, (state, action) => {
                state.status = "succeed";
                state.items.unshift(action.payload);
            })

            .addCase(createHackathon.rejected, (state, action) => {
                state.status = 'failed';
            })
    }

})

export const { setSearchQuery } = hackathonsSlice.actions;

export default hackathonsSlice.reducer;