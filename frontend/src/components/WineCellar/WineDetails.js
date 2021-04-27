import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { receiveWineDetails, receiveWineDetailsError } from "../../actions";
import styled from "styled-components";
import WinePoints from "./WinePoints";
import Loading from "../Loading";

const WineDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { _id } = useParams();
  const status = useSelector((state) => state.wineDetailsReducer.status);
  const wineDetails = useSelector((state) => ({
    ...state.wineDetailsReducer.wineDetails,
  }));

  useEffect(() => {
    fetch(`/cellar/wine/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveWineDetails(json.data));
      })
      .catch((error) => {
        dispatch(receiveWineDetailsError(error));
      });
  }, [_id]);

  const deleteWine = (ev) => {
    ev.preventDefault();
    fetch(`/cellar/wine/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => history.push("/cellar"))
      .catch((err) => console.log(err));
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div>
      <WinePoints wineDetails={wineDetails} />
      <ButtonsWrapper>
        <Button onClick={deleteWine}>delete wine</Button>
        <Link to={`/edit/wine/${_id}`}>
          <Button>edit wine</Button>
        </Link>
      </ButtonsWrapper>
    </div>
  );
};
export default WineDetails;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  background-color: #ee6233;
  color: #fff;
  width: 100px;
  height: 25px;
  margin: 10px;
`;
