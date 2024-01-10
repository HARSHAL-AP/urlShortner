import { cleanEnv, port, str } from 'envalid';
import { config } from 'dotenv';

const validateEnv = () => {
 
  config();

  const cleanedEnv = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGODB_URL: str(),
    COOKIE_DOMAIN: str(),
    SESSION_SECRET: str(),
    AUTH_COOKIE_NAME: str(),
    CORS_ORIGINS: str(),
    KEY:str(),
    IP_INFO_TOKEN:str()
  });

  return cleanedEnv;
};

console.log('Validating env...');
const env = validateEnv();

console.log("Validated env: It's all good!");

export default env;
