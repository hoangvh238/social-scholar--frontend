"use client";
import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

type User = {
  email: string;
  userName : string,
  phone : string,
  role: string,
  token : number,
  level : string,
  activityPoint : number,
};
type AppState = {
  currentUser: User;
};

const initialState: AppState = {
  currentUser: {
    email: "",
    userName: "",
    phone:"",
    role:"",
    level:"",
    activityPoint:0,
    token:0
  },
};

export const counterSlice = createSlice({
  name: "userInfor",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.user;
      setCookie("token", action.payload.token, {
        maxAge: 36000,
      });
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
      setCookie("token", "", { maxAge: 0 });
    },
  },
});

// Action creators được tạo ra cho mỗi hàm reducer
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
