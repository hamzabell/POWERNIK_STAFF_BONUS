import React from "react";
import { StyledWrapper } from "../styled";
import Header from "./Header";

function ComponentWrapper({ children }) {
  return (
    <StyledWrapper className="h-screen">
      <Header />
      <div className="p-5">{children}</div>
    </StyledWrapper>
  );
}

export default ComponentWrapper;
