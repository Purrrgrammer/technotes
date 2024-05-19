const allowedOrigins = require("./allowedOrigins");
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by custom CORS"));
    }
  },
  credentials: true, //allow credintails headers
  optionSuccessStatus: 200, //default = 204 by some device
}; //only those in the limited allow in the origins
//also provide access from outside origin !origin

module.exports = corsOptions;
