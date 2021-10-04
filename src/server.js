import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";
import routes from "./routes";

const app = express();
const port = 8000;

const initServer = () => {
  app.use(bodyParser({ extends: { urlencoded: true } }));
  app.use(bodyParser.json());
  app.use(express.static("public"));
  app.use(cors());
  app.use("/api", routes);

  app.listen(port, () => console.log(`server running on PORT ${port}`));
};

initServer();
