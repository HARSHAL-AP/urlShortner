import express,{Router} from "express";
import AdminController from "../controller/admin.controller";
import { verifyTokenMiddleware } from "../middleware/Userauthonticate";
import verifyDevice from "../middleware/GetDeviseinfo";
import { Adminauthorization } from "../middleware/Adminauthorization";

class Adminrouter{
 public path="/admin"
 public router=Router();
 public admincontroller=new AdminController();

 constructor(){
    this.initializeRoutes(); 
    this.router.use(verifyDevice) 
    this.router.use(verifyDevice)
    this.router.use(Adminauthorization)
 }
  private initializeRoutes(){
    this.router.get(`${this.path}/getall`,this.admincontroller.getall)
    //this.router.get(`${this.path}/getuser`,verifyTokenMiddleware,this.admincontroller.getUserdata)
    this.router.post(`${this.path}/register`,this.admincontroller.register)
    this.router.post(`${this.path}/login`,this.admincontroller.login)
    this.router.get(`${this.path}/check-auth`,this.admincontroller.getAuthonticated)
    this.router.get(`${this.path}/logout`,verifyTokenMiddleware,this.admincontroller.logout);
   // this.router.patch(`${this.path}/update/:userId`,verifyTokenMiddleware, this.admincontroller.updateUser);
    this.router.patch(`${this.path}/updateloginactivity`,verifyTokenMiddleware, this.admincontroller.updateLoginactivity);
    this.router.patch(`${this.path}/updatepassword`,verifyTokenMiddleware, this.admincontroller.updatpassword);
    //this.router.put(`${this.path}/update/:userId`,verifyTokenMiddleware, this.admincontroller.updateUser);
    this.router.delete(`${this.path}/delete/:userId`,verifyTokenMiddleware, this.admincontroller.deleteUser);

  }




}

export default Adminrouter