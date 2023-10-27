import React, { useState, useEffect } from "react";
import "./Styles/Cart.css";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product, setProductNames] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userid"), 10);

    axios
      .get(`https://localhost:7152/api/Carts?userid=${storedUserId}`)
      .then((response) => {
        const allCartItems = response.data;
        setCartItems(allCartItems);
        setIsLoggedIn(true);
        const names = allCartItems.map((item) => item.product).join(",");
        const price = calculateTotalPrice(allCartItems);

        setProductNames(names);
        setTotalPrice(price);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const calculateTotalPrice = (items) => {
    return items
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };
  const handleIncrement = (item) => {
    const updatedQuantity = item.quantity + 1;

    const updatedItems = cartItems.map((cartItem) =>
      cartItem.cid === item.cid
        ? { ...cartItem, quantity: updatedQuantity }
        : cartItem
    );

    setCartItems(updatedItems);
    const updatedTotalPrice = calculateTotalPrice(updatedItems);
    setTotalPrice(updatedTotalPrice);

    updateCartInBackend(item.cid, updatedQuantity);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;

      const updatedItems = cartItems.map((cartItem) =>
        cartItem.cid === item.cid
          ? { ...cartItem, quantity: updatedQuantity }
          : cartItem
      );

      setCartItems(updatedItems);
      const updatedTotalPrice = calculateTotalPrice(updatedItems);
      setTotalPrice(updatedTotalPrice);

      updateCartInBackend(item.cid, updatedQuantity);
    }
  };

  const handleDelete = async (item) => {
    await axios
      .delete(`https://localhost:7152/api/Carts/Delete${item.cid}`)
      .then(() => {
        const updatedItems = cartItems.filter(
          (cartItem) => cartItem.cid !== item.cid
        );
        setCartItems(updatedItems);
        const updatedTotalPrice = calculateTotalPrice(updatedItems);
        setTotalPrice(updatedTotalPrice);
        toast.success("Item removed from cart");
      })
      .catch((error) => {
        console.error("Error deleting item from cart:", error);
      });
  };

  const updateCartInBackend = (cartId, updatedQuantity, updatedPrice) => {
    axios
      .put(`https://localhost:7152/api/Carts/${cartId}`, {
        quantity: updatedQuantity,
        price: updatedPrice,
      })
      .then((response) => {
        toast.success("Updated Successfully");
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating quantity and price:", error);
      });
  };

  const proceedToPayment = () => {
    const userid = localStorage.getItem("userid");
    const totalPrice = parseFloat(calculateTotalPrice(cartItems));
    sessionStorage.setItem("product", product);
    sessionStorage.setItem("price", totalPrice);
    toast.success("Processing Payment ....", {
      icon: (
        <i className="fa-solid fa-spinner fa-spin" style={{ color: "red" }}></i>
      ),
    });
    axios
      .post("https://localhost:7152/api/Checkouts", {
        product: product,
        totalPrice: totalPrice,
        userid: userid,
      })
      .then((response) => {
        clearCart();
        toast.success("Ordered Successfully");
        SendEmail();
        navigate("/Checkout");
      })
      .catch((error) => {
        console.error("Error proceeding to payment:", error);
      });
  };

  const clearCart = () => {
    const storedUserId = parseInt(localStorage.getItem("userid"), 10);

    axios
      .delete(`https://localhost:7152/api/Carts/${storedUserId}`)
      .then(() => {
        setCartItems([]);
        setTotalPrice(0);
      })
      .catch((error) => {
        console.error("Error clearing the cart:", error);
      });
  };

  const SendEmail = async () => {
    const email = localStorage.getItem("email");
    const product = sessionStorage.getItem("product");
    const price = sessionStorage.getItem("price");
    const username = localStorage.getItem("username");

    const emailRequest = {
      toEmail: email,
      product: product,
      totalPrice: price,
      uname:username,
    };

    try {
      const response = await fetch(
        "https://localhost:7152/api/Carts/SendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailRequest),
        }
      );

      if (response.ok) {
        toast.success("Email sent successfully");
        console.log("Email sent successfully");
      } else {
        console.error(`Failed to send email: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  };

  return (
    <div className="cart-container ">
      {isLoggedIn ? (
        <>
          {cartItems.length > 0 ? (
            <>
              <h3 className="cart-title">Your Cart</h3>
              <Table bordered hover responsive className="mb-5">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.cid}>
                      <td>
                        <h4 className="text-capitalize">{item.product}</h4>
                      </td>
                      <td>
                        <img
                          src={`data:image;base64,${item.image}`}
                          alt="Product"
                          height={200}
                        />
                      </td>
                      <td className="quantity-container">
                        <button
                          className="btn btn-dark"
                          onClick={() => handleIncrement(item)}
                        >
                          +
                        </button>
                        <h5 className="quantity-display">{item.quantity}</h5>
                        <button
                          className="btn btn-dark"
                          onClick={() => handleDecrement(item)}
                        >
                          -
                        </button>
                      </td>
                      <td>₹ {item.price}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleDelete(item);
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-end">
                <h3 className="">Total Price: ₹{totalPrice}</h3>
                <Button
                  type="button"
                  className="btn-danger"
                  onClick={() => proceedToPayment()}
                >
                  Proceed to Payment
                </Button>
              </div>
            </>
          ) : (
            <>
            <div className="row">
              <div className="col-12">
              <h1 className="text-center">No items in your cart.&#129402;</h1>
              <Link to="/UserProducts">Add Product to Cart</Link>
              </div>
            </div>
             

              <img height={500} src="https://img.freepik.com/free-vector/add-cart-concept-illustration_114360-1445.jpg?size=626&ext=jpg&ga=GA1.1.99625817.1684863857&semt=ais"></img>
            </>
          )}
        </>
      ) : (
        <p className="text-center">
          You need to be logged in to view your cart.
        </p>
      )}
    </div>
  );
};

export default CartView;
