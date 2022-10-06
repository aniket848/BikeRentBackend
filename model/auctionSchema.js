const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const auctionSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  winner:{
     type:String
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  curPrice: {
    type: Number,
    required: true,
  },
  duration: {
    type: Date,
    required: true,
  }
});


const Auction = mongoose.model("auction", auctionSchema);

module.exports = Auction;
