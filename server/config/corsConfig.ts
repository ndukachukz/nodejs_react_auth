import { CorsOptions } from "cors";
import "dotenv/config";
const whitelist = [`http://localhost:${process.env.CLIENT_PORT}`];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(String(origin)) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
