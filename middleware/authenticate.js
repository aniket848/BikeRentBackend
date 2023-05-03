const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const EMAIL = require("../database/info");

const authenticate = async function (req, res, next) {
 
  try {
    // console.log("from middleware = ",req.headers.cookie);
    // const token = req.cookies.bikeToken;
    // console.log("TOKEN====",token);
    // if (!token) {
    //   console.log("NO valid user");
    //   throw new Error("No user exist");
    // }
    // const verifytToken = jwt.verify(token, process.env.SECRET_KEY);

    const userExist = await User.findOne({
      email: global.EMAIL,
    });

    if (!userExist) {
      console.log("NO valid user");
      throw new Error("No user exist");
    } else {
      
      req.user = userExist;
      // req.token = token;
      req.userId = userExist._id;

      next();
    }
  } catch (err) {
    console.log(err);
    throw new Error("Unauthorized user provided");
  }
};

module.exports = authenticate;
