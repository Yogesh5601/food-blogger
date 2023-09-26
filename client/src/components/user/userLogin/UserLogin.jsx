import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loader from "../../../assets/loader.gif";

const UserLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
   const [error, setError] = useState("");

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
      .post("http://localhost:5000/user/login", input)
      .then((res) => {
        console.log(res.data.message);
        console.log(res.data.data.username)
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("email", res.data.data.username);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
    // setInput({
    //   email: "",
    //   password: "",
    // });
  };
  return (
    <>
       
        <div
          className="login-container d-flex align-items-center"
          style={{ height: "100vh", width: "100%" }}
        >
          <div className="inner-container d-flex p-5">
            <Col className=" d-flex d-flex w-80 h-100 justify-content-center align-items-center">
              <div className="body w-100">
                <p>{error}</p>
                <h1 className="title">Login</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="login d-flex">
                  <form className="d-flex flex-column">
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
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      className="bg-transparent  p-2 w-100 border-0 border-bottom mb-3 text-white"
                      placeholder="Enter your Password"
                      autoComplete=""
                      style={{ outline: "none" }}
                    />
                    <button
                      type="submit"
                      onClick={submit}
                      className="login-btn"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </Col>
          </div>
        </div>
    </>
  );
};

export default UserLogin;
