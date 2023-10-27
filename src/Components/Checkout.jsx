import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/UserProducts");
  };
  useEffect(() => {
    const userid = localStorage.getItem("userid");
    axios
      .get(`https://localhost:7152/api/Checkouts?userid=${userid}`)
      .then((response) => {
        setUserOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user orders:", error);
      });
  }, []);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://img.freepik.com/premium-vector/delivery-man-are-wheeling-motorcycle-out-from-smartphone_98143-501.jpg?size=626&ext=jpg&ga=GA1.1.99625817.1684863857&semt=sph"
            className="img-fluid"
            alt="Delivery"
          />
        </div>
        <div className="col-md-6">
          {userOrders.length > 0 ? (
            <div>
              <h1>Your Orders</h1>
              {userOrders.map((order) => (
                <div key={order.chid} className="order-card">
                  <Card className="w-75 mt-3 p-3 ms-4" >
                    <img height={50} width={40} alt="logo" src="https://www.cafecoffeeday.com/sites/all/themes/ccd/assets/images/common/logo.png"></img>
                    <h3>Order ID: {order.chid}</h3>
                    <p>
                      <strong>Products: </strong>
                      {order.product}
                    </p>
                    <div className="mx-auto">
                    <p className="d-flex">
                      <strong>Total Price :</strong>  <h3 className="text-danger">₹{order.totalPrice}</h3>
                    </p>
                    </div>
                   
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h3 className="text-center m-5">No Orders.</h3>
              <Button onClick={handlenavigate} className="btn btn-dark">
                Order Now
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
