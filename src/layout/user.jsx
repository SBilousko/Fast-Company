import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../api";
import Qualities from "../components/ui/qualities";

const User = ({ match }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(match.params.userId).then((data) => setUser(data));
  }, []);
  // const history = useHistory();
  // const handleEditUser = () => {
  //   history.replace("/users");
  // };

  return (
    <>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h3>Профессия: {user.profession.name}</h3>
          <Qualities qualities={user.qualities} />
          <p>Количество встреч: {user.completedMeetings}</p>
          <h3>Рейтинг: {user.rate}</h3>
          <div>
            <Link
              className="btn btn-primary"
              to={`/users/${match.params.userId}/edit`}
            >
              Редактировать
            </Link>
            {/* <button
              className="btn btn-primary"
              onClick={() => {
                handleEditUser();
              }}
            >
              Редактировать
            </button> */}
          </div>
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </>
  );
};

User.propTypes = {
  match: PropTypes.object.isRequired
};

export default User;
