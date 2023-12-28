import axios from "axios";
import { config } from 'dotenv';
config()


export async function getLocation(ipAddress:any){
    const res=await axios.get(`https://ipinfo.io/${ipAddress}?token=${process.env.IP_INFO_TOKEN}`)
    console.log(res.data)
    return res.data
}