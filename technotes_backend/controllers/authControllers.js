const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username }).exec();

  if (!username || !password) {
    return res.status(400).json({ messsage: "please filled all fields" });
  }

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ messsage: "unauthorized" });
  }

  const matchedPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchedPassword) {
    return res
      .status(401)
      .json({ messsage: "unauthorized, password is not matched" });
  }

  const accessToken = jwt.sign(
    {
      userinfo: {
        username: foundUser.username,
        password: foundUser.password,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
    process.env.JWT_ALGO
  );
  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" },
    process.env.JWT_ALGO
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  return res.status(200).json({ accessToken });
  //authenticating
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ messsage: "unauthorized, password is not matched" });

  jwt.verify(
    cookies.jwt,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.JWT_ALGO,
    async (err, encoded) => {
      if (err) return res.status(401).json({ messsage: "Forbidden" });
      const foundUser = await User.findOne({
        username: encoded.username,
      }).exec();
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      if (encoded) {
        const accessToken = jwt.sign(
          {
            userinfo: {
              username: foundUser.username,
              password: foundUser.password,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
          //   process.env.JWT_ALGO,
        );
        return res.status(200).json({ accessToken });
      }
    }
  );
});
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = { login, refresh, logout };
