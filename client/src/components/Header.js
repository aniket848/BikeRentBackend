import React,{useEffect,useState} from 'react';
import style from "./Header.module.css";

const Images = [
    { id: 0, url: 'https://images.pexels.com/photos/819805/pexels-photo-819805.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 1, url: 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, url: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, url: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ]

const Header = ()=>{
          
          //const Images = [ ...imageArray ]
        const [position, setPosition] = useState(0);
       useEffect(() => {
         const interval = setInterval(() => {
          if (position === 3) setPosition(0);
          else setPosition(position + 1);
          }, 5000);
          return () => clearInterval(interval);
         }, [position]);

  return (
    <div className={style.HomePage} id="home">
      {/* <div style={{url`("${Images[position].img}")`}} className="bg_images_login"> */}
      <div style={{ backgroundImage:`url(${Images[position].url})` }} className={style.bg_images_login}></div>
      <div className={style.text}>
      <div >
            <h1 className={style.mainHeading}>SELF RIDE BIKE RENTALS</h1>
            {/* <h1 className={style.mainHeading}>PROLIFIC TENDERS</h1> */}
      </div>
      <div >
            <h2 className={style.subHeading}>RENT TODAY, OWN TOMORROW</h2>
            {/* <h2 className={style.subHeading}>START YOUR OWN CAREER</h2> */}
      </div>
      <div >
            <h3 className={style.subText}>Explore your life to the fullest</h3>
      </div>
      </div>
    </div>
    );

}

export default Header;