import express, { Router } from "express";
import UrlController from "../controller/url.controller";
import {verifyTokenMiddleware} from "../middleware/Userauthonticate"

class UrlRouter {
  public path = "/url";
  public router = Router();

  public urlController = new UrlController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    
    this.router.get(`${this.path}/getall`, this.urlController.getAll)
   
    this.router.get(`${this.path}/tags`, verifyTokenMiddleware, this.urlController.getUrlsWithTags);
    this.router.get(`${this.path}/sort/:sortBy`, verifyTokenMiddleware, this.urlController.getUrlsWithSorting);
    this.router.get(`${this.path}/search/:searchTerm`, verifyTokenMiddleware, this.urlController.searchUrls);
  

    this.router.post(`${this.path}/shortner`, this.urlController.shortenUrl);
    this.router.get(`${this.path}/:shortUrl`, this.urlController.redirectToOriginalUrl);
    this.router.get(`${this.path}/get/:shortUrl`, verifyTokenMiddleware, this.urlController.geturldata);
    this.router.patch(`${this.path}/update/:shortUrl`, verifyTokenMiddleware, this.urlController.updateUrl);
    this.router.put(`${this.path}/update/:shortUrl`, verifyTokenMiddleware, this.urlController.updateUrl);
    this.router.delete(`${this.path}/delete/:shortUrl`, verifyTokenMiddleware, this.urlController.deleteUrl);

    
  }
}


export default UrlRouter;