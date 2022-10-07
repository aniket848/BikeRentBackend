import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FeedbackCard from './FeedbackCard';

const Feedback = ()=>{

  return (
      <div className="container py-5" id="feedback">
    <div className="row d-flex justify-content-center">
      <div className="col-md-10 col-xl-8 text-center">
        <h3 className="fw-bold mb-4" style={{fontSize:'2.4rem'}}>What Our Customers Say About Us</h3>
        {/* <p className="mb-4 pb-2 mb-md-5 pb-md-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet
          numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum
          quisquam eum porro a pariatur veniam.
        </p> */}
      </div>
    </div>

    <div className="row text-center">
       <FeedbackCard img="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" desg="Charted Accountant" name="Nikita Gupta" text="When there is a need for a quality vehicle rental for my client I always go for bikeAdda without a doubt"/>
       <FeedbackCard img="https://th.bing.com/th/id/OIP.msKcBNB3RW8n_E9zJKTjTAAAAA?pid=ImgDet&rs=1" desg="Software Developer" name="Arnav Tiwari" text="We are proud to be the first client of bikeAdda and They are Part of our family for last 5 years. I wish then luck in future."/>
       <FeedbackCard img="https://th.bing.com/th/id/OIP.yL4qUGliK1d3euIns90WYwHaEK?pid=ImgDet&rs=1" desg="College Student" name="Saurav Tandon" text="I Required a Tempo Traveller for marriage and bikeAdda provided the kind of service that I was looking for."/>
    </div>
      </div>
);

}

 export default Feedback;   