import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cpassword = cpasswordRef.current.value;

    if (password.trim() !== cpassword.trim()) {
      return window.alert("password don't match");
    }

    console.log(name, email, password);

    let res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });

   // const data = await res.json();
     console.log("status ",res.status);

    if (res.status !== 200) {
      console.log("Some Problem Occured in Registration");
      window.alert("Error Occured during Registration");
    } else {
      console.log("Registration Succressful");
      console.log(res);

      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      cpasswordRef.current.value = "";
      navigate("/login");
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="https://downloadhdwallpapers.in/wp-content/uploads/2017/12/Bullet-Bike-HD-Wallpaper.jpg"
              alt="LoginImage"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
          <div className="col-sm-6 text-black" style={{ marginTop: ".5rem" }}>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form
                style={{ width: "23rem", margin: "auto", textAlign: "center" }}
                method="POST"
                onSubmit={submitHandler}
              >
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign Up
                </h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="formName"
                    className="form-control form-control-lg"
                    ref={nameRef}
                  />
                  <label className="form-label" for="formName">
                    Name
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    ref={emailRef}
                  />
                  <label className="form-label" for="form2Example18">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    ref={passwordRef}
                  />
                  <label className="form-label" for="form2Example28">
                    Password
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="formpass"
                    className="form-control form-control-lg"
                    ref={cpasswordRef}
                  />
                  <label className="form-label" for="formpass">
                    Confrim Password
                  </label>
                </div>

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block"
                    type="submit"
                  >
                    Signup
                  </button>
                </div>

                <p>
                  Already Have an account?{" "}
                  <Link to="/login" className="link-info">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
