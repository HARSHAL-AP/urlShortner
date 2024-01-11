import express, { Router } from "express";
import UrlController from "../controller/url.controller";
import {verifyTokenMiddleware,verifyUserAccestoken} from "../middleware/Userauthonticate"
import verifyDevice from "../middleware/GetDeviseinfo";


class UrlRouter {
  public path = "/url";
  public router = Router();

  public urlController = new UrlController();
  constructor() {
    this.initializeRoutes();
    this.router.use(verifyDevice)
  }
  private initializeRoutes() {
    
    //Get all Data 
    this.router.get(`${this.path}/getall`, this.urlController.getAll)//
   
    //Get Urls Data on diffrant params
    this.router.get(`${this.path}/geturls`,verifyUserAccestoken, this.urlController.getallUrlsByaccessToken)
 
    this.router.get(`${this.path}/alltags`,verifyUserAccestoken,this.urlController.getalltags)

    this.router.get(`${this.path}/gettodaystats`,verifyUserAccestoken,this.urlController.getTodaysStats)
    this.router.get(`${this.path}/getweaklystats`,verifyUserAccestoken,this.urlController.getWeaklysStats)
    //For geting all stats which includes filtaring with tags and querys 
    this.router.get(`${this.path}/getallstats`,verifyUserAccestoken,this.urlController.getAllStats)
    
 
    this.router.get(`${this.path}/search/:searchTerm`, verifyTokenMiddleware, this.urlController.searchUrls);
    this.router.get(`${this.path}/:shortUrl`, this.urlController.redirectToOriginalUrl);
    this.router.get(`${this.path}/get/:id`, verifyUserAccestoken, this.urlController.geturldata);
    this.router.get(`${this.path}/geturl/:shortUrl`, verifyUserAccestoken, this.urlController.geturlwithshortid);

    //CRUD For Urls 
    this.router.post(`${this.path}/shortner`,verifyUserAccestoken, this.urlController.shortenUrl);
    this.router.patch(`${this.path}/update/:id`, verifyUserAccestoken, this.urlController.updateUrl);
    this.router.put(`${this.path}/update/:id`, verifyUserAccestoken, this.urlController.updateUrl);
    this.router.delete(`${this.path}/delete/:id`, verifyUserAccestoken, this.urlController.deleteUrl);

    
  } 
}


export default UrlRouter;