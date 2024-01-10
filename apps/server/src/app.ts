import express, { Express } from "express";
import cors from "cors";
import compression from "compression";
import env from "./config/env";
import hpp from "hpp";
import helmet from "helmet";
import { connect, set } from "mongoose";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import { Routes } from "./interface/routes.interaface";
import 'dotenv/config';
import cookieParser from 'cookie-parser';


const MongoDBSession = ConnectMongoDBSession(session);

class App {
  public app: Express;
  public env: string;
  public port: string | number;
  private store: ConnectMongoDBSession.MongoDBStore;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = env.NODE_ENV || "development";
    this.port = env.PORT ;
    this.store = new MongoDBSession({
      uri: env.MONGODB_URL,
      collection: "adminSessions",
    });
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  private connectToDatabase() {
    if (this.env !== "production") {
      set("debug", false);
    }

    connect(env.MONGODB_URL)
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private initializeMiddlewares() {
    this.app.use(express.json({ limit: "1mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.setupCORS();
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(hpp());
    this.app.use(cookieParser());
    this.app.get("/", (req, res) => {
      res.send("Server Running Fine");
    });
    
   this.app.use(
     session({
       secret: env.SESSION_SECRET,
       resave: true,
       saveUninitialized: false,
       store: this.store,
       name: env.AUTH_COOKIE_NAME,
      cookie:{
        domain: env.COOKIE_DOMAIN,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: this.env === 'production',
        httpOnly: true
      }
     })
   );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private setupCORS() {
    const origins: (boolean | string | RegExp)[] = [];
    
    if (["development"].includes(env.NODE_ENV)) {
      origins.push(/localhost:/);
    }

    const corsOrigins = env.CORS_ORIGINS.split(",");
    if (corsOrigins.length > 0) {
      origins.push(
        ...corsOrigins.map((corsOrigin) => {
          return corsOrigin.trim();
        })
      );
    }

    this.app.use(
      cors({
        origin: origins,
        credentials: true,
      })
    );
  }
}

export default App;
