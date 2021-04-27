import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Loading from "./Loading";
import { receiveGroups, receiveGroupsError } from "../actions";

const Recommendation = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.winePairingReducer.status);
  const recommendedWines = useSelector((state) => ({
    ...state.winePairingReducer.recommendedWines,
  }));
  const currentGroups = useSelector((state) => ({
    ...state.groupsReducer.currentGroups,
  }));
  const singleGrapes = recommendedWines.wines;
  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetch("/recommendation/grapes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        singleGrapes,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setWines(json.data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("/wines/groups")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveGroups(json.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(receiveGroupsError(error));
      });
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <p>Check out your recommendation(s) below:</p>
      <List>
        {wines &&
          singleGrapes &&
          currentGroups &&
          recommendedWines &&
          wines.map((wine) => {
            const wineGroup = Object.values(currentGroups).find(
              (group) => group._id === wine.groupId
            );
            return (
              wineGroup && (
                <GrapeWrapper key={wine._id}>
                  <StyledLink to={`/grape/${wine._id}`}>
                    <GrapeName>{wine.name}</GrapeName>
                    <Group>{wineGroup.Group}</Group>
                  </StyledLink>
                </GrapeWrapper>
              )
            );
          })}
      </List>
    </div>
  );
};

export default Recommendation;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

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
