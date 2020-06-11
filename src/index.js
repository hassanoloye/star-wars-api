import express from "express";
import dotenv from "dotenv";

dotenv.config()

import setupApp from "./setup/app.setup";

const app = express();
setupApp(app);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.info(`App listening on port ${port}!`);
});

