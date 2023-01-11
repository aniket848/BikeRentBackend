import React, { useContext, useState ,useEffect} from "react";
import { userContext } from "../../App";
import {Alert} from 'react-bootstrap';
import AddAuction from "./AddAuction";
import Card from "./Card";
import io from 'socket.io-client';
//const socket = io.connect('https://bikeadda.herokuapp.com/');
 const socket = io.connect('http://localhost:4000/');

const AuctionBody = () => {
     const [data, setData] = useState([]);
     const {state}  = useContext(userContext);
     const [loginMesg,setLogginMesg] = useState("");
  
  const getAuctionsData = async()=>{
    const res = await fetch('/getAuctions',{
        method:'GET',
        headers:{
            "Content-Type":"application/json"
        }
    });

      const data = await res.json();
      setData(data);
  }

  const bidItem = async(auctionPrice,AuctionId)=>{
     if(!state.isLoggedIn){
        return setLogginMesg("Please Login First!");
     }
     
     let newPrice = Math.ceil((auctionPrice/10)*11);
     const res = await fetch('/updateAuction',{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            newPrice,AuctionId,
            winner:state.userEmail
        })
     });

     const data = await res.json();
     console.log(data);
  }

  const deleteItem = async(auctionId,imageName)=>{
    //console.log("reached clietn delete function");
    const res = await fetch('/deleteAuction',{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"  
        },
        body:JSON.stringify({
            auctionId,imageName
        })
     });

     const data = await res.json();
     console.log(data);
  }

  useEffect(()=>{
    const interval = setTimeout(() => setLogginMesg(''), 4000);
    return () => clearTimeout(interval);
  },[loginMesg]);

  useEffect(()=>{
     
     socket.on("newAuction",(auction)=>{
        setData(prevData=>([
            ...prevData,
            auction
        ]));
     });

     socket.on("deleteAuction",(id)=>{
        const updatedData = data.filter((auction)=>{
              return auction.id!==id;             
        });
        setData(updatedData);
     });

     socket.on("updateAuction",(updateAuction)=>{
        const updatedData = data.map(auction=>{
              if(auction._id===updateAuction._id){
                  auction.curPrice = updateAuction.curPrice;
                  auction.winner = updateAuction.winner;
              }
              return auction;
          });
        
         setData(updatedData);
     });

     //console.log(data[0]._id);

     getAuctionsData();


  },[data])

//   useEffect(()=>{
//     getAuctionsData();
//   },[])

  return (
    <div className="py-5">
      <div className="container">
        {loginMesg && <Alert variant="danger" style={{textAlign:'center'}}>{loginMesg}</Alert>}
        {state.isLoggedIn && <AddAuction />}
        {!state.isLoggedIn && <h1>PLEASE LOGIN TO ADD ANY ITEM IN AUCTION</h1>}
        {data!=null && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-6">
            {data.map((auction) => {
              return (
                <Card item={auction} key={auction._id} bidItem={bidItem} deleteItem={deleteItem} currUser={state.userEmail}/>);
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionBody;
