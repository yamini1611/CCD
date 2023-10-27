import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./Styles/Login.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProduct = () => {
  const [activeKey, setActiveKey] = useState("tab1");
  const [coffees, setCoffees] = useState([]);
  const [eatables, setEatables] = useState([]);
  const [milkshakes, setMilkshakes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoffees, setFilteredCoffees] = useState([]);
  const [filteredEatables, setFilteredEatables] = useState([]);
  const [filteredMilkshakes, setFilteredMilkshakes] = useState([]);
  const userid = localStorage.getItem("userid");
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredCoffee = coffees.filter((coffee) =>
      coffee.coffeeName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCoffees(filteredCoffee);

    const filteredEatable = eatables.filter((eatable) =>
      eatable.ename.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEatables(filteredEatable);

    const filteredMilkshake = milkshakes.filter((milkshake) =>
      milkshake.mname.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMilkshakes(filteredMilkshake);
  };

  const handleTabSelect = (key) => {
    setActiveKey(key);
  };

  const fetchCoffees = async () => {
    try {
      const response = await axios.get("https://localhost:7152/api/Coffees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoffees(response.data);
    } catch (error) {
      console.error("Error fetching coffee data:", error);
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  const fetchEatables = async () => {
    try {
      const response = await axios.get("https://localhost:7152/api/Eatables");
      setEatables(response.data);
    } catch (error) {
      console.error("Error fetching Eatables data:", error);
    }
  };

  const fetchMilkshakes = async () => {
    try {
      const response = await axios.get("https://localhost:7152/api/MilkShakes");
      setMilkshakes(response.data);
    } catch (error) {
      console.error("Error fetching Milkshakes data:", error);
    }
  };

  useEffect(() => {
    fetchEatables();
    fetchMilkshakes();
  }, []);

  const postCoffeeToCart = (coffee) => {
    const cartItem = {
      product: coffee.coffeeName,
      price: coffee.offerPrice,
      quantity: 1,
      image: coffee.image,
      userid: userid,
    };

    axios
      .post("https://localhost:7152/api/Carts", cartItem)
      .then((response) => {
        toast.success("Added to cart");
        navigate('/Cart');
        console.log("Coffee added to cart:", response.data);
      })
      .catch((error) => {
        console.error("Error adding coffee to cart:", error);
      });
  };
  const postEatableToCart = (eatable) => {
    const cartItem = {
      product: eatable.ename,
      price: eatable.offerPrice,
      quantity: 1,
      image: eatable.image,
      userid: userid,
    };

    axios
      .post("https://localhost:7152/api/Carts", cartItem)
      .then((response) => {
        toast.success("Added to cart");
        navigate('/Cart');
        console.log("Eatable added to cart:", response.data);
      })
      .catch((error) => {
        console.error("Error adding eatable to cart:", error);
      });
  };
  const postMilkshakeToCart = (milkshake) => {
    const cartItem = {
      product: milkshake.mname,
      price: milkshake.offerPrice,
      quantity: 1,
      image: milkshake.image,
      userid: userid,
    };

    axios
      .post("https://localhost:7152/api/Carts", cartItem)
      .then((response) => {
        toast.success("Added to cart");
        navigate('/Cart');
        console.log("Milkshake added to cart:", response.data);
      })
      .catch((error) => {
        console.error("Error adding milkshake to cart:", error);
      });
  };

  return (
    <div className="container mt-4">
    <Tab.Container activeKey={activeKey} onSelect={handleTabSelect}>
      <Nav variant="tabs" className="justify-content-center">
        <Nav.Item>
          <Nav.Link eventKey="tab1">
            <h6>Coffee</h6>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab2">
            <h6>Food</h6>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab3">
            <h6>Milkshake</h6>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="tab1">
          <div className="text-start mb-2">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search for coffee..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {(searchQuery ? filteredCoffees : coffees).map((coffee) => (
              <Card
                key={coffee.coffeeid}
                className="col-md-4 col-lg-3 m-3 pb-2 pe-3 "
                id="cardhover"
              >
                <img
                  className="ms-5 pt-3 pb-2"
                  src={`data:image/jpeg;base64,${coffee.image}`}
                  alt={coffee.CoffeeName}
                />
                <h5 className="mt-1">{coffee.coffeeName}</h5>
                <div className="d-flex justify-content-center">
                  <h5 id="op">₹{coffee.originalPrice}</h5>
                  <h3 className="ms-3">₹{coffee.offerPrice}</h3>
                </div>
                <h6>{coffee.offer}% OFF</h6>
                <div className="d-flex justify-content-center">
                  <button
                    className="add-to-cart-button btn btn-danger"
                    onClick={() => postCoffeeToCart(coffee)}
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Tab.Pane>

        <Tab.Pane eventKey="tab2">
          <div className="text-start mb-2">
            <input
              className="form-control w-25"
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {(searchQuery ? filteredEatables : eatables).map((eatable) => (
              <Card
                key={eatable.eid}
                className="col-md-4 col-lg-3 m-3 pb-2  pe-3 "
                id="cardhover"
              >
                <img
                  className="ms-5 pt-4 pb-2"
                  src={`data:image/jpeg;base64,${eatable.image}`}
                  alt={eatable.CoffeeName}
                />
                <h5 className="mt-1">{eatable.ename}</h5>
                <div className="d-flex justify-content-center">
                  <h5 id="op">₹{eatable.originalPrice}</h5>
                  <h3 className="ms-3">₹{eatable.offerPrice}</h3>
                </div>
                <h6>{eatable.offer} OFF</h6>
                <div className="d-flex justify-content-center">
                  <button
                    className="add-to-cart-button btn btn-danger"
                    onClick={() => postEatableToCart(eatable)}
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Tab.Pane>

        <Tab.Pane eventKey="tab3">
          <div className="text-start mb-2">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search for milkshake..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            {(searchQuery ? filteredMilkshakes : milkshakes).map(
              (milkshake) => (
                <Card
                  key={milkshake.mid}
                  className="col-md-4 col-lg-3 m-3  pe-3  pb-2"
                  id="cardhover"
                >
                  <img
                    className="ms-5 pt-3 pb-2"
                    src={`data:image/jpeg;base64,${milkshake.image}`}
                    alt={milkshake.mname}
                  />
                  <h5 className="mt-1">{milkshake.mname}</h5>
                  <div className="d-flex justify-content-center">
                    <h5 id="op">₹{milkshake.originalPrice}</h5>
                    <h3 className="ms-3">₹{milkshake.offerPrice}</h3>
                  </div>
                  <h6>{milkshake.offer} OFF</h6>
                  <div className="d-flex justify-content-center">
                    <button
                      className="add-to-cart-button btn btn-danger"
                      onClick={() => postMilkshakeToCart(milkshake)}
                    >
                      <i className="fa-solid fa-cart-plus"></i>
                    </button>
                  </div>
                </Card>
              )
            )}
          </div>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  </div>
);
};

export default UserProduct;
