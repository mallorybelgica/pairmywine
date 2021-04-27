import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveCellarDetails, receiveCellarDetailsError } from "../../actions";
import WineCellarItem from "./WineCellarItem";
import Loading from "../Loading";

const WineCellar = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => ({
    ...state.userInfoReducer.userDetails,
  }));
  const loggedIn = useSelector((state) => state.userInfoReducer.loggedIn);
  const status = useSelector((state) => state.wineCellarReducer.status);
  const cellarDetails = useSelector((state) => ({
    ...state.wineCellarReducer.cellarDetails,
  }));

  useEffect(() => {
    fetch(`/cellar/${userDetails.email}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveCellarDetails(json.data));
      })
      .catch((error) => {
        dispatch(receiveCellarDetailsError(error));
      });
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Wrapper>
      <h1>my cellar</h1>
      {loggedIn === false && (
        <Notice>Please login or sign up to get access to your cellar.</Notice>
      )}
      {loggedIn === true && <NewWine to="/add/wine">+</NewWine>}
      {userDetails &&
        cellarDetails &&
        Object.values(cellarDetails).map((wine) => {
          return <WineCellarItem key={wine._id} wine={wine} />;
        })}
    </Wrapper>
  );
};

export default WineCellar;

const Wrapper = styled.div`
  width: 100%;
`;

const Notice = styled.div`
  font-family: "Montserrat", sans-serif;
`;

const NewWine = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 60px;
  margin-right: 10px;
  color: #ee6233;
  font-size: 2.5rem;
  font-weight: bold;
  text-decoration: none;
`;
