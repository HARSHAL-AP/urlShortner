import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

interface UrlState{
  urls:any;
  analytics:any;
}


const initialState:UrlState={
    urls:[],
    analytics:{}
}

const urlSlice=createSlice({
    name:"urls",
    initialState:{...initialState},
    reducers:{
      getUrl:(state,action)=>{
       // console.log(action.payload)
        return {
            ...initialState,
            urls:action.payload
        }
      },
      getAllstats:(state,action)=>{
        return {
          ...initialState,
          analytics:action.payload
        }
      }





    }
})


export const {getUrl,getAllstats}=urlSlice.actions;
export default urlSlice.reducer;