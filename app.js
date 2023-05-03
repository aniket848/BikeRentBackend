require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cookieParser());
require('./database/db');

const __dirname1 = path.resolve();



app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//our system automatically understand json data


const http = require('http').Server(app);




app.use(require('./router/auth')); 
app.use('/public',express.static('public'));



const socketIO = require('socket.io')(http,{
    cors:{
        origin:"http://localhost:3000"
    }
});

socketIO.on('connection',(socket)=>{
  //  console.log(`${socket.id} user just connected`);
    socket.on('disconnect',()=>{
        //console.log('A user disconneted');
    });
});

// -------------------- DEPLOYMENT ------------------------//


if(process.env.NODE_ENV==='production'){
      
    app.use(express.static(path.join(__dirname,"/client/build")));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"client","build","index.html"));
    });
}

// -------------------- DEPLOYMENT ------------------------//

const PORT = process.env.PORT || 4000;
// const PORT = 4000;

http.listen(PORT,()=>{
    console.log("server is running on port 4000");
});


const connection = mongoose.connection;

connection.once("open",()=>{
   // console.log("Mongoose database connected");
    // console.log("Setting changing streams");
    // console.log(__dirname1);
    // console.log(__dirname);
    const thoughtChangeStream = connection.collection('auctions').watch({fullDocument : "updateLookup" });

    thoughtChangeStream.on("change",(change)=>{
        //console.log("change occured"); 
        //console.log(change.fullDocument);
        switch(change.operationType){
            case "insert":
                //console.log("insert happedned");
                const auctionItem = change.fullDocument;
                socketIO.emit("newAuction",auctionItem);
                break;
            case "update":
                //console.log("update happedned");
                const updateAuction = {
                    _id:change.documentKey._id,
                    curPrice:change.fullDocument.curPrice,
                    winner:change.fullDocument.winner
                };
                socketIO.emit("updateAuction",updateAuction);
                break;
            case "delete":
                //console.log("delete happedned");
                socketIO.emit("deleteAuction",change.documentKey._id);
                break;       
        }    
    });
});
