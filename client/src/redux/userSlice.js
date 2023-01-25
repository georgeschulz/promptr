import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onLogin } from "../api/loginApi";

export const login = createAsyncThunk(
    "user/login",
    async (payload, thunkAPI) => {
        try {
            const { email, password } = payload;
            const response = await onLogin(email, password);
            const user = response.data.data;
            thunkAPI.dispatch(setUser(user));
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
export const selectUser = state => state.user.user;
export default userSlice.reducer;