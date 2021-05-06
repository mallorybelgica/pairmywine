import React from "react";
import FoodInput from "./FoodInput";
import styled from "styled-components";

const WinePairTool = () => {
  return (
    <div>
      <Title>pair my wine</Title>
      <FoodInput />
    </div>
  );
};

export default WinePairTool;

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;
