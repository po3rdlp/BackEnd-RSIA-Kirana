import express from "express";
import ConnectDb from "./src/config/Dbconnect.js";
import router from "./src/News/NewsController.js";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 5303;
const host = "13.228.77.82";

const privateKeyPath = "/key.pem";
const certKeyPath = "/cert.pem";

const privateKey = fs.readFileSync(privateKeyPath, "utf-8");
const certificate = fs.readFileSync(certKeyPath, "utf-8");

app.use(cors());
ConnectDb();

app.use("/", router);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`);
});
