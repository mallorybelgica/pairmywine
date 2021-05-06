import React from "react";
import FoodInput from "./FoodInput";
import styled from "styled-components";

const WinePairTool = () => {
  return (
    <Wrapper>
      <Title>pair my wine</Title>
      <FoodInput />
    </Wrapper>
  );
};

export default WinePairTool;

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
`;
