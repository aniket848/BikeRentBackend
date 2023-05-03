const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  orders:[
    {
      name:{
         type:String,
         required:true
      },
      email:{
        type:String,
        required:true
      },
      phone:{
        type:Number,
        required:true
      },
      location:{
        type:String,
        required:true
      },
      itemIndex:{
        type:Number,
        required:true
      }
    }
  ]
});

//here we generate token
userSchema.methods.generateToken = async function () {
  try {
    const newToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: newToken });
    await this.save();
    // console.log("NEWTOKEN",newToken);
    return newToken;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.addOrder = async function({name,email,phone,location,index}){
   try{
      const itemIndex = index;
      this.orders  = this.orders.concat({name,email,phone,location,itemIndex});
      await this.save();
      return "order saved";
   }catch(err){
      console.log(err);
      console.log("ERROR OCCURED");
      return 0;
   }
}

const User = mongoose.model("user", userSchema);

module.exports = User;
