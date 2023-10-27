import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Label, Container, Button } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Styles/Register.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string().required("Password is required"),
    Uname: Yup.string().required("Username is required"),
    Phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      Uname: "",
      Phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("uname :" ,values.Uname);
        console.log("password :" ,values.Password);
        console.log("email :" ,values.Email);
        console.log("phone:" ,values.Phone);
        const Userdetails = {
          uname: values.Uname,
          password: values.Password,
          email: values.Email,
          phone: values.Phone,
        }
        const response = await axios.post("https://localhost:7152/api/Users", Userdetails);

        console.log("API Response:", response);
        if (response.status === 201) {
          const user = response.data;
          console.log("user details ", user);
          toast.success("Registered Successfully!");

          setTimeout(() => {
            Navigate("/Login");
          }, 2000);
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        console.error("API request failed:", error);
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
       setError("Invalid email or password");
      }
    },
  });

  return (
    <Container id="regdiv">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 col-sm-12  mt-5 p-5">
          <h1 className="text-center">Register</h1>
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter Email"
                name="Email"
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.Email && formik.errors.Email && (
                <p className="text-danger text-center">{formik.errors.Email}</p>
              )}
            </div>
            <div className="mb-3">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter Password"
                name="Password"
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Password && formik.errors.Password && (
                <p className="text-danger text-center">
                  {formik.errors.Password}
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Enter Username"
                name="Uname"
                value={formik.values.Uname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Uname && formik.errors.Uname && (
                <p className="text-danger text-center">{formik.errors.Uname}</p>
              )}
            </div>
            <div className="mb-3">
              <Label>Phone</Label>
              <Input
                type="number"
                pattern="[0-9]{10}"
                placeholder="Enter phone number"
                name="Phone"
                value={formik.values.Phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Phone && formik.errors.Phone && (
                <p className="text-danger text-center">{formik.errors.Phone}</p>
              )}
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

            <div className="text-center">
              <Button
                type="submit"
                className="btn-dark mt-3 justify-content-center"
              >
                Register <i className="fa-solid fa-user-plus"></i>
              </Button>
            </div>
            <h6 className="mt-3 text-center">
              Already have an Account?{" "}
              <Link to="/Login" id="link">
                Login here
              </Link>
            </h6>
          </Form>
        </div>
        <div className="col-md-5 col-sm-12">
          <img
            alt="reg"
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?size=626&ext=jpg&ga=GA1.1.99625817.1684863857&semt=sph"
            className="img-fluid"
          />
        </div>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default Register;
