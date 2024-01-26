import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { connectDB } from "./db/db_connection.js";
import { app } from "./app.js";
let PORT = process.env.PORT;

connectDB()
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`app running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`);
  });
