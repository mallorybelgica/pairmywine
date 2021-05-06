import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogout } from "../actions";

const Header = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userInfoReducer.loggedIn);

  return (
    <HeaderArea>
      <Logo to="/">Y</Logo>
      {loggedIn === false && (
        <Menu>
          <StyledLink to="/login">LOGIN</StyledLink>
          <StyledLink to="/signup">SIGN UP</StyledLink>
        </Menu>
      )}
      {loggedIn === true && (
        <Menu>
          <StyledLink to="/logout" onClick={() => dispatch(userLogout())}>
            LOGOUT
          </StyledLink>
          <StyledLink to="/account">MY ACCOUNT</StyledLink>
        </Menu>
      )}
    </HeaderArea>
  );
};

export default Header;

const HeaderArea = styled.div`
  display: flex;
  top: 0;
  left: 0;
  background-color: #78517b;
  width: 100%;
  position: fixed;
  z-index: 10;
  height: 50px;
  padding: 5px;
`;

const StyledLink = styled(NavLink)`
  font-family: "Mukta", sans-serif;
  color: #efdcd3;
  text-decoration: underline 2px;
  text-decoration-color: #55beab;
  padding: 10px;
`;

const Menu = styled.div`
  display: flex;
  width: 100%;
  align-self: center;
  justify-content: center;
`;

const Logo = styled(Link)`
  font-family: "Lato", sans-serif;
  text-decoration: none;
  align-self: center;
  text-align: center;
  font-weight: bold;
  color: #fff;
  font-size: 36px;
  display: block;
  height: 40px;
  width: 40px;
  background-color: #ee6233;
`;
