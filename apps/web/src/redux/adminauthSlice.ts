import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    isAuthonticated:boolean;
    admin:{
        adminName:string;
        email:string;
    }|null
}

const initialState:AuthState={
   
    isAuthonticated:false,
    admin:{
        adminName:"",
        email:""
    }
}


const adminauthSlice=createSlice({
  name:"admin",
  initialState:{...initialState},
  reducers:{
     login:(state,action:PayloadAction )=>{

     }




  }



})