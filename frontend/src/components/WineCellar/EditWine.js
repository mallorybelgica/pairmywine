import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../StarRating";

const EditWine = () => {
  const history = useHistory();
  const userDetails = useSelector((state) => ({
    ...state.userInfoReducer.userDetails,
  }));
  const wineDetails = useSelector((state) => ({
    ...state.wineDetailsReducer.wineDetails,
  }));
  const rating = wineDetails.rating;
  const newRating = useSelector((state) => state.starRatingReducer.rating);
  const { _id } = useParams();
  const email = userDetails.email;
  const [file, setFile] = useState("");
  const [name, setName] = useState(wineDetails.name);
  const [producer, setProducer] = useState(wineDetails.producer);
  const [region, setRegion] = useState(wineDetails.region);
  const [year, setYear] = useState(wineDetails.year);
  const [grape, setGrape] = useState(wineDetails.grape);
  const [price, setPrice] = useState(wineDetails.price);
  const [notes, setNotes] = useState(wineDetails.notes);

  return (
    <div>
      <form
        enctype="multipart/form-data"
        onSubmit={(ev) => {
          ev.preventDefault();
          const data = new FormData(ev.target);
          data.append("email", email);
          data.append("file", file);
          data.append("name", name);
          data.append("producer", producer);
          data.append("region", region);
          data.append("year", year);
          data.append("grape", grape);
          data.append("price", price);
          data.append("rating", newRating);
          data.append("notes", notes);
          fetch(`/cellar/wine/${_id}`, {
            method: "PUT",
            body: data,
          })
            .then((res) => res.text())
            .then((text) => {
              console.log(text);
              history.push(`/wine/${_id}`);
            })
            .catch((err) => console.log(err));
        }}
      >
        <h1>add a wine</h1>
        <Label>upload an image:</Label>
        <Input
          type="file"
          onChange={(ev) => {
            setFile(ev.target.files[0]);
          }}
        />
        <Label>name</Label>
        <Input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.currentTarget.value)}
        />
        <Label>producer</Label>
        <Input
          type="text"
          value={producer}
          onChange={(ev) => setProducer(ev.currentTarget.value)}
        />
        <Label>region</Label>
        <Input
          type="text"
          value={region}
          onChange={(ev) => setRegion(ev.currentTarget.value)}
        />
        <Label>year</Label>
        <Input
          type="number"
          value={year}
          onChange={(ev) => setYear(ev.currentTarget.value)}
        />
        <Label>grape</Label>
        <Input
          type="text"
          value={grape}
          onChange={(ev) => setGrape(ev.currentTarget.value)}
        />
        <Label>price</Label>
        <Input
          type="number"
          value={price}
          onChange={(ev) => setPrice(ev.currentTarget.value)}
        />
        <Label>rating</Label>
        <StarRating value={wineDetails.rating} />
        <Input type="hidden" value={rating} />
        <Label>notes</Label>
        <TextArea
          type="text"
          value={notes}
          onChange={(ev) => setNotes(ev.currentTarget.value)}
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default EditWine;

const Label = styled.label`
  width: 100vw;
`;

const Input = styled.input`
  box-sizing: border-box;
  outline: none;
  width: 100%;
  border: 1px solid #ccc;
  padding: 2%;
  margin-bottom: 10px;
`;

const TextArea = styled.input`
  box-sizing: border-box;
  outline: none;
  width: 100%;
  border: 1px solid #ccc;
  padding: 2%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  text-transform: uppercase;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background-color: #55beab;
  border: none;
  padding: 10px 40px;
`;
