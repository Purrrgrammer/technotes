const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; //port number saved in environment variable
const rootRouter = require("./routes/root.js");
const path = require("path");
app.use("/", express.static(path.join(__dirname, "/public")));
// app.use("/");
app.get("/", rootRouter);

// everything at the end
app.all("*", (req, res) => {
  res.status(404);
  //   look at the header that comes in to determine what type to send
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/views", "error.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
