// const { format } = require("date-fns");
// const { v4: uuid } = require("uuid");
// const fs = require("fs");
// const fsPromises = require("fs").promises;
// const path = require("path");

// const logEvents = async (message, logFileName) => {
//   const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
//   const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
//   console.log(logItem);
//   try {
//     if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
//       await fsPromises.mkdir(path.join(__dirname, "..", "logs")); //create directory
//     }
//     await fsPromises.appendFile(
//       path.join(__dirname, "..", "logs", logFileName),
//       logItem
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

// const logger = (req, res, next) => {
//   // create file log

//   //coditional => only log when its not coming from our url (or specific req method)
//   logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log"); //log every request that comes in

//   console.log(`${req.method} ${req.path}`);

//   next();
// };

// module.exports = { logEvents, logger };

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger };
