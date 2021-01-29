import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

const ActiveDiv = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  background-color: #577bf9;
  color: #577bf9;
`;

const ActiveLi = styled.li`
  color: ${(props) => (props.active ? "#577bf9" : "#BFC9CA")};
`;
function NavItem({ path, pathName, Icon, isModal, otherClassNames }) {
  const location = useLocation();
  const history = useHistory();
  const NavPath = path.split("/")[1];
  const currentPath = location.pathname.split("/")[1];
  return (
    <ActiveLi
      className={`${otherClassNames} flex  space-x-3  w-64  cursor-pointer`}
      onClick={() => history.push(path)}
      active={NavPath === currentPath}
      isModal={isModal}
    >
      <ActiveDiv className="w-1" active={NavPath === currentPath}>
        I
      </ActiveDiv>
      <div className="flex space-x-3 py-6">
        <Icon
          className="h-6 w-6  text-gray-600"
          color={NavPath === currentPath ? "#577bf9" : "#BFC9CA"}
        />
        <NavLink
          className={
            NavPath === currentPath
              ? "text-blue-500  text-md"
              : "text-gray-700  text-md"
          }
          to={path}
        >
          {pathName}
        </NavLink>
      </div>
    </ActiveLi>
  );
}

export default NavItem;
