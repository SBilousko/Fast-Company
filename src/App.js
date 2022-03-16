import React from "react";
import UsersList from "./components/common/page/usersList";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layout/main";
import Login from "./layout/login";
import User from "./layout/user";
import EditUser from "./layout/editUser";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId/edit" component={EditUser} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users/" component={UsersList} />
      </Switch>
    </>
  );
};

export default App;
