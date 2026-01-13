require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routers/authRouters");
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const port = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
