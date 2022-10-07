import React, { useState, useEffect ,useContext , useRef} from "react";
import {Modal , Button} from 'react-bootstrap';
import { useLocation,Link } from "react-router-dom";
import "./FullDetail.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../data/data";
import { userContext } from "../App";

const FullDetail = () => {

  const {state} = useContext(userContext);
  const [showForm,setshowForm] = useState(false);
  const [text,setText] = useState("");

  const openForm = ()=>{setshowForm(true);}
  const closeForm = ()=>{setshowForm(false);}

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const locationRef = useRef();

  const ToggleButton = ()=>{
      if(state.isLoggedIn){
        return(
          <button className="form-button" type="submit">Book Now</button>
        );
      }else{
         return(
           <Link to="/login"><button className="form-button">LOGIN</button></Link>
         );
      }
  }

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const submitHandler = async(e)=>{
    e.preventDefault();
    console.log("called submitHandler");
     const name = nameRef.current.value;
     const email = emailRef.current.value;
     const phone = phoneRef.current.value;
     const location = locationRef.current.value;

     console.log(name,email,phone,location,index);

      const res = await fetch('/contact',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
           name,email,phone,location,index
        })
      });

      if(res.status !== 200){
         console.log("some error occured in booking");
         setText("Some error occured in booking");
         openForm();
         //alert("some error occured in booking");
      }
      else{
        setText("Order is placed. Our client will get in touch with you on call");
         openForm();
         //alert("order is placed. Our client will get in touch with you on call :)");
      }
  }

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
    window.scrollTo(0, 0);
  });

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "3px",
  };

  const useQueryString = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  }

  const queryString = useQueryString();
  const index = parseInt(queryString.get('index'));
  


  const slidesData = [
    {
      id: 0,
      adr: data[index].img[0],
    },
    {
      id: 1,
      adr: data[index].img[1],
    },
    {
      id: 2,
      adr: data[index].img[2],
    },
    {
      id: 3,
      adr: data[index].img[3],
    },
    {
      id: 4,
      adr: data[index].img[4],
    },
  ];

  return (
    <div className="FullDetail">
      <Modal centered show={showForm} onHide={closeForm}>
          <Modal.Header>
              <Modal.Title> {text}</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body>
              <h3>Our client will get in touch with you on call :)</h3>
          </Modal.Body> */}
          <Modal.Footer>
              <Button variant="secondary" onClick={closeForm}>
                  Cancel
              </Button>
            </Modal.Footer>
      </Modal>
      <div className="slider-wrapper DetailSlider">
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
          centerMode="true"
          autoplaySpeed="2000"
          arrows="true"
        >
          {slidesData.map((slide) => (
            <div className="slick-slide" key={slide.id}>
              <h2 className="slick-slide-title">{data[index].title} {data[index].subTitle}</h2>
              <div className="image-cover">
              <img
                className="slick-slide-image fullDetail-image"
                src={slide.adr}
                alt="..."
              />
               </div>
              <label className="slick-slide-label">{slide.label}</label>
            </div>
          ))}
        </Slider>
        <div className="thumbnail-slider-wrap">
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
          >
            {slidesData.map((slide) => (
              <div className="slick-slide thumbnail-cover" key={slide.id}>
                <img className="slick-slide-image thumbnail-image" src={slide.adr} alt="..." />
              </div>
            ))}
          </Slider>
        </div>

        <div className="overview">
          <h1 className="overview-heading">Overview</h1>
          <h2 className="overview-name">
            {data[index].title + " " + data[index].subTitle} on Rent
          </h2>
          <h5 className="overview-info">{data[index].info}</h5>
          <h2 className="overview-name"> Specifications</h2>
          <ul className="overview-list">
            <li className="overview-item">{data[index].specification[0]}</li>
            <li className="overview-item">{data[index].specification[1]}</li>
            <li className="overview-item">{data[index].specification[2]}</li>
            <li className="overview-item">{data[index].specification[3]}</li>
            <li className="overview-item">{data[index].specification[4]}</li>
          </ul>

          <h2 className="overview-name">Fare Chart</h2>
          <table border="1">
            <tr>
              <th>Vechicle</th>
              <th>Daily</th>
              <th>Weekly</th>
              <th>Monthly</th>
            </tr>
            <tr>
              <td className="table-data">
                {data[index].title + " " + data[index].subTitle} on Rent
              </td>
              <td className="table-data">{data[index].daily}</td>
              <td className="table-data">{data[index].weekly}</td>
              <td className="table-data">{data[index].monthly}</td>
            </tr>
          </table>

          <h2 className="overview-name">Terms and conditions</h2>
          <ul className="overview-list">
            <li className="overview-item">Should be above 18 yrs</li>
            <li className="overview-item">
              If any of the damages come to the vehicle, you will be responsible
              for that damage.
            </li>
            <li className="overview-item">
              Bike Security Deposit: Rs 2000/Bike.
            </li>
            <li className="overview-item">
              One helmet is complimentary. The 2nd helmet will be charged at
              Rs.100/ day.
            </li>
            <li className="overview-item">
              Original ID, Paindexsport size photo, and a copy of DL shall be
              deposited.
            </li>
          </ul>
        </div>
      </div>
      <div className="sideBar">
        <form className="FullDetail-form" onSubmit={submitHandler}>
          <h2 className="overview-name form-heading">Order</h2>
          <label for="name" className="label">
            Your Name (required)
            <input type="text" id="name" className="inputText" ref={nameRef}/>
          </label>
          <label for="mail" className="label">
            Your Email (required)
            <input type="email" id="mail" className="inputText" ref={emailRef}/>
          </label>
          <label for="phone" className="label">
            Your Phone (required)
            <input type="number" id="phone" className="inputText" ref={phoneRef}/>
          </label>
          <label for="addr" className="label">
            Location (required)
            <input type="text" id="addr" className="inputText" ref={locationRef}/>
          </label>
          {/* <button className="form-button">Book Now</button> */}
          <ToggleButton/>
        </form>
      </div>
    </div>
  );
};

export default FullDetail;
