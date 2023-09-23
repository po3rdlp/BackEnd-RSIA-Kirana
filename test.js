import crypto from "crypto";

const sKey = crypto.randomBytes(16);

console.log(sKey.toString("hex"));
