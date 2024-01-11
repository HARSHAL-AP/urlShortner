import express,{Router} from "express";
import UserController from "../controller/user.controller";
import { verifyTokenMiddleware } from "../middleware/Userauthonticate";
import verifyDevice from "../middleware/GetDeviseinfo";

class Userrouter{
 public path="/user";
 public router = Router();
 public userController=new UserController();

 constructor() {
    this.initializeRoutes();    
    this.router.use(verifyDevice)
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/getall`,this.userController.getAll)
    this.router.get(`${this.path}/getuser`,verifyTokenMiddleware,this.userController.getUserdata)
    this.router.post(`${this.path}/register`,this.userController.register)
    this.router.post(`${this.path}/login`,this.userController.login)
    this.router.get(`${this.path}/check-auth`,this.userController.getAuthonticated)
    this.router.get(`${this.path}/logout`,verifyTokenMiddleware,this.userController.logout);
    this.router.patch(`${this.path}/update/:userId`,verifyTokenMiddleware, this.userController.updateUser);
    this.router.patch(`${this.path}/updateloginactivity`,verifyTokenMiddleware, this.userController.updateLoginactivity);
    this.router.patch(`${this.path}/updatepassword`,verifyTokenMiddleware, this.userController.updatpassword);
    this.router.put(`${this.path}/update/:userId`,verifyTokenMiddleware, this.userController.updateUser);
    this.router.delete(`${this.path}/delete/:userId`,verifyTokenMiddleware, this.userController.deleteUser);
  }


}



export default Userrouter;