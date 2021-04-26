import React from "react";
import styled from "styled-components";
import CurrentStarRating from "../CurrentStarRating";

const WinePoints = ({ wineDetails }) => {
  return (
    <div>
      <h1>about this wine</h1>
      <WineImage src={wineDetails.image} />
      <h3>name</h3>
      <p>{wineDetails.name}</p>
      <h3>producer</h3>
      <p>{wineDetails.producer}</p>
      <h3>region</h3>
      <p>{wineDetails.region}</p>
      <h3>year</h3>
      <p>{wineDetails.year}</p>
      <h3>grape</h3>
      <p>{wineDetails.grape}</p>
      <h3>price</h3>
      <p>${wineDetails.price}</p>
      <h3>rating</h3>
      <CurrentStarRating wineRating={wineDetails.rating} />
      <h3>notes</h3>
      <p>{wineDetails.notes}</p>
    </div>
  );
};

export default WinePoints;

const WineImage = styled.img`
  width: 100%;
  height: 35vh;
  object-fit: cover;
`;
