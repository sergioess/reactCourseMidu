import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || "sa",
  dbPassword: process.env.DB_PASSWORD || "masterkey",
  dbServer: process.env.DB_SERVER || "127.0.0.1\\SQLEXPRESS",
  dbDatabase: process.env.DB_DATABASE || "MNGCACAREO",
};
