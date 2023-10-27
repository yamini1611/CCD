import React from "react";
import "./Styles/Home.css";
import video from "./Assets/Images/pexels-tim-douglas-6201669 (2160p).mp4";


const Home = () => {
  return (
    <div className=" ms-2 mt-4" id="home">
      <div className="row container-fluid">
        <div className="col-md-12">
          <img
            src="https://www.cafecoffeeday.com/sites/default/files/desktop-new%20menu-cafe-coffee-day_1.jpg"
            className="img-fluid"
            alt="Cafe Coffee Day"
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-11 mx-auto">
          <h1 className="pb-3">Artistry in Every Cup: Where Coffee Meets Creativity</h1>
          <div className="embed-responsive embed-responsive-16by9 container-fluid">
            <video
              className="embed-responsive-item"
              autoPlay
              loop
              muted
              id="home-bg-video"
              width="100%"
              height="100%"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="row mt-4  container-fluid">
        <div className="col-12 text-center ">
          <h1 className="text-center text-capitalize mb-3">
            Introducing our new Summer Beverage
          </h1>
          <img
            className="img-fluid mt-2"
            src="https://www.cafecoffeeday.com/sites/default/files/R-SB23-Website%20Banner-1.png"
            alt="Summer Beverage"
          />
        </div>
      </div>

      <div className="row mt-4 mb-5 container-fluid p-3">
        <div className="col-12 text-center">
          <h1 className="text-center text-capitalize mb-2">
            Introducing our new Burgers
          </h1>
          <img
            className="img-fluid mt-3"
            src="https://www.cafecoffeeday.com/sites/default/files/SB23-Website%20Banner-2.png"
            alt="Burgers"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
