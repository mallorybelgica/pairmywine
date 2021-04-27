import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import StarRating from "../StarRating";

const NewWine = () => {
  const history = useHistory();
  const userDetails = useSelector((state) => ({
    ...state.userInfoReducer.userDetails,
  }));
  const rating = useSelector((state) => state.starRatingReducer.rating);
  const email = userDetails.email;
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [producer, setProducer] = useState("");
  const [region, setRegion] = useState("");
  const [year, setYear] = useState("");
  const [grape, setGrape] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (ev) => {
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
    data.append("rating", rating);
    data.append("notes", notes);
    fetch("/cellar/wine", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((json) => history.push("/cellar"))
      .catch((err) => console.log(err));
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <h1>add a wine</h1>
      <label>upload an image:</label>
      <Input
        type="file"
        onChange={(ev) => {
          setFile(ev.target.files[0]);
        }}
      />
      <label>name</label>
      <Input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.currentTarget.value)}
      />
      <label>producer</label>
      <Input
        type="text"
        value={producer}
        onChange={(ev) => setProducer(ev.currentTarget.value)}
      />
      <label>region</label>
      <Input
        type="text"
        value={region}
        onChange={(ev) => setRegion(ev.currentTarget.value)}
      />
      <label>year</label>
      <Input
        type="number"
        value={year}
        onChange={(ev) => setYear(ev.currentTarget.value)}
      />
      <label>grape</label>
      <Input
        type="text"
        value={grape}
        onChange={(ev) => setGrape(ev.currentTarget.value)}
      />
      <label>price</label>
      <Input
        type="number"
        value={price}
        onChange={(ev) => setPrice(ev.currentTarget.value)}
      />
      <label>rating</label>
      <StarRating />
      <Input type="hidden" value={rating} />
      <label>notes</label>
      <TextArea
        type="text"
        value={notes}
        onChange={(ev) => setNotes(ev.currentTarget.value)}
      />
      <Button>Submit</Button>
    </form>
  );
};

export default NewWine;

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
