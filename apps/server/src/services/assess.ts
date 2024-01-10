import axios from "axios";
import { config } from 'dotenv';
config()


export async function getLocation(ipAddress:any){
    const res=await axios.get(`https://ipinfo.io/${ipAddress}?token=${process.env.IP_INFO_TOKEN}`)
    console.log(res.data)
    return res.data
   //const res=await axios.get(`http://api.ipstack.com/${ipAddress}?access_key=49daef08025aed2b18a3b03edb83da75`)
   //console.log(res.data)
   //return res.data
}

