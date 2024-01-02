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
        if (url.expiryDate && url.expiryDate < new Date()) {
          // Read the HTML template content
          const htmlContent = readFileSync(
            join("../services", "expirePage.html"),
            "utf-8"
          );

          // Set the HTML content as the response
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
      const tags = req.query.tags;
      const { accessToken } = req.body;

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
  // For sorting uls with diffrant parameters
  async getUrlsWithSorting(req: Request, res: Response): Promise<void> {
    try {
      const sortBy = req.query.sortBy;
      const { accessToken } = req.body;

      let sortOptions:
        | string
        | { [key: string]: SortOrder | { $meta: any } }
        | [string, SortOrder][]
        | null
        | undefined = {};

      switch (sortBy) {
        case "accessCount":
          sortOptions = { accessCount: -1 }; // Sort in descending order
          break;
        case "createdAt":
          sortOptions = { createdAt: -1 }; // Sort in descending order
          break;

        default:
          res
            .status(400)
            .json({ error: true, errorlog: "Invalid sortBy parameter" });
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
      const { accessToken } = req.body;

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
    const { tags, selectedDate } = req.query;

    try {
      let query: any = { accessToken };

     
      if (tags && typeof tags === 'string') {
         
          query.tags = { $in: tags.split(',') };
      }

     
      if (selectedDate && typeof selectedDate === 'string') {
        
          query.createdDate = selectedDate;
      }

      const data = await Url.find(query);
      res.status(200).json({ isError: false, data });
    } catch (error) {
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
    const { accessToken, selectedDate, tags } = req.query;

    try {
      const currentDate = new Date();
      const statsForLastSevenDays = [];

      for (let i = 0; i < 7; i++) {
        const currentDateStart = new Date(currentDate);
        currentDateStart.setDate(currentDate.getDate() - i);
        currentDateStart.setHours(0, 0, 0, 0);

        const currentDateEnd = new Date(currentDateStart);
        currentDateEnd.setHours(23, 59, 59, 999);

        const query: any = {
          createdAt: { $gte: currentDateStart, $lte: currentDateEnd },
          accessToken,
        };

        if (selectedDate) {
          const selectedDateParam = selectedDate as string;
          const parsedDate = new Date(selectedDateParam);
          if (!isNaN(parsedDate.getTime())) {
            query.createdAt = { $gte: parsedDate, $lt: parsedDate };
          }
        }

        if (tags) {
          const tagsArray = Array.isArray(tags) ? tags : [tags];
          query.tags = { $in: tagsArray };
        }

        const newUrls = await Url.find(query);

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

      const totalClicks = await Url.aggregate([
        {
          $group: {
            _id: null,
            totalClicks: { $sum: "$accessCount" },
          },
        },
      ]);

      const mostTrendingLinks = await Url.aggregate([
        { $sort: { accessCount: -1 } },
        { $limit: 5 },
      ]);

      const expiringSoonUrls = await Url.find({
        expiryDate: { $gte: currentDate },
        accessToken,
      });

      var clicksByDevices = await Url.aggregate([
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
      clicksByDevices=clicksByDevices.map((device: DeviceData) => ({
        name: device._id,
        totalClicks: device.totalClicks,
        fill: getColorForDevice(device._id),
      }));
      const clicksByLocation = await Url.aggregate([
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
    case 'mobile':
      return '#8884d8';
    case 'desktop':
      return '#83a6ed';
    case 'tablet':
      return '#8dd1e1';
    case 'unknown':
      return '#ffc658';
    default:
      return '#8884d8';
  }
};
