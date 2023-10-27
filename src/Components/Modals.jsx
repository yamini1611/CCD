import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";

const CoffeeForm = ({ show, onHide, onSubmit, coffee, coffeeId }) => {
  const [coffeeName, setCoffeeName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [stock, setStock] = useState("");
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (coffee) {
      setCoffeeName(coffee.coffeeName);
      setOriginalPrice(coffee.originalPrice);
      setOfferPrice(coffee.offerPrice);
      setStock(coffee.stock);
      setOffer(coffee.offer);
      setImage(null);
    }
  }, [coffee]);

  const handleSubmit = async () => {
    const newCoffee = {
      coffeeName: coffeeName,
      originalPrice: originalPrice,
      offerPrice: offerPrice,
      stock: stock,
      offer: offer,
      image: "",
    };

    try {
      if (image) {
        const base64Image = await convertImageToBase64(image);
        newCoffee.image = base64Image;
      }

      if (coffeeId) {
        await axios.put(`https://localhost:7152/api/Coffees/${coffeeId}`, newCoffee);
      } else {
        const response = await axios.post("https://localhost:7152/api/Coffees", newCoffee);
        onSubmit(response.data);
      }
      
      toast.success(coffeeId ? "Product Updated Successfully" : "Product Added Successfully");
    } catch (error) {
      console.error(`Error ${coffeeId ? "updating" : "creating"} coffee:`, error);
    }

    onHide();
  }

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{coffeeId ? "Edit Coffee" : "Add Coffee"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Coffee Name:</label>
            <input
              type="text"
              className="form-control"
              value={coffeeName}
              onChange={(e) => setCoffeeName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Original Price:</label>
            <input
              type="number"
              className="form-control"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Offer Price:</label>
            <input
              type="number"
              className="form-control"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Offer:</label>
            <input
              type="text"
              className="form-control"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {coffeeId ? "Save Changes" : "Create Coffee"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CoffeeForm;


export const EatableForm = ({ show, onHide, onSubmit, eatable, eatableid }) => {
  const [ename, setEatableName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [offerPrice, setOfferPrice] = useState("");
  const [offer, setOffer] = useState("");

  useEffect(() => {
    if (eatable) {
      setEatableName(eatable.ename);
      setPrice(eatable.originalPrice);
      setOfferPrice(eatable.offerPrice);
      setStock(eatable.stock);
      setOffer(eatable.offer);
      setImage(null);
    }
  }, [eatable]);

  const handleSubmit = async () => {
    const newEatable = {
      ename: ename,
      originalPrice: price,
      offerPrice: offerPrice,
      stock: stock,
      offer: offer,
      image: "",
    };

    try {
      if (image) {
        const base64Image = await convertImageToBase64(image);
        newEatable.image = base64Image;
      }

      if (eatableid) {
        await axios.put(`https://localhost:7152/api/Eatables/${eatableid}`, newEatable);
      } else {
        const response = await axios.post("https://localhost:7152/api/Eatables", newEatable);
        onSubmit(response.data);
      }
      
      toast.success(eatableid ? "Product Updated Successfully" : "Product Added Successfully");
    } catch (error) {
      console.error(`Error ${eatableid ? "updating" : "creating"} eatable:`, error);
    }

    onHide();
  }

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{eatableid ? "Edit Eatable" : "Add Eatable"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Eatable Name:</label>
            <input
              type="text"
              className="form-control"
              value={ename}
              onChange={(e) => setEatableName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Offer Price:</label>
            <input
              type="number"
              className="form-control"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Offer:</label>
            <input
              type="text"
              className="form-control"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {eatableid ? "Save Changes" : "Create Eatable"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export const MilkshakeForm = ({ show, onHide, onSubmit, eatable, eatableid }) => {
  const [ename, setEatableName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [offerPrice, setOfferPrice] = useState("");
  const [offer, setOffer] = useState("");

  useEffect(() => {
    if (eatable) {
      setEatableName(eatable.mname);
      setPrice(eatable.originalPrice);
      setOfferPrice(eatable.offerPrice);
      setStock(eatable.stock);
      setOffer(eatable.offer);
      setImage(null);
    }
  }, [eatable]);

  const handleSubmit = async () => {
    const newEatable = {
      mname: ename,
      originalPrice: price,
      offerPrice: offerPrice,
      stock: stock,
      offer: offer,
      image: "",
    };

    try {
      if (image) {
        const base64Image = await convertImageToBase64(image);
        newEatable.image = base64Image;
      }

      if (eatableid) {
        await axios.put(`https://localhost:7152/api/MilkShakes/${eatableid}`, newEatable);
      } else {
        const response = await axios.post("https://localhost:7152/api/MilkShakes", newEatable);
        onSubmit(response.data);
      }
      
      toast.success(eatableid ? "Product Updated Successfully" : "Product Added Successfully");
    } catch (error) {
      console.error(`Error ${eatableid ? "updating" : "creating"} eatable:`, error);
    }

    onHide();
  }

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{eatableid ? "Edit Eatable" : "Add Eatable"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Eatable Name:</label>
            <input
              type="text"
              className="form-control"
              value={ename}
              onChange={(e) => setEatableName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Offer Price:</label>
            <input
              type="number"
              className="form-control"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Offer:</label>
            <input
              type="text"
              className="form-control"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {eatableid ? "Save Changes" : "Create Milkshake"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
