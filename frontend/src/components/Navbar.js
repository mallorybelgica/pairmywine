import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavArea>
      <StyledLink exact to="/">
        PAIRING
      </StyledLink>
      <StyledLink to="/grapes">GRAPES</StyledLink>
      <StyledLink to="/cellar">MY CELLAR</StyledLink>
    </NavArea>
  );
};

export default Navbar;

const NavArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  position: fixed;
  background-color: #1c1c1c;
  z-index: 10;
  height: 50px;
  padding: 0;
`;
const StyledLink = styled(NavLink)`
  font-family: "Mukta", sans-serif;
  color: #efdcd3;
  text-decoration: underline 2px;
  text-decoration-color: #78517b;
  padding: 10px;
`;
