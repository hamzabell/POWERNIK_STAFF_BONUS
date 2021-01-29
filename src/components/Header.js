import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiFillDashboard } from "react-icons/ai";
import NavItem from "./NavItem";

import ModalWrapper from "./ModalWrapper";
import { useModal } from "../hooks";
import { GoGraph } from "react-icons/go";
import { ImExit } from "react-icons/im";
import styled from "styled-components";
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const StyledNavIcon = styled.div`
  display: none;

  @media screen and (max-width: 1400px) {
    display: block;
  }
`;

const StyledDate = styled.div`
  display: block;

  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

function Header(props) {
  const { isModalOpen, openModal, closeModal } = useModal(false);

  const getCurrentDate = () => {
    const d = new Date();
    return `${DAYS[d.getDay() - 1]},${d.getDate()} ${
      MONTHS[d.getMonth()]
    } ${d.getUTCFullYear()}`;
  };

  return (
    <>
      <div className="p-4 flex justify-between bg-white shadow-b-lg mb-4 fixed md:relative w-full">
        <div>
          <StyledNavIcon
            className="md:hidden cursor-pointer"
            onClick={openModal}
          >
            <HiOutlineMenuAlt2 className="w-6 h-6" />
          </StyledNavIcon>
          <StyledDate className="hidden md:block text-gray-600 text-lg font-semibold tracking-wide">
            {getCurrentDate()}
          </StyledDate>
        </div>
        <div className="text-gray-600 cursor-pointer ">
          <Link className="hover:text-red-400" to="/logout">
            Sign Out
          </Link>
        </div>
      </div>
      <ModalWrapper
        title=""
        onRequestClosefn={closeModal}
        modalOpenState={isModalOpen}
        closeModal={closeModal}
      >
        <div className="flex justify-center">
          <div className="flex flex-col   w-full items-center space-y-4">
            <ul className="mt-5">
              <div onClick={closeModal}>
                <NavItem
                  path="/dashboard"
                  pathName="Dashboard"
                  Icon={AiFillDashboard}
                  isModal
                  otherClassNames=""
                />
              </div>
              <div onClick={closeModal}>
                <NavItem
                  path="/report"
                  pathName="Reports"
                  Icon={GoGraph}
                  otherClassNames=""
                  isModal
                />
              </div>
              <div onClick={closeModal}>
                <NavItem path="/logout" pathName="Logout" Icon={ImExit} />
              </div>
            </ul>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export default Header;
