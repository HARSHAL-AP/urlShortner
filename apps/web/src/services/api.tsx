import axios, { AxiosResponse, AxiosError } from "axios";


const url=process.env.REACT_APP_APILINK
const getData = async (path: string): Promise<any> => {
 
  try {
    const res: AxiosResponse = await axios.get(`${url}${path}`, {
      withCredentials: true, 
    });
   
    return res.data;
  } catch (error) {
   
    console.error("Error fetching data:", error);
    throw error;
  }
};

const postData = async (data: any, path: string): Promise<any> => {
  try {
    const res: AxiosResponse = await axios.post(`${url}${path}`, data, {
      withCredentials: true,
    });
  
    
    return res.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

const updateData=async(data:any,path:string):Promise<any>=>{
 try {
   const res:AxiosResponse=await axios.patch(`${url}${path}`, data, {
    withCredentials: true,
  });
  
  return res.data;

} catch (error) {
  console.error("Error posting data:", error);
    throw error;
 }



}
const deletData=async(path:string):Promise<any>=>{
  try {
    const res:AxiosResponse=await axios.delete(`${url}${path}`,{
     withCredentials: true,
   });
   
   return res.data;
 
 } catch (error) {
   console.error("Error posting data:", error);
     throw error;
  }
 
 
 
 }
 
const userLogout = async ( path: string): Promise<any> => {
  try {
    const res: AxiosResponse = await axios.get(`${url}${path}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};


 
export { getData, postData ,updateData,deletData,userLogout};
