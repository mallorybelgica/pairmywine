import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WineCellarItem = ({ wine }) => {
  return (
    <Wrapper>
      <StyledLink to={`/wine/${wine._id}`}>
        <Details>
          <WineImage src={wine.image} alt="wine-bottle" />
          <WineName>{wine.name}</WineName>
          <WinePrice>${wine.price}</WinePrice>
        </Details>
      </StyledLink>
    </Wrapper>
  );
};

export default WineCellarItem;

const Wrapper = styled.div`
  padding: 16px;
  box-shadow: 3px 2.8px 2.2px rgba(0, 0, 0, 0.07),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.05), 3px 12.5px 10px rgba(0, 0, 0, 0.042),
    3px 22.3px 17.9px rgba(0, 0, 0, 0.035),
    3px 41.8px 33.4px rgba(0, 0, 0, 0.028), 3px 100px 80px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  text-align: center;
`;

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
