import React from 'react';
import style from './Feedback.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BsFillStarFill } from "react-icons/bs";


const FeedbackCard = (props)=>{

    const img = props.img;
    return(
        <div className="col-md-4 mb-4 mb-md-0">
        <div className={style.card}>
          <div className="card-body py-4 mt-2">
            <div className="d-flex justify-content-center mb-4">
              <img src={img}
                className="rounded-circle shadow-1-strong" width="100" height="100" alt="pictur8"/>
            </div>
            <h5 className="font-weight-bold">{props.name}</h5>
            <h6 className="font-weight-bold my-3">{props.desg}</h6>
            <ul className="list-unstyled d-flex justify-content-center">
              <li>
                <BsFillStarFill style={{color:'yellow' , marginLeft:'5px'}}/>
              </li>
              <li>
              <BsFillStarFill style={{color:'yellow' , marginLeft:'5px'}}/>
              </li>
              <li>
              <BsFillStarFill style={{color:'yellow' , marginLeft:'5px'}}/>
              </li>
              <li>
              <BsFillStarFill style={{color:'yellow' , marginLeft:'5px'}}/>
              </li>
              <li>
              <BsFillStarFill style={{color:'yellow' , marginLeft:'5px'}}/>
              </li>
            </ul>
            <p className="mb-2">
              <i className="fas fa-quote-left pe-2"></i>{props.text}
            </p>
          </div>
        </div>
      </div> 
    );
}

export default FeedbackCard;