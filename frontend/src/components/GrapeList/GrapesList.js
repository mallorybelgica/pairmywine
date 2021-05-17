import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveGrapes,
  receiveGrapesError,
  receiveGroupsError,
  receiveGroups,
} from "../../actions";
import styled from "styled-components";
import GrapeListItem from "./GrapeListItem";
import Loading from "../Loading";

const GrapesList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.grapesListReducer.status);
  const currentGrapes = useSelector((state) => ({
    ...state.grapesListReducer.currentGrapes,
  }));
  const currentGroups = useSelector((state) => ({
    ...state.groupsReducer.currentGroups,
  }));

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/grapes`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveGrapes(json.grapes));
      })
      .catch((error) => {
        dispatch(receiveGrapesError(error));
      });
    fetch(`${process.env.REACT_APP_API_URL}/wines/groups`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveGroups(json.data));
      })
      .catch((error) => {
        dispatch(receiveGroupsError(error));
      });
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div>
      <Title>Grape Variations</Title>
      <List>
        {currentGrapes &&
          currentGroups &&
          Object.entries(currentGrapes).map((grape) => {
            const wineGroup = Object.values(currentGroups).find(
              (group) => group._id === grape[1].groupId
            );
            return (
              <GrapeListItem
                key={grape[0]}
                grape={grape}
                wineGroup={wineGroup}
              />
            );
          })}
      </List>
    </div>
  );
};

export default GrapesList;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;
