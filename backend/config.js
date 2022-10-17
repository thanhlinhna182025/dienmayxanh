import dotenv from "dotenv";
dotenv.config();
const config = {
  MONGO_URL: process.env.MONGO_URL,
  tmnCode: process.env.vnp_TmnCode,
  secretKey: process.env.vnp_HashSecret,
  vnpUrl: process.env.vnp_Url,
  returnUrl: process.env.vnp_ReturnUrl,
};

export default config;
