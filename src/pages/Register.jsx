import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate =useNavigate();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    const { password, email, username } = value;
    e.preventDefault();
    if(handleValidation()){
       const { data } = await axios.post(registerRoute,{
         username,
         email,
         password
       });
       if(data.status === false){
         toast.error(data.msg, toastOption)
       }
       if(data.status === true){
         localStorage.setItem("chat-app-user",JSON.stringify(data.user));
         navigate("/setAvatar");
       }
    }
  };
  const handlechange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  function handleValidation () {
    const { password, confirmPassword, email, username } = value;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.",toastOption);
      return false;
    }else if(username.length < 3){
      toast.error("Username should be grenater than 3 characters.",toastOption);
      return false;
    }else if(email === ""){
      toast.error("Email is required.",toastOption);
      return false;
    }else if(password.length < 3){
      toast.error("Password should be equal or grenater than 3 characters.",toastOption);
      return false;
    }
    return true;
  };
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
       navigate('/');
    }
  },[]);

  return (
    <>
        <FormContainer>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="brand">
              <img
                src="https://www.freeiconspng.com/thumbs/snapchat-logo/snapchat-logo-png-free-download-3.png"
                alt=""
              />
              <h1>snappy</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handlechange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handlechange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handlechange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handlechange(e)}
            />
            <button type="submit">Create User</button>
            <span>
              Already have a account ? <Link to={"/login"}>Login</Link>
            </span>
          </form>
        </FormContainer>
      <ToastContainer/>
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
