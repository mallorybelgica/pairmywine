import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import FoodInputOptions from "./FoodInputOptions";
import { receiveWinePairing, receiveWinePairingError } from "../../actions";
import Loading from "../Loading";

const FoodInput = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [foods, setFoods] = useState();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [thirdOption, setThirdOption] = useState("");
  const [fourthOption, setFourthOption] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/foods`)
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
    fetch(`${process.env.REACT_APP_API_URL}/recommendation`, {
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

  if (foods.length < 1) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="food">Select up to 3 main ingredients:</Label>
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
        <Label htmlFor="preparation">Any special preparations?</Label>
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
        <ButtonWrapper>
          <Button>Pair my wine!</Button>
        </ButtonWrapper>
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
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const Label = styled.label`
  width: 100%;
  text-align: center;
`;

const Select = styled.select`
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
  width: 100%;
  text-align: center;
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
