import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import GrapesList from "./GrapeList/GrapesList";
import GrapeDetails from "./GrapeDetails";
import WinePairTool from "./WinePairTool/WinePairTool";
import Navbar from "./Navbar";
import Header from "./Header";
import WineCellar from "./WineCellar/WineCellar";
import WineDetails from "./WineCellar/WineDetails";
import Recommendation from "./Recommendation";
import UserAccount from "./User/UserAccount";
import NewWine from "./WineCellar/NewWine";
import EditWine from "./WineCellar/EditWine";
import EditUserAccount from "./User/EditUserAccount";
import SignUp from "./User/SignUp";
import Login from "./User/Login";
import Logout from "./User/Logout";
import DeletedAccount from "./User/DeletedAccount";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <WinePairTool />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/delete/user">
          <DeletedAccount />
        </Route>
        <Route path="/account">
          <UserAccount />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/user/edit">
          <EditUserAccount />
        </Route>
        <Route path="/grapes">
          <GrapesList />
        </Route>
        <Route path="/grape/:_id">
          <GrapeDetails />
        </Route>
        <Route path="/recommendation">
          <Recommendation />
        </Route>
        <Route path="/cellar">
          <WineCellar />
        </Route>
        <Route path="/add/wine">
          <NewWine />
        </Route>
        <Route path="/edit/wine/:_id">
          <EditWine />
        </Route>
        <Route path="/wine/:_id">
          <WineDetails />
        </Route>
      </Switch>
      <Navbar />
    </BrowserRouter>
  );
};

export default App;
