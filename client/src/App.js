import React, { createContext, useReducer } from "react";
import Feedback from "./components/Feedback";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Feature from "./components/Feature";
import Pricing from "./components/Pricing";
import FullDetail from "./components/FullDetail";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import Body from "./components/Auction/Body";
import UserProfile from "./components/userProfile";
import { Routes, Route } from "react-router-dom";
import { reducer, initialState } from "./useReducer/useReducer";

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header /> <Feature /> <Pricing /> <Feedback /> <Footer/>
          </>
        }
      />
      {/* <Route path="/home" exact element={<Header />} /> */}
      <Route path="/login" exact element={<Login />} />
      <Route path="/logout" exact element={<Logout />} />
      <Route path="/about" exact element={<UserProfile />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/auction" exact element={<Body/>} />
      <Route
        path="/fullinfo"
        exact
        element={
          <>
            <FullDetail />
          </>
        }
      />
    </Routes>
  );
};

export const userContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>
      <userContext.Provider value={{ state, dispatch }}>
        <NavBar />
        <Routing />
      </userContext.Provider>
    </React.Fragment>
  );
}

export default App;
