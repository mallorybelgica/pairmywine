import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GrapeDetails = () => {
  const { _id } = useParams();
  const [grapeDetails, setGrapeDetails] = useState("");

  useEffect(() => {
    fetch(`/grape/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        setGrapeDetails(json.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    grapeDetails && (
      <div>
        <Heading>About {grapeDetails.name}</Heading>
        <p>{grapeDetails.description}</p>
        <h2>primary notes</h2>
        <List>
          {grapeDetails.flavors &&
            Object.values(grapeDetails.flavors).map((flavor) => (
              <ListItem key={flavor}>{flavor}</ListItem>
            ))}
        </List>
        <h2>notable regions</h2>
        <List>
          {grapeDetails.regions &&
            Object.values(grapeDetails.regions).map((region) => (
              <ListItem key={region}>{region}</ListItem>
            ))}
        </List>
        <h2>taste profile</h2>
        <p>Sweetness: {grapeDetails.sweetness}</p>
        <p>Body: {grapeDetails.body}</p>
        <p>Tannins: {grapeDetails.tannins}</p>
        <p>Acidity: {grapeDetails.acidity}</p>
        <p>Alcohol: {grapeDetails.alcohol}</p>
      </div>
    )
  );
};

export default GrapeDetails;

const Heading = styled.h1`
  text-transform: uppercase;
`;

const List = styled.ul`
  font-family: "Montserrat", sans-serif;
`;

const ListItem = styled.li``;
