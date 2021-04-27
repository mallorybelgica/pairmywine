import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import FoodInputOptions from "./FoodInputOptions";
import { receiveWinePairing, receiveWinePairingError } from "../../actions";

const FoodInput = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [foods, setFoods] = useState();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [thirdOption, setThirdOption] = useState("");
  const [fourthOption, setFourthOption] = useState("");

  useEffect(() => {
    fetch("/foods")
      .then((res) => res.json())
      .then((json) => {
        setFoods(json.foods);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/recommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstOption,
        secondOption,
        thirdOption,
        fourthOption,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveWinePairing(json.data));
        history.push("/recommendation");
      })
      .catch((error) => {
        dispatch(receiveWinePairingError(error));
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="food">Select up to 3 main ingredients:</label>
        <Select
          name="firstOption"
          onChange={(ev) => setFirstOption(ev.target.value)}
        >
          <option>Select ingredient:</option>
          {foods && <FoodInputOptions foods={foods} />}
        </Select>
        <Select
          name="secondOption"
          onChange={(ev) => setSecondOption(ev.target.value)}
        >
          <option>Select ingredient:</option>
          {foods && <FoodInputOptions foods={foods} />}
        </Select>
        <Select
          name="thirdOption"
          onChange={(ev) => setThirdOption(ev.target.value)}
        >
          <option>Select ingredient:</option>
          {foods && <FoodInputOptions foods={foods} />}
        </Select>
        <label htmlFor="preparation">Any special preparations?</label>
        <Select
          name="fourthOption"
          onChange={(ev) => setFourthOption(ev.target.value)}
        >
          <option>Select preparation:</option>
          {foods &&
            Object.entries(foods)
              .filter((food) => food[1].family === "Preparation")
              .map((food) => {
                return (
                  <option key={food[0]} value={food[0]} id={food[0]}>
                    {food[1].type}
                  </option>
                );
              })}
        </Select>
        <Button>Pair my wine!</Button>
      </Form>
    </Wrapper>
  );
};

export default FoodInput;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Select = styled.select`
  box-sizing: border-box;
  outline: none;
  width: 75%;
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
