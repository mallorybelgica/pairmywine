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
    fetch(`${process.env.REACT_APP_API_URL}/cellar/wine`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((json) => history.push("/cellar"))
      .catch((err) => console.log(err));
  };

  return (
    <Form encType="multipart/form-data" onSubmit={handleSubmit}>
      <Title>add a wine</Title>
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
      <StarRating />
      <Input type="hidden" value={rating} />
      <Label>notes</Label>
      <TextArea
        type="text"
        value={notes}
        onChange={(ev) => setNotes(ev.currentTarget.value)}
      />
      <ButtonWrapper>
        <Button>Submit</Button>
      </ButtonWrapper>
    </Form>
  );
};

export default NewWine;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;

const Label = styled.label`
  width: 75%;
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  outline: none;
  width: 75%;
  border: 1px solid #ccc;
  padding: 2%;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
`;

const TextArea = styled.input`
  box-sizing: border-box;
  outline: none;
  width: 75%;
  border: 1px solid #ccc;
  padding: 2%;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  width: 100%;
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
