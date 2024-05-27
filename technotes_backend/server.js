require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; //port number saved in environment variable
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOption = require("./config/corsOption.js");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

console.log(process.env.NODE_ENV);
// app.use("/");
//middleware
connectDB();
app.use(cors(corsOption)); //before //creating CORS option
app.use(logger); //before
app.use("/", express.static(path.join(__dirname, "public"))); //relavtive where server file is
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/", require("./routes/root.js"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// everything at the end
app.all("*", (req, res) => {
  res.status(404);
  //   look at the header that comes in to determine what type to send
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler); //after

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
