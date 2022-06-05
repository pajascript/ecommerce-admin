import React from "react";
import "./topbar.css";
import logo from "../../images/logo.jpg";
import { useHistory } from "react-router-dom"

const Topbar = () => {

  const history = useHistory();

  const handleClick = () => {
    history.push("/")
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={logo} className="logo" alt="" />
        </div>
        <div className="topRight">
          <button style={{
                  border: "none",
                  padding: 5,
                  marginRight: 10
              }} onClick={handleClick} >Logout</button>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;