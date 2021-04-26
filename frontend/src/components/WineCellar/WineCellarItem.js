import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WineCellarItem = ({ wine }) => {
  return (
    <StyledLink to={`/wine/${wine._id}`}>
      <Details>
        <WineImage src={wine.image} alt="wine-bottle" />
        <WineName>{wine.name}</WineName>
        <WinePrice>${wine.price}</WinePrice>
      </Details>
    </StyledLink>
  );
};

export default WineCellarItem;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const WineImage = styled.img`
  width: 100vw;
  overflow: hidden;
  height: 35vh;
  object-fit: cover;
  margin-bottom: 5px;
`;

const WineName = styled.span`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  width: 80%;
`;

const WinePrice = styled.span`
  display: flex;
  justify-content: flex-end;
  font-style: italic;
  width: 20%;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 15px;
`;
