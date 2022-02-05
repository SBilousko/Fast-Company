import React from "react";
import Users from "./layout/users";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layout/main";
import Login from "./layout/login";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
      </Switch>
      {/* <Users /> */}
    </>
  );
};

export default App;
