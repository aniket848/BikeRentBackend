import React, { useState, useEffect ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./userProfile.css";
import data from "../data/data";
import { userContext } from '../App';

const UserProfile = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({name:"",email:""});
  const [auctions, setAuctions] = useState([]);

  const {state} = useContext(userContext);

  const fetchOrders = async () => {

    //const adr =  `/fullinfo?index=${props.id}`;
    const res = await fetch(`/getOrders/${state.userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (res.status !== 200) {
      return alert("Server errror");
    }

    const temp = await res.json();
    setOrders(temp.orders);
    //setUser({name:temp.name,email:temp.email});
    setUser(prevVal => ({
        // Retain the existing values
        ...prevVal,
        // update the firstName
        name:temp.name,
        email:temp.email
      }));
    //console.log(user);
  };

  
  const fetchAuctions = async()=>{
      
    const res = await fetch(`/getUserAuction/${state.userEmail}`,{
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        }
    });

    if(res.status !== 200) {
        return alert("Server errror");
    } 
    
     const auction = await res.json();
     setAuctions(auction);
     //console.log(auction);
  }

  const DeleteOrder = async(index)=>{
      // console.log("delete order",index);
      const newOrder = orders.filter(order=>{
         return order.itemIndex!==index;
      });

      setOrders(newOrder);

      const res = await fetch('/deleteOrder',{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            index,
            email:state.userEmail
        })
      });

      const data = await res.json();
      if(res.status===400){
          alert(data);
      }
        
      
   }

   const handleView = ()=>{
       navigate('/auction');
   }


  useEffect(()=>{
    fetchAuctions();
 },[]);

  useEffect(() => {
    fetchOrders();
  }, []);

  

  return (
    <div className="container">
      <div style={{ textAlign: "center", margin: "1rem" }}>
        <h1>ABOUT</h1>
      </div>
      <div className="userprofileBody">
        <div className="userPhotobody">
          <div className="userPhoto">
            <div
              className="single_advisor_profile wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <div className="advisor_thumb">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
              </div>

              <div className="single_advisor_details_info">
                <h6>{user.name}</h6>
                <p className="designation">{state.userEmail}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="userInfo">
          <h6 className="bg-light p-2 border-top border-bottom">
            ORDERED BIKES
          </h6>

          <ul className="list-group list-group-light">
          {orders &&
            orders.map((order) => {
                let index = order.itemIndex;
              return (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={data[index].img[0]}
                      alt=""
                      style={{ width: "60px", height: "60px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{data[index].title}</p>
                      <p className="text-muted mb-0">{data[index].subTitle}</p>
                    </div>
                  </div>
                  <span
                    className="badge rounded-pill badge-success"
                    style={{ backgroundColor: "#000" , cursor:'pointer'}}
                    onClick={()=> DeleteOrder(index)}
                  >
                    Delete
                  </span>
                </li>
              );
            })}
            </ul>

             {orders.length===0 && <h3>NO ORDERS YET</h3>}          
          

          <h6
            className="bg-light p-2 border-top border-bottom"
            style={{ marginTop: "3rem" }}
          >
            AUCTION ITEMS
          </h6>

          <ul className="list-group list-group-light">
          {auctions &&
            auctions.map((auction) => {
                
               let adr = `http://localhost:4000/public/uploadImages/${auction.image}`;

              return (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center" style={{width:'90%'}}>
                    <img
                      src={adr}
                      alt="auctionImage"
                      style={{ width: "60px", height: "60px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bold mb-1">Name: {auction.title}</p>
                        <p className="fw-bold mb-1" style={{marginLeft:'10rem'}}>curWinner: {auction.winner?auction.winner:"No One Bid Yet"}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                      <p className="fw-bold mb-1">Description: {auction.desc}</p>
                      <p className="fw-bold mb-1" style={{marginLeft:'10rem'}}>curPrice: ${auction.curPrice}</p>
                      </div>
                    </div>
                  </div>
                  <span
                    className="badge rounded-pill badge-success"
                    style={{ backgroundColor: "#000"  , cursor:'pointer'}}
                    onClick={()=> handleView()}
                  >
                     View
                  </span>
                </li>
              );
            })}
            </ul>

             {auctions.length===0 && <h3>DIDN'T AUCTIONED ANY ITEM YET</h3>}          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
