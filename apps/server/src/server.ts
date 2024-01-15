import App from './app';
import UrlRouter from './routes/url.route';
import UserRouter from './routes/user.route';
import Adminrouter from './routes/admin.route';
import 'dotenv/config';
import cluster from 'cluster';
import os from 'os';

//if (cluster.isMaster) {
//  
//  for (let i = 0; i < os.cpus().length; i++) {
//    cluster.fork();
//  }
//
//  cluster.on('exit', (worker, code, signal) => {
//    console.log(`Worker ${worker.process.pid} died`);
//    
//    cluster.fork();
//  });
//} else {
 
 
  const app = new App([new UserRouter(), new UrlRouter(),new Adminrouter()]);

  app.listen();
//}
