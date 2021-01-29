import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { ImExit } from "react-icons/im";
import NavItem from "./NavItem";
import { Button } from "../components";
import styled from "styled-components";
import WithReportsModal from "./WithReportsModal";

const StyledNavSideBar = styled.div`
  display: flex;

  @media screen and (max-width: 1400px) {
    display: none;
  }
`;
function NavSidebar(props) {
  return (
    <StyledNavSideBar className="flex-col items-center shadow-2xl h-screen py-20 w-full">
      <Button
        buttonTitle="Log Resumption Times"
        onClickFn={() => props.openModal("log")}
      />
      <ul className="mt-20">
        <NavItem
          path="/dashboard"
          pathName="Dashboard"
          Icon={AiFillDashboard}
          otherClassNames="border-b-0"
        />
        <NavItem
          path="/report"
          pathName="Reports"
          Icon={GoGraph}
          otherClassNames="border-b-0"
        />
        <NavItem path="/logout" pathName="Logout" Icon={ImExit} />
      </ul>
    </StyledNavSideBar>
  );
}

export default WithReportsModal(NavSidebar);
