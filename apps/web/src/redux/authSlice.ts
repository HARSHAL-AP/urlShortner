import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  authToken: string | undefined;
  accessToken: string | undefined;
  user: {
    userName: string;
    email: string;
  } | null;
}

interface AuthActions {
  isError: boolean;
  authToken: string;
  accessToken: string;
  user: {
    userName: string;
    email: string;
  };
}

const initialState: AuthState = {
  isAuthenticated:!!localStorage.getItem("isAuth"),
  accessToken:localStorage.getItem('accessToken')|| undefined,
  authToken: localStorage.getItem('authToken') || undefined,
  user: null,
};

const authSlice = createSlice({
  name: "auth", 
  initialState: { ...initialState },
  reducers: {
    login: (state, action: PayloadAction<AuthActions>) => {
      console.log(action.payload)
     localStorage.setItem("accessToken", action.payload.authToken);
     localStorage.setItem("authToken", action.payload.accessToken);
     localStorage.setItem("isAuth",String(true))
     return {
      ...state,
       isAuthenticated: true,
       authToken: action.payload.authToken,
       accessToken: action.payload.accessToken,
      user: action.payload.user,
     };
    },
    checkAuth: (state, action: PayloadAction<AuthActions>) => {
      localStorage.setItem("authToken", action.payload.authToken);
      localStorage.setItem("isAuth",String(true))
      localStorage.setItem("accessToken", action.payload.authToken);
      return {
        ...state,
        isAuthenticated: true,
        authToken: action.payload.authToken,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuth");
      return {
        isAuthenticated: false,
        accessToken: undefined,
        authToken: undefined,
        user: null,
      };
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
