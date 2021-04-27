import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userLogout } from "../../actions";
import styled from "styled-components";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => ({
    ...state.userInfoReducer.userDetails,
  }));
  const loggedIn = useSelector((state) => state.userInfoReducer.loggedIn);

  const deleteUser = (ev) => {
    ev.preventDefault();
    fetch(`/user/${userDetails.email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(userLogout());
        history.push("/delete/user");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>My Account</h1>
      {loggedIn === false && (
        <p>Please login or sign up to get access to your account.</p>
      )}
      {userDetails && loggedIn && (
        <div>
          <h3>first name</h3>
          <p>{userDetails.firstName}</p>
          <h3>last name</h3>
          <p>{userDetails.lastName}</p>
          <h3>email</h3>
          <p>{userDetails.email}</p>
          <h3>password</h3>
          <p>**********</p>
          <ButtonsWrapper>
            <Button onClick={deleteUser}>delete profile</Button>
            <Link to={"/user/edit"}>
              <Button>edit profile</Button>
            </Link>
          </ButtonsWrapper>
        </div>
      )}
    </>
  );
};

export default AccountInfo;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  background-color: #ee6233;
  color: #fff;
  width: 100px;
  height: 25px;
  margin: 10px;
`;
