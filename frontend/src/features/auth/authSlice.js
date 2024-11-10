import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./AuthService";

const initialState = {
    user: null,
    error: null,
    status: "idle",
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
    try {
        return await loginUser(credentials);
    } catch (error) {
        throw error;
    }
});

export const register = createAsyncThunk("auth/register", async (userInfo) => {
    try {
        return await registerUser(userInfo);
    } catch (error) {
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;