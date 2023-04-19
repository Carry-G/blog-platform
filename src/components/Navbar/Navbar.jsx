import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SmileFilled } from "@ant-design/icons";

import AuthContex from "../../context";
import "./Navbar.scss";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContex);
  const logout = () => {
    setIsAuth(false);
    localStorage.clear();
  };
  const imagePhoto = localStorage.getItem("image") ? (
    <img src={localStorage.getItem("image")} alt="User" />
  ) : (
    <SmileFilled style={{ fontSize: "40px" }} />
  );
  return (
    <div className="navbar">
      <div className="links">
        <span className="left">
          <Link to="/articles">Realworld Blog</Link>
        </span>
        <span className="right">
          {" "}
          {isAuth ? (
            <span className="profile">
              <Link to="/new-article" className="bnt green creat">
                Create article
              </Link>
              <Link to="/profile" className="user">
                {localStorage.getItem("username")}
                {imagePhoto}
              </Link>
              <button onClick={logout} type="button" className="bnt grea">
                Log Out
              </button>
            </span>
          ) : (
            <span>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up" className="bnt green">
                Sign Up
              </Link>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
export default Navbar;
