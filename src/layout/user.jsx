import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "../components/qualitiesList";

const User = ({ match }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(match.params.userId).then((data) => setUser(data));
  }, []);
  const history = useHistory();
  const handleAllUsers = () => {
    history.replace("/users");
  };

  console.log("match", match);
  console.log("match.params.userId", match.params.userId);
  console.log("user", user);

  return (
    <>
      {user
        ? (<>
          <h1>{user.name}</h1>
          <h3>Профессия: {user.profession.name}</h3>
          <QualitiesList qualities={user.qualities} />
          <p>Количество встреч: {user.completedMeetings}</p>
          <h3>Рейтинг: {user.rate}</h3>
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
        </>)
        : (<div>Загрузка...</div>)}
    </>
  );
};

User.propTypes = {
  match: PropTypes.object.isRequired
};

export default User;
