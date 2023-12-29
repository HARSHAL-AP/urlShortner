import { Request, Response } from "express";
import shortid from "shortid";
import Url from "../model/url.model";
import User from "../model/user.model";
import { getLocation } from "../services/assess";
import env from "../config/env";
import { SortOrder } from "mongoose";

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
    const { originalUrl, tags, title, linkDescription,accessToken } = req.body;
  
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

    const url = new Url(urlData);

    try {
      await url.save();
      res.status(200).json({ isError: false, shortUrl });
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
        const accesinfo: any = {
          ipAddress: req.ip ?? "Unknown",
          location: "Unknown",
          timestamp: new Date().toISOString(),
        };
        url.accessCount += 1;
        url.accessLogs.push(accesinfo);

        await url.save();

        res.redirect(url.originalUrl.toString());
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
    try {
      const { shortUrl } = req.params;
      const url = await Url.findOne({ shortUrl });

      if (url) {
        res.status(200).json({ isError: false, url });
      } else {
        res.status(404).json({ error: "URL not found" });
      }
    } catch (error) {
      console.error("Error redirecting to original URL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
//update url
  async updateUrl(req: Request, res: Response): Promise<void> {
    try {
      const { shortUrl } = req.params;
      const { originalUrl } = req.body;

      if (!originalUrl) {
        res
          .status(400)
          .json({ error: true, errorlog: "Original URL is required" });
        return;
      }

      const url = await Url.findOneAndUpdate(
        { shortUrl },
        { originalUrl },
        { new: true }
      );

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
      const { shortUrl } = req.params;

      const url = await Url.findOneAndDelete({ shortUrl });

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
// Get all urls with specific tags
  async getUrlsWithTags(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = req.query.accessToken;
      const tags = req.query.tags;

      if (!accessToken) {
        res
          .status(400)
          .json({ error: true, errorlog: "Access Token is required" });
        return;
      }

      const user = await User.findOne({ accessToken });

      if (!user) {
        res
          .status(401)
          .json({
            error: true,
            errorlog: "Unauthorized: Invalid access token or user",
          });
        return;
      }

      if (!tags) {
        res
          .status(400)
          .json({ error: true, errorlog: "Tags are required for filtering" });
        return;
      }

      const urls = await Url.find({ accessToken, tags });

      res.status(200).json({ isError: false, data: urls });
    } catch (error) {
      console.error("Error fetching URLs with tags:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
/// For sorting uls woth diffrant parameters 
  async getUrlsWithSorting(req: Request, res: Response): Promise<void> {
    try {
     
      const sortBy = req.query.sortBy;
      const {accessToken}=req.body;
      

      let sortOptions: string | { [key: string]: SortOrder | { $meta: any; }; } | [string, SortOrder][] | null | undefined = {};

      switch (sortBy) {
        case "accessCount":
          sortOptions = { accessCount: -1 }; // Sort in descending order
          break;
        case "createdAt":
          sortOptions = { createdAt: -1 }; // Sort in descending order
          break;

        default:
          res.status(400).json({ error: true, errorlog: "Invalid sortBy parameter" });
          return;
      }

      const urls = await Url.find({ accessToken }).sort(sortOptions);

      res.status(200).json({ isError: false, data: urls });
    } catch (error) {
      console.error("Error fetching URLs with sorting:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // For Searching Url 
  async searchUrls(req: Request, res: Response): Promise<void> {
    try {
      
      const { searchTerm } = req.params;
      const {accessToken}=req.body;
      
      const urls = await Url.find({
        accessToken,
        $or: [
          { shortUrl: searchTerm },
          { title: { $regex: new RegExp(searchTerm, "i") } },
          { tags: { $in: [searchTerm] } },
        ],
      });

      res.status(200).json({ isError: false, data: urls });
    } catch (error) {
      console.error("Error searching URLs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
// for getting all tags associated with accesstoken 
  async getalltags(req: Request, res: Response): Promise<void> {

    console.log("constroler workin ")
    const {accessToken} = req.body;
    
    try {
      const tags = await Url.distinct('tags', { accessToken });

      res.status(200).json({ isError: false, data: tags.filter(Boolean) });
    } catch (error) {
    
      res.status(500).json({ error: "Internal Server Error" });
    }

  }
 // For Getting all urls by accestoken 
  async getallUrlsByaccessToken(req:Request,res:Response):Promise<void>{
    const {accessToken} = req.body;

   try {
      const data=await Url.find({accessToken})
      res.status(200).json({ isError: false, data });
    } catch (error) {
    
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
 
  //For geting statistic fo rtodyas data 
  async getTodaysStats(req: Request, res: Response): Promise<void> {
    const {accessToken} = req.body;

    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
  
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
  
      // Retrieve today's generated new URLs
      const newUrls = await Url.find({
        createdAt: { $gte: todayStart, $lte: todayEnd },accessToken
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
        expiryDate: { $gte: todayStart, $lte: todayEnd },accessToken
      });
  
      res.status(200).json({
        newUrls,
        totalClicksToday: totalClicksToday.length > 0 ? totalClicksToday[0].totalClicks : 0,
        expiringUrls,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default UrlController;
