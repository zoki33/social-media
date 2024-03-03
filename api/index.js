const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const multer = require("multer");
const path = require("path");

const app = express();

mongoose.connect(
  "mongodb+srv://zoxwow94:593384@socialmediacluster.1skxkkm.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/images", express.static(path.join(__dirname, "/public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("Uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8080, () => {
  console.log("Backend server running on 8080");
});
