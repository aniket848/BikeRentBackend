const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const Auction = require("../model/auctionSchema");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const authenticate = require("../middleware/authenticate");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploadImages");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// router.get("/",(req,res)=>{
//   res.send("yeh dekh yeh vala khula");
// })

router.post("/addAuction", upload.single("myFile"), async (req, res) => {
  //console.log(req.file);
  const image = req.file.filename;
  const { owner, title, desc, curPrice, duration } = req.body;

  console.log(duration);
  const newAuction = new Auction({
    image,
    owner,
    title,
    desc,
    curPrice,
    duration,
  });
  await newAuction.save();
  //console.log(owner,title);
  res.send({ mesg: "formdata saved" });
});

router.get("/getAuctions", async (req, res) => {
  //console.log("reached server");
  try {
    let data;
    data = await Auction.find();
    //console.log("From Server", data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.get('/getUserAuction/:email', authenticate, async (req, res) => {
  try {
    const email = req.params.email;
    let data;
    data = await Auction.find({ owner: email });
    if (!data) {
      return res.status(400).send({ error: "User Not Found" });
    }

    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "server error" });
  }
});

router.get('/getOrders/:email', authenticate, async (req, res) => {
  try {
    //console.log("reached getOrders");
    const email = req.params.email;
    let userExist = await User.findOne({ email: email }); 
    if (!userExist) {
      return res.status(400).send({ error: "User Not Found" });
    }
    res.status(200).send(userExist);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "server error" });
  }
});

router.delete("/deleteOrder", authenticate, async (req, res) => {
  console.log("reached delete order");
  try {
    const { index,email } = req.body;
    let userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).send({ error: "User Not Found" });
    }
  // console.log(userExist.orders);
    const newOrders = userExist.orders.filter(order=>{
        return order.itemIndex !== index;
    });

    userExist.orders = newOrders;
    await userExist.save();
    return res.status(200).send({Success: "Order successfullt Deleted" });

  } catch (err) {

    console.log(err);
    res.status(400).send({ error: "Can't Delete order due to server error" });
  }
});

router.patch("/updateAuction", authenticate, async (req, res) => {
  const { newPrice, AuctionId, winner } = req.body;
  const auctionItem = await Auction.findById(AuctionId);
  auctionItem.curPrice = newPrice;
  auctionItem.winner = winner;
  await auctionItem.save();
  res.send({ mesg: "auction item updated" });
});

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("image succesfully deleted");
    }
  });
};

router.delete("/deleteAuction", async (req, res) => {
  const { auctionId, imageName } = req.body;
  await Auction.findByIdAndDelete(auctionId);
  const path = `./public/uploadImages/${imageName}`;
  //console.log(path);
  await deleteFile(path);
  res.send({ mesg: "auction item successfullt Deleted" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let token;

  if (!email || !password) {
    return res.status(422).send({ error: "Invalid Credentials" });
  }
  console.log(email);
  try {
    let userExist = await User.findOne({ email: email });
    //res.send(userExist);
    if (!userExist) {
      res.status(422).send({ error: "Invalid Email" });
      return;
    }

    bcrypt.compare(password, userExist.password, async function (err, result) {
      if (!result) {
        res.status(422).send({ error: "Invalid Password" });
        return;
      } else {
        token = await userExist.generateToken();
        //console.log("token = ",token);

        res.cookie("jwtToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
          secure: false,
        });

        return res.status(200).send({ Success: "Login Successful" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ error: "Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res.status(422).send({ error: "Invalid Credentials" });
  }

  try {
    let userExist = await User.findOne({ email: email });
    //res.send(userExist);
    if (userExist) {
      res
        .status(422)
        .send({ error: "User with current email address already exists" });
      return;
    }

    const user = new User({ email, name, password });

    user.password = await bcrypt.hash(password, 12);
    //console.log(user);
    await user.save(); // here we are saving user credential into database
    console.log("New user exist");
    return res.status(200).send({ Success: "SignUp Successful" });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ error: "Server Error" });
  }
});

router.post("/contact", authenticate, async (req, res) => {
  const { name, email, phone, location, index } = req.body;

  const currentUser = req.user;

  const mesg = await currentUser.addOrder({
    name,
    email,
    phone,
    location,
    index,
  });

  if (mesg !== 0) {
    await currentUser.save();
    console.log(currentUser.orders);
    res.status(200).send("order succesfully booked");
  } else res.status(400).send("server error");
});

router.get("/logout", (req, res) => {
  try {
    console.log("reaches logout path");
    res.clearCookie("jwtToken", { path: "/" });
    res.status(200).send("Logout Successfully");
  } catch {
    res.status(400).send("Some error occured");
  }
});

router.get("/authenticate", authenticate, (req, res) => {
  console.log("Authorised User");
  res.send(req.user);
});

module.exports = router;
