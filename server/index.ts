import "dotenv/config";
import express from "express";
import expressApp from "./express-app";

const app = express();
const port = 8080 || process.env.PORT;

expressApp(app);

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
