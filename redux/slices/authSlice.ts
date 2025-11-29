import { Genders } from "@/app/signup/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  gender: Genders;
  mobileNumber: string;
}

interface AuthState {
  users: User[];
  loggedInUser: User | null;
}

const initialState: AuthState = {
  users: [],
  loggedInUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    login(state, action: PayloadAction<User>) {
      state.loggedInUser = action.payload;
    },
    logout(state) {
      state.loggedInUser = null;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
