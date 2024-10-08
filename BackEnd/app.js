const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./authRoutes/authRoute");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./userRoute/userRoute");
const roleRouter = require("./roleRoute/roleRoute");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", authRouter);
app.use("/api", roleRouter);
app.use("/api", userRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
