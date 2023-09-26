import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const UserRegister = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
   const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submit = async (event) => {
    event.preventDefault();
   await axios
     .post("http://localhost:5000/user/register", input)
     .then((res) => {
       console.log(res.data.message);
       navigate("/user/login");
     })
     .catch((error) => {
       console.log(error.response.data.message);
       setError(error.response.data.message);
     });
  };
  return (
    <div
      className="login-container d-flex align-items-center"
      style={{ height: "100vh", width: "100%" }}
    >
      <div className="inner-container d-flex p-5">
        <Col className=" d-flex d-flex w-80 h-100 justify-content-center align-items-center">
          <div className="body w-100">
            <h1>{error}</h1>
            <h1 className="title">Register</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="login d-flex">
              <form className="d-flex flex-column">
                <input
                  type="text "
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                  className="bg-transparent p-2 w-100 border-0 border-bottom  mb-3 text-white"
                  placeholder="Enter your username"
                  style={{ outline: "none" }}
                />
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="bg-transparent p-2 w-100 border-0 border-bottom  mb-3 text-white"
                  placeholder="Enter your email"
                  style={{ outline: "none" }}
                />
                <input
                  type="text "
                  name="phone"
                  value={input.phone}
                  onChange={handleChange}
                  className="bg-transparent p-2 w-100 border-0 border-bottom  mb-3 text-white"
                  placeholder="Enter your Phone"
                  style={{ outline: "none" }}
                />

                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  className="bg-transparent  p-2 w-100 border-0 border-bottom mb-3 text-white"
                  placeholder="Enter your Password"
                  style={{ outline: "none" }}
                />
                <button type="submit" onClick={submit} className="login-btn">
                  Register
                </button>
              </form>
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default UserRegister;
