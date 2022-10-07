import React,{useContext, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.module.css';
import {Link , useNavigate } from "react-router-dom";
 import { userContext } from '../App';

const Login = ()=>{

   const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {dispatch} = useContext(userContext);

   const submitHandler = async(e)=>{
    e.preventDefault();
 
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  
    console.log(email, password);

    let res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

   // const data = await res.json();
     console.log("status ",res.status);

    if (res.status !== 200) {
      console.log("Some Problem Occured in Login");
      window.alert("Invalid Credentials");
    } else {
      console.log("Login Succressful");
      //console.log(res);
      dispatch({type:"LOGIN",val:email});
      emailRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/");
    }
   }

   return(
    <section className="vh-100">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 text-black" style={{marginTop:'4rem'}}>
  
          <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
  
            <form style={{width:'23rem' , margin:'auto' , textAlign:'center'}} method="POST" onSubmit={submitHandler}>
  
              <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing:'1px'}}>Log in</h3>
  
              <div className="form-outline mb-4">
                <input type="email" id="form2Example18" className="form-control form-control-lg" ref={emailRef}/>
                <label className="form-label" for="form2Example18">Email address</label>
              </div>
  
              <div className="form-outline mb-4">
                <input type="password" id="form2Example28" className="form-control form-control-lg" ref={passwordRef}/>
                <label className="form-label" for="form2Example28">Password</label>
              </div>
  
              <div className="pt-1 mb-4">
                <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
              </div>
  
              {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p> */}
              <p>Don't have an account?<Link to="/register" className="link-info">Register here</Link></p>
  
            </form>
  
          </div>
  
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img src="https://downloadhdwallpapers.in/wp-content/uploads/2017/12/Bullet-Bike-HD-Wallpaper.jpg"
            alt="LoginImage" className="w-100 vh-100" style={{objectFit:'cover' , objectPosition:'left'}} />
        </div>
      </div>
    </div>
  </section>
   );
}

export default Login;