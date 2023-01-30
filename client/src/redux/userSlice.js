import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onLogin, onLogout } from "../api/loginApi";

const userFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user);
}


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

export const logout = createAsyncThunk(
    "user/logout",
    async (payload, thunkAPI) => {
        try {
            const response = await onLogout();
            thunkAPI.dispatch(setUser(null));
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: userFromLocalStorage() || null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.data;
                localStorage.setItem('user', JSON.stringify(action.payload.data));
            })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.removeItem('user');
                state.user = null;
            })
    }
});

export const { setUser } = userSlice.actions;
export const selectUser = state => state.user.user;
export const selectIsAuth = state => state.user.user !== null || false;
export default userSlice.reducer;