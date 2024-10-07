const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./Routes/Route");
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
