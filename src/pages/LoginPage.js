import React from "react";
import { LoginForm } from "../components";
import styled from "styled-components";
import { AiFillLock } from "react-icons/ai";

const StyledDiv = styled.div`
  background: #f2f6ff;
`;

const StyledTitle = styled.div`
  font-family: "Dancing Script", cursive;
`;

function LoginPage(props) {
  return (
    <StyledDiv className="w-full h-screen flex flex-col justify-center items-center">
      <StyledTitle className="flex my-6 font-extrabold text-2xl md:text-3xl text-gray-500 border border-gray-500 p-4 rounded-full">
        <AiFillLock className="" />
      </StyledTitle>
      <LoginForm />
    </StyledDiv>
  );
}

export default LoginPage;
