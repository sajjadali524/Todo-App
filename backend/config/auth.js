const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const {token} = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated, Please Login!",
        success: false,
      });
    }

    //Token Verify
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "Auth Failed!",
          success: false,
        });
      } else {
        req.userId = decode.userId;
        next();
      }
    });
  } catch (err) {
    return res.status(401).json({
      message: "Auth Failed!",
      success: false,
    });
  }
};

module.exports = authMiddleware;
