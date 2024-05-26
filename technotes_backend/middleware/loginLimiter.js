const rateLimit = require("express-rate-limit");
const { logEvents } = require("../middleware/logger");
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, //1 min
  max: 5,
  message: { message: "too many login attemps from this IP" },
  handler: (req, res, next, options) => {
    logEvents(
      `Toomanty req: ${option.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    ),
      res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, //Return rate limit info in the "RateLimit" headers
  legacyHeaders: false, //DIsable the "X-RateLimit" headers
});

module.exports = loginLimiter;
