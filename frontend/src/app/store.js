import { configureStore } from "@reduxjs/toolkit";
import hackathonsReducer from "../features/hackathons/hackathonsSlice.js";
// import authReducer from "../features/auth/authSlice.js";

const store = configureStore({
    reducer: {
        hackathons: hackathonsReducer,
        // auth: authReducer,
    },
})

export default store