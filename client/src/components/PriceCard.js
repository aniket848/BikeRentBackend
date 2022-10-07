import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./PriceCard.module.css";
import {Link} from 'react-router-dom';

const PriceCard = (props)=>{

    const adr =  `/fullinfo?index=${props.id}`;

   return(
    <div className={`card ${style.priceCard}`}>
    <img
      src={props.img}
      className={style['card-img-top']}
      alt="..."
    />
    <div className="card-body">
      <h5 className={style['card-title']}>{props.title}</h5>
      <h4 className={style.subTitle}>{props.subtitle}</h4>
    </div>
    <ul className={`list-group list-group-flush ${style.list}`}>
      <li className="list-group-item">{props.l1}</li>
      <li className="list-group-item">{props.l2}</li>
      <li className="list-group-item">{props.l3}</li>
      <Link to={adr} className={style.knowButton}>Know More</Link>
    </ul>
    
  </div>
   );

}

export default PriceCard;