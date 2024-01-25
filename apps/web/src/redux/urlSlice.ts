import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

interface UrlState {
  urls: any;
  analytics: any;
  singleurl:{
    url:any;
    devices:any;
    locations:any;
    statsForLastthirtyDays:any;
  }
  tag:any;
}

const initialState: UrlState = {
  urls: [],
  analytics: {},
  singleurl:{
    url:{},
    devices:[],
    locations:[],
    statsForLastthirtyDays:[],
  },
  tag:[],
};

const urlSlice = createSlice({
  name: "urls",
  initialState: { ...initialState },
  reducers: {
    getUrl: (state, action) => {
      return {
        ...initialState,
        urls: action.payload,
      };
    },
    getAllstats: (state, action) => {
      return {
        ...initialState,
        analytics: action.payload,
      };
    },
    getSinleurl:(state,action)=>{
      return {
        ...initialState,
        singleurl:action.payload
      }
    },
    getalltags:(state,action)=>{
      return {
        ...initialState,
        tags:action.payload
      }
    }
  },
});

export const { getUrl, getAllstats ,getSinleurl} = urlSlice.actions;
export default urlSlice.reducer;
