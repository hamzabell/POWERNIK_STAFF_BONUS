import React, { useState } from "react";
import { Button } from "../components";
import { BiLockAlt } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { useTokenContext } from "../context";
import { useHistory } from "react-router-dom";

const INITIAL_LOGIN_STATE = {
  email: "",
  password: "",
};

const StyledInput = styled.input`
  width: 20rem;
  height: 2rem;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 640px) {
    width: 12rem;
    height: 2rem;
  }
`;

function LoginForm(props) {
  const [_, setToken] = useTokenContext();
  const history = useHistory();
  const [LoginForm, SetLoginForm] = useState(INITIAL_LOGIN_STATE);

  const handleChange = (e) => {
    SetLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/login-user", { ...LoginForm })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.token);
        window.localStorage.setItem("admin-token", res.data.token);
        toast.success(`🚀 ${res.data.message}`);
        history.push("/dashboard");
      })
      .catch((error) => {
        toast.error("🙅‍♀️ Incorrect Email/Password");
      });
  };
  return (
    <>
      <div className="flex flex-wrap flex-col bg-white shadow-lg p-4 md:p-5 rounded-lg mx-20 md:mx-0">
        <div className="flex flex-col items-center my-2">
          <h1 className="text-gray-700 text-2xl font-semibold">Welcome Back</h1>
          <h4 className="text-gray-400 text-md my-2 text-center">
            Enter your credentials to access your account
          </h4>
        </div>
        <form className="flex flex-col bg-white" onSubmit={handleSubmit}>
          <div className="m-4 ">
            <div className="flex   border border-gray-200 rounded-md p-2">
              <FiMail className="w-6 h-6  mt-1" color="#267FFF" />
              <StyledInput
                name="email"
                className="ml-5"
                type="text"
                value={LoginForm.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="flex   border border-gray-200 rounded-md p-2 my-6">
              <BiLockAlt className="w-6 h-6  mt-1" color="#267FFF" />
              <StyledInput
                name="password"
                className="ml-5"
                type="password"
                onChange={handleChange}
                value={LoginForm.password}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <Button buttonTitle="Login as Admin" buttonType="submit" />
        </form>
      </div>
    </>
  );
}

export default LoginForm;
