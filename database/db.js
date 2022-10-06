const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB,{
    minPoolSize: 100, maxPoolSize: 1000,useNewUrlParser:true
}).then(()=>{
    console.log("database MATCH");
})
.catch(err=>{
    console.log("database NOT MATCH");
})