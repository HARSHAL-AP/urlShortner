import { Request, Response } from "express";
import shortid from "shortid";
import Url from "../model/url.model";
import User from "../model/user.model";
import { getLocation } from "../services/assess";
import env from "../config/env";
import { SortOrder } from "mongoose";
import { UserAgent } from "express-useragent";
import { join } from "path";
import { readFileSync } from "fs";

interface DeviceData {
  _id: string;
  totalClicks: number;
}
interface AccessLog {
  device: {
    type: string;
    browser: string;
    version: string;
    os: string;
    platform: string;
  };
  _id: string;
  ipAddress: string;
  location: string;
  timestamp: string;
}

class UrlController {
  //For Geting all urls
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await Url.find();
      res.status(200).json({
        isError: false,
        data,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  //For Shorning Url
  async shortenUrl(req: Request, res: Response): Promise<void> {
    const {
      originalUrl,
      tags,
      title,
      linkDescription,
      accessToken,
      expiryDate,
    } = req.body;

    if (!originalUrl) {
      res
        .status(400)
        .json({ error: true, errorlog: "Original URL is required" });
    }

    const shortUrl = shortid.generate();
    const createdByIp = req.ip;

    const urlData: { [key: string]: any } = {
      originalUrl,
      shortUrl,
      accessToken,
      createdByIp,
    };

    if (tags) urlData.tags = tags;
    if (title) urlData.title = title;
    if (linkDescription) urlData.linkDescription = linkDescription;
    if (expiryDate) urlData.expiryDate = expiryDate;

    const url = new Url(urlData);

    try {
      await url.save();
      res.status(200).json({ isError: false, url });
    } catch (error) {
      console.error("Error shortening URL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  //For Redirecting with shorturl
  async redirectToOriginalUrl(req: Request, res: Response): Promise<void> {
    try {
      const { shortUrl } = req.params;
      const url = await Url.findOne({ shortUrl });

      if (url) {
        if (url.expiryDate && url.expiryDate < new Date()) {
         
          const htmlContent = readFileSync('./xpage.html', 'utf-8');
          
          res.status(403).send(htmlContent);
        } else {
          const accesinfo: any = {
            ipAddress: req.ip ?? "Unknown",
            location: "Unknown",
            timestamp: new Date().toISOString(),
          };

          url.accessCount += 1;
          url.accessLogs.push(accesinfo);

          await url.save();

          res.redirect(url.originalUrl.toString());
        }
      } else {
        res.status(404).json({ error: "URL not found" });
      }
    } catch (error) {
      console.error("Error redirecting to original URL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  //For geting data about urls with shortenid of url
  async geturldata(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { accessToken } = req.query;

    try {
      const currentDate = new Date();
      const statsForLastSevenDays = [];

      const url = await Url.findById({ _id: id, accessToken });

      if (!url) {
        res.status(404).json({ error: "URL not found" });
        return;
      }

      for (let i = 0; i < 30; i++) {
        const currentDateStart = new Date(currentDate);
        currentDateStart.setDate(currentDate.getDate() - i);
        currentDateStart.setHours(0, 0, 0, 0);

        const currentDateEnd = new Date(currentDateStart);
        currentDateEnd.setHours(23, 59, 59, 999);

        const totalClicksForCurrentDay = await Url.aggregate([
          {
            $match: {
              _id: id,
              "accessLogs.timestamp": {
                $gte: currentDateStart,
                $lte: currentDateEnd,
              },
            },
          },
          {
            $group: {
              _id: null,
              totalClicks: { $sum: "$accessCount" },
              urls: { $push: "$$ROOT" },
            },
          },
        ]);

        const dayName = currentDateStart.toLocaleDateString("en-US", {
          weekday: "short",
        });

        statsForLastSevenDays.push({
          date: currentDateStart.toISOString().split("T")[0],
          dayName,
          totalClicksForCurrentDay:
            totalClicksForCurrentDay.length > 0
              ? totalClicksForCurrentDay[0].totalClicks
              : 0,
        });
      }
      const { locations, devices } = calculateFrequency(url.accessLogs);

      res.status(200).json({
        url,
        statsForLastthirtyDays: statsForLastSevenDays,
        locations,
        devices,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
   
  async geturlwithshortid(req: Request, res: Response): Promise<void> {
    const { shortUrl } = req.params;
    const { accessToken } = req.query;
    try {
      
      const url :any= await Url.findById({shortUrl, accessToken });

      if (!url) {
        res.status(404).json({ error: "URL not found" });
        return;
      }
      const data={
        originalUrl:url.originalUrl,
        shortUrl:url.shortUrl,
        title:url.title,
       
        linkDescription:url.linkDescription,
        accessCount:url.accessCount,
       
        tags:url.tags,
        expiryDate: url.expiryDate,
       }
    
      res.status(200).json({
        isError:"false",
        data
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }

  }

  //update url
  async updateUrl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { originalUrl, title, tags, linkDescription, expiryDate } =req.body;

     
      const url=await Url.findByIdAndUpdate({_id:id},{ originalUrl, title, tags, linkDescription, expiryDate })

      if (url) {
        res.status(200).json({ updatedUrl: url });
      } else {
        res.status(404).json({ error: "URL not found" });
      }
    } catch (error) {
      console.error("Error updating URL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  //deleting specific Url
  async deleteUrl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const url = await Url.findByIdAndDelete({_id:id})

      if (url) {
        res.status(200).json({ deletedUrl: url });
      } else {
        res.status(404).json({ error: "URL not found" });
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
 
 
  // For Searching Url
  async searchUrls(req: Request, res: Response): Promise<void> {
    try {
      const { searchTerm } = req.params;
      const { accessToken } = req.query;
  
      const urls = await Url.find({
        accessToken,
        $or: [
          { shortUrl: { $regex: '\\b' + searchTerm, $options: 'i' } },
          { title: { $regex: '\\b' + searchTerm, $options: 'i' } },
          { tags: { $in: [searchTerm] } },
        ],
      });
  
  
      res.status(200).json({ isError: false, data: urls });
    } catch (error) {
      console.error("Error searching URLs:", error);
      res.status(500).json({ error: "Internal Server Error"});
    }
  }
  // for getting all tags associated with accesstoken
  async getalltags(req: Request, res: Response): Promise<void> {
    const { accessToken } = req.body;

    try {
      const tags = await Url.distinct("tags", { accessToken });

      res.status(200).json({ isError: false, data: tags.filter(Boolean) });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // For Getting all urls by accestoken
  async getallUrlsByaccessToken(req: Request, res: Response): Promise<void> {
    const { accessToken } = req.body;
  const { tags, startDate, endDate, search,sort } = req.query;

  try {
    let query: any = { accessToken };

    if (tags && typeof tags === "string") {
      query.tags = { $in: tags.split(",") };
    }
    if (startDate && typeof startDate === "string") {
      const parsedStartDate = new Date(`${startDate}T00:00:00.000Z`);
      query.createdAt= { $gte: parsedStartDate };
    }

    if (endDate && typeof endDate === "string") {
      const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);
      if (query.createdAt) {
       
        query.createdAt.$lte = parsedEndDate;
      } else {
        
        query.createdAt= { $lte: parsedEndDate };
      }
    }
    if (search && typeof search === "string") {
     
      query.$or =[
        { shortUrl: { $regex: '\\b' + search, $options: 'i' } },
        { title: { $regex: '\\b' + search, $options: 'i' } },
        { tags: { $in: [search] } },
      ];
    }
    
    const sortOptions: { [key: string]: number } = {};
    if (sort && typeof sort === "string") {
      switch (sort) {
        case "created_date":
          sortOptions.createdAt = -1; // Sort by latest createdAt
          break;
        case "expiry_date":
          sortOptions.expiryDate = -1; // Sort by latest expiryDate
          break;
        case "total_clicks_high":
          sortOptions.accessCount = -1; // Sort by total clicks high to low
          break;
        case "total_clicks_low":
          sortOptions.accessCount = 1; // Sort by total clicks low to high
          break;
        case "title_asc":
          sortOptions.title = 1; // Sort titles in ascending order
          break;
        case "title_desc":
          sortOptions.title = -1; // Sort titles in descending order
          break;
       
      }
    }


    const data = await Url.find(query).sort(sortOptions as any);
    res.status(200).json({ isError: false, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  }

  //For geting statistic fo rtodyas data
  async getTodaysStats(req: Request, res: Response): Promise<void> {
    const { accessToken } = req.body;

    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      // Retrieve today's generated new URLs
      const newUrls = await Url.find({
        createdAt: { $gte: todayStart, $lte: todayEnd },
        accessToken,
      });

      // Retrieve today's total clicks with access logs
      const totalClicksToday = await Url.aggregate([
        {
          $match: {
            "accessLogs.timestamp": { $gte: todayStart, $lte: todayEnd },
          },
        },
        {
          $group: {
            _id: null,
            totalClicks: { $sum: "$accessCount" },
            urls: { $push: "$$ROOT" },
          },
        },
      ]);

      const expiringUrls = await Url.find({
        expiryDate: { $gte: todayStart, $lte: todayEnd },
        accessToken,
      });

      res.status(200).json({
        newUrls,
        totalClicksToday:
          totalClicksToday.length > 0 ? totalClicksToday[0].totalClicks : 0,
        expiringUrls,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getWeaklysStats(req: Request, res: Response): Promise<void> {
    const { accessToken } = req.body;

    try {
      const currentDate = new Date();

      const statsForLastSevenDays = [];

      for (let i = 0; i < 7; i++) {
        const currentDateStart = new Date(currentDate);
        currentDateStart.setDate(currentDate.getDate() - i);
        currentDateStart.setHours(0, 0, 0, 0);

        const currentDateEnd = new Date(currentDateStart);
        currentDateEnd.setHours(23, 59, 59, 999);

        const newUrls = await Url.find({
          createdAt: { $gte: currentDateStart, $lte: currentDateEnd },
          accessToken,
        });

        const totalClicksForCurrentDay = await Url.aggregate([
          {
            $match: {
              "accessLogs.timestamp": {
                $gte: currentDateStart,
                $lte: currentDateEnd,
              },
            },
          },
          {
            $group: {
              _id: null,
              totalClicks: { $sum: "$accessCount" },
              urls: { $push: "$$ROOT" },
            },
          },
        ]);

        const expiringUrls = await Url.find({
          expiryDate: { $gte: currentDateStart, $lte: currentDateEnd },
          accessToken,
        });

        const dayName = currentDateStart.toLocaleDateString("en-US", {
          weekday: "short",
        });

        statsForLastSevenDays.push({
          date: currentDateStart.toISOString().split("T")[0],
          dayName,
          newUrls,
          totalClicksForCurrentDay:
            totalClicksForCurrentDay.length > 0
              ? totalClicksForCurrentDay[0].totalClicks
              : 0,
          expiringUrls,
        });
      }

      res.status(200).json(statsForLastSevenDays);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllStats(req: Request, res: Response): Promise<void> {
    const { tags, startDate, endDate, search, accessToken } = req.query;

    try {
      let query: any = { accessToken };
  
      if (tags) {
        const tagsArray = Array.isArray(tags) ? tags : [tags];
        query.tags = { $in: tagsArray };
      }
  
      if (startDate && typeof startDate === "string") {
        const parsedStartDate = new Date(`${startDate}T00:00:00.000Z`);
        query.createdAt = { $gte: parsedStartDate };
      }
  
      if (endDate && typeof endDate === "string") {
        const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);
        if (query.createdAt) {
          query.createdAt.$lte = parsedEndDate;
        } else {
          query.createdAt = { $lte: parsedEndDate };
        }
      }
  
      const statsForLastSevenDays = [];
      const currentDate = new Date();
  
      for (let i = 0; i < 7; i++) {
        const currentDateStart = new Date(currentDate);
        currentDateStart.setDate(currentDate.getDate() - i);
        currentDateStart.setHours(0, 0, 0, 0);
  
        const currentDateEnd = new Date(currentDateStart);
        currentDateEnd.setHours(23, 59, 59, 999);
  
        const dailyQuery = { ...query, createdAt: { $gte: currentDateStart, $lte: currentDateEnd } };
  
        const newUrls = await Url.find(dailyQuery);
  
        const totalClicksForCurrentDay = await Url.aggregate([
          {
            $match: {
              "accessLogs.timestamp": {
                $gte: currentDateStart,
                $lte: currentDateEnd,
              },
              accessToken,
            },
          },
          {
            $group: {
              _id: null,
              totalClicks: { $sum: "$accessCount" },
              urls: { $push: "$$ROOT" },
            },
          },
        ]);
  
        const expiringUrls = await Url.find({
          expiryDate: { $gte: currentDateStart, $lte: currentDateEnd },
          accessToken,
        });
  
        const dayName = currentDateStart.toLocaleDateString("en-US", {
          weekday: "short",
        });
  
        statsForLastSevenDays.push({
          date: currentDateStart.toISOString().split("T")[0],
          dayName,
          newUrls,
          totalClicksForCurrentDay:
            totalClicksForCurrentDay.length > 0
              ? totalClicksForCurrentDay[0].totalClicks
              : 0,
          expiringUrls,
        });
      }
  
      const totalClicks = await Url.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: null,
            totalClicks: { $sum: "$accessCount" },
          },
        },
      ]);
  
      const mostTrendingLinks = await Url.aggregate([
        { $match: query },
        { $sort: { accessCount: -1 } },
        { $limit: 5 },
      ]);
  
      const expiringSoonUrls = await Url.find({
        expiryDate: { $gte: currentDate },
        accessToken,
      });
  
      var clicksByDevices = await Url.aggregate([
        {
          $match: query,
        },
        {
          $unwind: "$accessLogs",
        },
        {
          $group: {
            _id: "$accessLogs.device.type",
            totalClicks: { $sum: 1 },
          },
        },
      ]);
      clicksByDevices = clicksByDevices.map((device: DeviceData) => ({
        name: device._id,
        totalClicks: device.totalClicks,
        fill: getColorForDevice(device._id),
      }));
  
      const clicksByLocation = await Url.aggregate([
        {
          $match: query,
        },
        {
          $unwind: "$accessLogs",
        },
        {
          $group: {
            _id: "$accessLogs.location",
            totalClicks: { $sum: 1 },
          },
        },
      ]);
  
      res.status(200).json({
        statsForLastSevenDays,
        totalClicks: totalClicks.length > 0 ? totalClicks[0].totalClicks : 0,
        mostTrendingLinks,
        expiringSoonUrls,
        clicksByDevices,
        clicksByLocation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
}

export default UrlController;

const getColorForDevice = (deviceId: string) => {
  switch (deviceId) {
    case "mobile":
      return "#8884d8";
    case "desktop":
      return "#83a6ed";
    case "tablet":
      return "#8dd1e1";
    case "unknown":
      return "#ffc658";
    default:
      return "#8884d8";
  }
};

const calculateFrequency = (accessLogs: any) => {
  const locationMap: Record<string, number> = {};
  const deviceMap: Record<string, number> = {};

  for (const accessLog of accessLogs) {
    const { location, device } = accessLog;
    const deviceType = device.type;

    locationMap[location] = (locationMap[location] || 0) + 1;


    deviceMap[deviceType] = (deviceMap[deviceType] || 0) + 1;
  }

 
  const locations = Object.keys(locationMap).map((name) => ({
    name,
    frequency: locationMap[name],
  }));
  const devices = Object.keys(deviceMap).map((name) => ({
    name,
    frequency: deviceMap[name],
  }));

  return { locations, devices };
};
