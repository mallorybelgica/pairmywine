import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { receiveUserInfo, userLoginError } from "../../actions";
import styled from "styled-components";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveUserInfo(json.data));
        if (json.status === 200) {
          history.push("/cellar");
        } else if (json.status === 401) {
          setMessage("Email or password does not match our credentials.");
        }
      })
      .catch((error) => {
        dispatch(userLoginError(error));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>login</h1>
      <p>Please login to get access to your cellar.</p>
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
        <Button>Sign In</Button>
      </ButtonWrapper>
      <Message>{message}</Message>
    </form>
  );
};

export default Login;

const Message = styled.p`
  color: red;
`;

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
