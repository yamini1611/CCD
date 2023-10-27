import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { logout } from "./Redux/authAction";
import { decryptPassword } from "./Login";
import "./Styles/Navbar.css";
import Badge from "react-bootstrap/Badge";

const Navbarjsx = () => {
  const roleId = useSelector((state) => state.auth.roleId);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const Phone = localStorage.getItem("phone");
  const Password = localStorage.getItem("password");
  const decryptedPassword = decryptPassword(Password);
  const email = localStorage.getItem("email");
  const role = sessionStorage.getItem("roleId");
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchcartlength();
    setInterval(fetchcartlength, 1000); 

  }, []);

  const fetchcartlength = () => {
    const storedUserId = parseInt(localStorage.getItem("userid"), 10);

    axios
      .get(`https://localhost:7152/api/Carts?userid=${storedUserId}`)
      .then((response) => {
        const allCartItems = response.data.length;
        console.log("length", allCartItems);
        setCartItems(allCartItems);
      }, )
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    uname: username,
    password: decryptedPassword,
    phone: Phone,
    email: email,
    roleid: roleId,
  });

  const handleLogout = () => {
    navigate("/Login");
    toast.success("Logged out Successfully", {
      position: "top-center",
    });
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleEditUser = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7152/api/Users/${userId}`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile Updated");
        handleClose();
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="divblack">
        <Link to="/" id="link">
          <img
            height={75}
            src="https://www.cafecoffeeday.com/sites/all/themes/ccd/assets/images/common/logo.png"
            className="transparent secondary"
            alt="CG-VAK Software & Exports Ltd"
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="collapse">
          <i className="fa-solid fa-bars" style={{ color: "red" }}></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="text-start">
          <Nav className="me-auto">
            {role === "1" && (
              <>
                <Link id="link" to="/Menu">
                  <h5 className="ms-3">Cafe Menu</h5>
                </Link>
              </>
            )}
            {role === "2" && (
              <>
                <Link id="link" to="/UserProducts">
                  <h5 className="ms-3">Cafe Menu</h5>
                </Link>
                <Link id="link" to="/Checkout">
                  <h5 className="ms-3">Orders</h5>
                </Link>
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <Link to="/Cart">
                  <Badge className="ms-5" bg="warning">
                    {cartItems}
                  </Badge>
                  <h5 className="">
                    <img
                      alt="logo"
                      src="https://www.cafecoffeeday.com/sites/all/themes/ccd/assets/images/cafe-menu/cart-icon.gif"
                      height={30}
                    ></img>
                  </h5>
                </Link>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle
                    className="transparent"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                  >
                    <h4 id="navlink" className="mt-2 text-capitalize">
                      <i
                        className="fa-solid fa-user fa-flip me-2"
                        style={{ color: "white" }}
                      ></i>
                      {username}
                    </h4>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleEditUser}>
                      Edit User
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link id="link" to="/Register">
                  <h5 className="ms-3">
                    Register <i className="fa-solid fa-user-plus"></i>
                  </h5>
                </Link>
                <Link id="link" to="/Login">
                  <h5 className="ms-3">
                    Login <i className="fa-solid fa-right-to-bracket"></i>
                  </h5>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="uname"
                value={userDetails.uname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-warning" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn-danger" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Navbarjsx;
