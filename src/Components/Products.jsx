import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import CoffeeForm, { EatableForm, MilkshakeForm } from "./Modals";
import "./Styles/Products.css";

const Product = () => {
  const [activeKey, setActiveKey] = useState("tab1");
  const [coffees, setCoffees] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateEatableModal, setShowCreateEatableModal] = useState(false);
  const [showCreateMilkshakeModal, setShowCreateMilkshakeModal] =useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);
  const [selectedEatableid, setselectedEatableid] = useState(null);
  const [eatables, setEatables] = useState([]);
  const [selectedEatable, setSelectedEatable] = useState(null);
  const [milkshakes, setMilkshakes] = useState([]);
  const [selectedMilkshakeId ,setMilkshakesId] =useState(null);
  const [selectedMilkshake ,setselectedMilkshakes] =useState(null);

  const handleTabSelect = (key) => {
    setActiveKey(key);
  };

  const fetchCoffees = async () => {
    try {
      const response = await axios.get("https://localhost:7152/api/Coffees");
      setCoffees(response.data);
    } catch (error) {
      console.error("Error fetching coffee data:", error);
    }
  };

  const addCoffee = (newCoffee) => {
    setCoffees([...coffees, newCoffee]);
  };
  const addEatable = (newEatable) => {
    setEatables([...eatables, newEatable]);
  };

  const addMilkshake = (newMilkshake) => {
    setMilkshakes([...milkshakes, newMilkshake]);
  };

 
  const deleteCoffee = async (selectedCoffeeId) => {
    try {
      window.confirm("Are you sure to delete?");
      await axios.delete(`https://localhost:7152/api/Coffees/${selectedCoffeeId}`);
      const updatedCoffees = coffees.filter(
        (coffee) => coffee.coffeeid !== selectedCoffeeId
      );
      setCoffees(updatedCoffees);
    } catch (error) {
      console.error("Error deleting coffee:", error);
    }
  };
  const deleteEatble = async (selectedCoffeeId) => {
    try {
      window.confirm("Are you sure to delete?");
      await axios.delete(`https://localhost:7152/api/Eatables/${selectedCoffeeId}`);
      const updatedCoffees = eatables.filter(
        (coffee) => coffee.eid !== selectedCoffeeId
      );
      setCoffees(updatedCoffees);
    } catch (error) {
      console.error("Error deleting coffee:", error);
    }
  };
  const deleteMilkshake = async (selectedCoffeeId) => {
    try {
      window.confirm("Are you sure to delete?");
      await axios.delete(`https://localhost:7152/api/Milkshakes/${selectedCoffeeId}`);
      const updatedCoffees = milkshakes.filter(
        (coffee) => coffee.mid !== selectedCoffeeId
      );
      setCoffees(updatedCoffees);
    } catch (error) {
      console.error("Error deleting coffee:", error);
    }
  };
  const handleCreateMilkshake = () => {
    setShowCreateMilkshakeModal(true);
  };

  const handleCreateEatable = () => {
    setShowCreateEatableModal(true);
  };
  const handleCreateClick = () => {
    setSelectedCoffee(null);
    setShowCreateModal(true);
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

  return (
    <div className="container">
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
            <div>
              <div className="text-start mb-2">
                <Button
                  variant="dark"
                  onClick={handleCreateClick}
                  className="ms-3"
                >
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </div>

              <div className="d-flex flex-wrap">
                {coffees.map((coffee) => (
                  <div key={coffee.coffeeid} className="w-25 p-2">
                    <Card className="">
                      <img
                        className="ms-4 pt-2 "
                        src={`data:image/jpeg;base64,${coffee.image}`}
                        alt={coffee.CoffeeName}
                        style={{ width: "250px", height: "220px" }}
                      />
                      <h5 className="mt-1">{coffee.coffeeName}</h5>
                      <div className="d-flex justify-content-center">
                        <h5 id="op">₹{coffee.originalPrice}</h5>
                        <h3 className="ms-3">₹{coffee.offerPrice}</h3>
                      </div>
                      <h6>{coffee.offer}% OFF</h6>
                      <div className="container mb-2">
                        <Button
                          variant="info"
                          onClick={() => {
                            setSelectedCoffee(coffee);
                            setSelectedCoffeeId(coffee.coffeeid);
                            setShowCreateModal(true);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Button>

                        <Button
                          className="ms-3"
                          variant="danger"
                          onClick={() => deleteCoffee(coffee.coffeeid)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="tab2">
            <div>
              <div className="text-start mb-2">
                <Button variant="dark" onClick={handleCreateEatable}>
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </div>

              <div className="d-flex flex-wrap">
                {eatables.map((coffee) => (
                  <div key={coffee.eid} className="w-25 p-2">
                    <Card>
                      <img
                        className="ms-4 pt-2"
                        src={`data:image/jpeg;base64,${coffee.image}`}
                        alt={coffee.CoffeeName}
                        style={{ width: "250px", height: "220px" }}
                      />
                      <h5 className="mt-1">{coffee.ename}</h5>
                      <div className="d-flex justify-content-center">
                        <h5 id="op">₹{coffee.originalPrice}</h5>
                        <h3 className="ms-3">₹{coffee.offerPrice}</h3>
                      </div>
                      <h6>{coffee.offer}OFF</h6>
                      <div className="container mb-2">
                        <Button
                          variant="info"
                          onClick={() => {
                            setSelectedEatable(coffee); 
                            setselectedEatableid(coffee.eid);
                            setShowCreateEatableModal(true);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Button>

                        <Button
                          className="ms-3"
                          variant="danger"
                          onClick={() => deleteEatble(coffee.eid)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="tab3">
            <div>
              <div className="text-start mb-2">
                <Button variant="dark" onClick={handleCreateMilkshake}>
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </div>

              <div className="d-flex flex-wrap">
                {milkshakes.map((milkshake) => (
                  <div key={milkshake.mid} className="w-25 p-2">
                    <Card>
                      <img
                        className="ms-4 pt-2"
                        src={`data:image/jpeg;base64,${milkshake.image}`}
                        alt={milkshake.mname}
                        style={{ width: "250px", height: "220px" }}
                      />
                      <h5 className="mt-1">{milkshake.mname}</h5>
                      <div className="d-flex justify-content-center">
                        <h5 id="op">₹{milkshake.originalPrice}</h5>
                        <h3 className="ms-3">₹{milkshake.offerPrice}</h3>
                      </div>
                      <h6>{milkshake.offer} OFF</h6>
                      <div className="container mb-2">
                      <Button
                          variant="info"
                          onClick={() => {
                            setselectedMilkshakes(milkshake)
                            setMilkshakesId(milkshake.mid);
                            setShowCreateMilkshakeModal(true);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                        <Button
                          className="ms-3"
                          variant="danger"
                          onClick={() => deleteMilkshake(milkshake.mid)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <CoffeeForm
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={addCoffee}
        coffee={selectedCoffee}
        coffeeId={selectedCoffeeId}
      />

      <EatableForm
        show={showCreateEatableModal}
        onHide={() => setShowCreateEatableModal(false)}
        onSubmit={addEatable}
        eatable={selectedEatable}
        eatableid={selectedEatableid}
      />

      <MilkshakeForm
         show={showCreateMilkshakeModal}
         onHide={() => setShowCreateMilkshakeModal(false)}
         onSubmit={addMilkshake}
         eatable={selectedMilkshake}
         eatableid={selectedMilkshakeId}
      />
    </div>
  );
};

export default Product;
