import express from "express";
import ConnectDb from "./src/config/Dbconnect.js";
import router from "./src/News/NewsController.js";
import cors from "cors";

const app = express();
const port = 5303;
const host = "13.228.77.82";

app.use(cors());
ConnectDb();

app.use("/", router);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`);
});
