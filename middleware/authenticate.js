const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async function (req, res, next) {
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      console.log("NO valid user");
      throw new Error("No user exist");
    }
    const verifytToken = jwt.verify(token, process.env.SECRET_KEY);

    const userExist = await User.findOne({
      _id: verifytToken._id,
      "tokens.token": token,
    });

    if (!userExist) {
      console.log("NO valid user");
      throw new Error("No user exist");
    } else {
      
      req.user = userExist;
      req.token = token;
      req.userId = userExist._id;

      next();
    }
  } catch (err) {
    console.log(err);
    throw new Error("Unauthorized user provided");
  }
};

module.exports = authenticate;
