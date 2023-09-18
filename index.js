import express from "express";
import ConnectDb from "./src/config/Dbconnect.js";
import router from "./src/News/NewsController.js";
import cors from "cors";
import fs from "fs";
import http from "http";
import https from "https";

const app = express();
const httpPort = 5300;
const httpsPort = 5303;
const host = "0.0.0.0";

const keyPath = "./private-key.pem";
const certPath = "./certificate.pem";

app.use(cors());
ConnectDb();

app.use("/", router);

const options = {
  key: fs.readFileSync(keyPath, "utf-8"),
  cert: fs.readFileSync(certPath, "utf-8"),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

httpServer.listen(httpPort, host);
httpsServer.listen(httpsPort, host);
