import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { receiveUserInfo } from "../../actions";

const EditUserAccount = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => ({
    ...state.userInfoReducer.userDetails,
  }));
  const currentBirthdate = new Date(userDetails.birthDate)
    .toISOString()
    .substring(0, 10);
  const [firstName, setFirstName] = useState(userDetails.firstName);
  const [lastName, setLastName] = useState(userDetails.lastName);
  const [birthDate, setBirthDate] = useState(currentBirthdate.toString());
  const [email, setEmail] = useState(userDetails.email);
  const [password, setPassword] = useState("");
  const currentEmail = userDetails.email;

  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          fetch("/user/edit", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentEmail,
              firstName,
              lastName,
              birthDate,
              email,
              password,
            }),
          })
            .then((res) => res.json())
            .then((json) => {
              console.log(json.data);
              dispatch(receiveUserInfo(json.data));
              history.push("/account");
            })
            .catch((err) => console.log(err));
        }}
      >
        <h1>Edit Profile</h1>
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
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default EditUserAccount;

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

const Button = styled.button`
  text-transform: uppercase;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background-color: #55beab;
  border: none;
  padding: 10px 40px;
`;
