import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    isAuthonticated:boolean;
    authToken: string | undefined;
    admin:{
        adminName:string;
        email:string;
    }|null
}

const initialState:AuthState={
    authToken:""||undefined,
    isAuthonticated:false,
    admin:{
        adminName:"",
        email:""
    }
}
interface AuthActions {
    isError: boolean;
    authToken: string;
    accessToken: string;
    admin: {
      userName: string;
      email: string;
    };
  }
  

const adminauthSlice=createSlice({
  name:"admin",
  initialState:{...initialState},
  reducers:{
     login:(state,action:PayloadAction<AuthActions> )=>{
        return {
            ...state,
             isAuthenticated: true,
             authToken: action.payload.authToken,
             accessToken: action.payload.accessToken,
            user: action.payload.admin,
           };
     },
     logout:(state)=>{
        return {
            authToken:""||undefined,
            isAuthonticated:false,
            admin:{
                adminName:"",
                email:""
            } 
        }
     }
  }



})