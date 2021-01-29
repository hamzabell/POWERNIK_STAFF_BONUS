import React from "react";
import NavSidebar from "./NavSidebar";
import styled from "styled-components";

const StyledNavSideBar = styled.div`
  display: flex;

  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-row-gap: 0px;

  @media screen and (max-width: 1400px) {
    grid-template-columns: 1fr;
    grid-row-gap: 0px;
  }
`;
const WithSideNavigation = (Component) => {
  class WithSideNavigation extends React.Component {
    render() {
      return (
        <>
          <MainDiv className="">
            <StyledNavSideBar className="hidden md:block">
              <NavSidebar />
            </StyledNavSideBar>
            <div className="">
              <Component {...this.props} />
            </div>
          </MainDiv>
        </>
      );
    }
  }

  return WithSideNavigation;
};

export default WithSideNavigation;
