import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
// import api from "../api";

const User = ({ user }) => {
  const history = useHistory();
  const handleAllUsers = () => {
    history.replace("/users");
  };
  // const user = api.users.getById(id).then((data) => {
  //   console.log("data", data.name);
  //   return data.name;
  // });

  // console.log("user", user);

  return (
    <>
      <h3>{`User ${user._id} Page`}</h3>
      <div>User Name: {user.name}</div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleAllUsers();
          }}
        >
          Все пользователи
        </button>
      </div>
    </>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
