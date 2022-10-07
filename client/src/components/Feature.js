import React from 'react';
import Card from "./Card";
import style from './Feature.module.css';
import img1 from "../image/bike-Icon.svg";
import img2 from "../image/Flexible-Ownership.svg";
import img4 from "../image/ONN-Stations.svg";
import img3 from "../image/Smarter-Mobility.svg";

const text1="Your safety is our priority. From sanitizing all bikes before every use, to extensive on-ground safety measures, your rides with ONN will always be safe and reliable. We also offer helmets on-demand.";
const text2="Enjoy the freedom of owning a two-wheeler without the hefty down-payments, EMIs and paperwork. Now choose from rent-to-own, monthly/quarterly bookings, and even daily plans.";
const text3="With your trusty ONN app, you can choose any bike, make instant payments, get offers, and manage all aspect of your ONN experience right from the comfort and ease of your mobile app.";
const text4="Your local ONN Station is here to make ensure your two-wheeler experience is flawless. At your neighborhood station, you get to pick any bike, get maintenance, sanitized, and a lot more.";


const Feature = ()=>{

    return(
        <div className={style.wrapper} id="features">
           <div className={style.text}>
               <h1 className={style.mainHeading}>Why ONN?</h1>
               <h2 className={style.secHeading}>We simplified bike rentals, so you can focus on what's important to you.</h2>
           </div>
           <div className={style.grid}>
              <Card img={img1} title="Safe Rides" text={text1}/>
              <Card img={img2} title="Flexible Ownership" text={text2}/>
              <Card img={img3} title="Smarter Mobility" text={text3}/>
              <Card img={img4} title="ONN Stations" text={text4}/>
           </div>
        </div>
    );
}

export default Feature;