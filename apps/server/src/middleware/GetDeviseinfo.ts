import { Request, Response, NextFunction } from "express";
import UAParser from "ua-parser-js";
import { getLocation } from "../services/assess";
import IPinfoWrapper, { IPinfo, AsnResponse } from "node-ipinfo";
import env from "../config/env";
const ipinfoWrapper = new IPinfoWrapper(env.IP_INFO_TOKEN);

const verifyDevice = async(req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get("user-agent");
  const uaParser = new UAParser(userAgent);
  const ip=req.ip;
 
  const deviceInfo = {
    type: uaParser.getDevice().type || "unknown",
    browser: uaParser.getBrowser().name || "unknown",
    version: uaParser.getBrowser().version || "unknown",
    os: uaParser.getOS().name || "unknown",
  };
  
  const locationio= await getLocation(ip)
  let refloc:any={
    
    ip:locationio.ip|| 'unknown',
    city:locationio.city|| 'unknown',
    region:locationio.region|| 'unknown',
    country:locationio.country|| 'unknown',
    loc:locationio.loc||'unknown',
    org:locationio.org|| 'unknown',
    postal:locationio.postal||'unknown',
    timezone:locationio.timezone||'unknown',
  }
  req.body.locationInfo={...refloc}
  req.body.deviceInfo = deviceInfo;

  next();
};

export default verifyDevice;


function getlocate(ip:any){

  ipinfoWrapper.lookupIp(ip).then((response: IPinfo) => {
  return response
   });
}
