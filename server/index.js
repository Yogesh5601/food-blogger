import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
const port = process.env.PORT;
const db_conn = process.env.DB_CONN;
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blog.js";
import fileUpload from "express-fileupload";
import categoryRoute from "./routes/category.js"
import blogTextRoute from "./routes/blogText.js"

mongoose
  .connect(db_conn)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db conn error", err);
  });


app.use(fileUpload({ useTempFiles: true }));  
app.use(cors());
app.use(express());
app.use(express.json());
app.use("/user", userRoute);
app.use("/blog", blogRoute)
app.use("/category", categoryRoute)
app.use("/blogtext", blogTextRoute)

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`server nunning on port${port}`);
});
