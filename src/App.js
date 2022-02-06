import React from "react";
import Users from "./components/users";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layout/main";
import Login from "./layout/login";
import User from "./layout/user";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users/" component={Users} />
      </Switch>
      {/* <Users /> */}
    </>
  );
};

export default App;
