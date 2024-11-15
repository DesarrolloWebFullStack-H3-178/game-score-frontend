import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: any | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ token: string; user: any }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        clearAuthData: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;