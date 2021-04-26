import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GrapeListItem = ({ grape, wineGroup }) => {
  return (
    <GrapeWrapper>
      <StyledLink id={grape[0]} to={`/grape/${grape[0]}`}>
        <GrapeName key={grape[1].name}>{grape[1].name}</GrapeName>
        <Group>{wineGroup.Group}</Group>
      </StyledLink>
    </GrapeWrapper>
  );
};

export default GrapeListItem;

const GrapeWrapper = styled.div`
  border-top: solid 1px black;
  padding-top: 15px;
  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0.25px;
  }
`;

const GrapeName = styled.li`
  font-family: "Mukta", sans-serif;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Group = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  margin-top: 0;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
