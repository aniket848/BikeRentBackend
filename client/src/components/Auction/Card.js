import React from "react";
import Countdown from "react-countdown";
import "./Card.css";

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }
  return (
    <div className="card" style={{ width: "20rem", border: "1px solid black" }}>
      <div
        className="card-img-top w-100"
        src=""
        alt="Cardcap"
        style={{
          height: "250px",
          backgroundImage: `url(http://localhost:4000/public/uploadImages/${props.item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="card-body" style={{ borderTop: "1px solid black" }}>
        <p className="lead display-6">{props.item.title}</p>
        <div className="d-flex jsutify-content-between align-item-center">
          <h5>
            {/* props. */}
            {days} days: {hours} hr: {minutes} min: {seconds} sec
          </h5>
        </div>
        <p className="card-text">{props.item.desc}</p>
        <div className="d-flex justify-content-between align-item-center">
          {props.currUser === props.item.owner ? (
            <div
              className="btn btn-outline-secondary"
              onClick={() => props.deleteItem(props.item._id, props.item.image)}
            >
              Cancel Bid
            </div>
          ) : props.item.winner && props.item.winner === props.currUser ? (
            <div className="btn btn-outline-secondary">Winner</div>
          ) : (
            <div
              className="btn btn-outline-secondary"
              onClick={() => props.bidItem(props.item.curPrice, props.item._id)}
            >
              Bid
            </div>
          )}

          <p className="display-6">${props.item.curPrice}</p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ item, bidItem, currUser, deleteItem }) => {
  const expiredDate = item.duration;

  return (
    <Countdown
      item={item}
      date={expiredDate}
      bidItem={bidItem}
      currUser={currUser}
      deleteItem={deleteItem}
      renderer={renderer}
    />
  );
};

export default Card;
