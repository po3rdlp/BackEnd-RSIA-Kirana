import express from "express";
import ConnectDb from "./src/config/Dbconnect.js";
import router from "./src/News/NewsController.js";
import cors from "cors";
import fs from "fs";
import https from "https";

const app = express();
const port = 5303;
const host = "13.228.77.82";

const privateKeyPath = "./key.pem"; // Adjust the paths accordingly
const certKeyPath = "./cert.pem"; // Adjust the paths accordingly

const privateKey = fs.readFileSync(privateKeyPath, "utf-8");
const certificate = fs.readFileSync(certKeyPath, "utf-8");
const credentials = { key: privateKey, cert: certificate };

app.use(cors());
ConnectDb();

app.use("/", router);

// Create an HTTPS server instead of HTTP
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, host, () => {
  console.log(`Example app listening on https://${host}:${port}`);
});
