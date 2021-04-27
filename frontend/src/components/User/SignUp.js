import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        birthDate,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => history.push("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>sign up</h1>
      <Label>First Name</Label>
      <Input
        type="text"
        value={firstName}
        onChange={(ev) => setFirstName(ev.currentTarget.value)}
      />
      <Label>Last Name</Label>
      <Input
        type="text"
        value={lastName}
        onChange={(ev) => setLastName(ev.currentTarget.value)}
      />
      <Label>Date of Birth</Label>
      <Input
        type="date"
        value={birthDate}
        onChange={(ev) => setBirthDate(ev.currentTarget.value)}
      />
      <Label>Email</Label>
      <Input
        type="email"
        value={email}
        onChange={(ev) => setEmail(ev.currentTarget.value)}
      />
      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(ev) => setPassword(ev.currentTarget.value)}
      />
      <ButtonWrapper>
        <Button>Submit</Button>
      </ButtonWrapper>
    </form>
  );
};

export default SignUp;

const Input = styled.input`
  box-sizing: border-box;
  outline: none;
  width: 100%;
  border: 1px solid #ccc;
  padding: 2%;
  margin-bottom: 10px;
`;

const Label = styled.label`
  width: 100vw;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
