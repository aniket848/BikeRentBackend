import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import style from "./Card.module.css";

const Card = (props)=>{

    return(


    <div className={`card ${style.featureCard}`}>
        <div className={style.picture}>
           <img src={props.img} className={style.img} alt="Chicago Skyscrapers"/>
       </div>
  <div className="card-body">
    <h5 className="card-title" style={{fontSize:'1.4rem'}}>{props.title}</h5>
    <p className="card-text" style={{marginTop:'2rem',wordSpacing:'4px'}}>{props.text}</p>
  </div>
</div>
    );
}

export default Card;