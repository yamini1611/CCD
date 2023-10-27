import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer id="foot"  className="text-white p-4 mt-5">
        <div className="text-center ">
          © 2020 Copyright : 
          <Link className="text-white ms-1" to="/">
             <img height={40} src="https://www.cafecoffeeday.com/sites/all/themes/ccd/assets/images/common/logo.png"></img>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
