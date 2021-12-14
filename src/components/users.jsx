import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const users = api.users.fetchAll();
  let badgeClasses = "badge m-2 bg-";

  const renderTHead = () => {
    return (
      <>
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
      </>
    );
  };

  const renderQualities = (qualities) => {
    return qualities.map((quality) => {
      return (
        <span className={badgeClasses + quality.color} key={qualities._id}>
          {quality.name}
        </span>
      );
    });
  };

  const renderTD = (user) => {
    return (
      <>
        <td>{user.name}</td>
        <td>{user.profession.name}</td>
        <td>{renderQualities(user.qualities)}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(user._id)}
          >
            delete
          </button>
        </td>
      </>
    );
  };

  const renderTR = () => {
    return usersList.map((user) => {
      return <tr key={user._id}>{renderTD(user)}</tr>;
    });
  };

  const renderTBody = () => {
    return <tbody>{renderTR()}</tbody>;
  };

  const renderTable = () => {
    return [renderTHead(), renderTBody()];
  };

  const [count, setCount] = useState(users.length);
  const [usersList, setUsers] = useState(users);

  const formatCount = () => {
    let peopleCounter = "";
    const people = "с тобой сегодня";
    if ((count >= 5 && count <= 12) || count === 1) {
      peopleCounter = `${count} человек тусанет ${people}`;
    } else if (count >= 2 && count <= 4) {
      peopleCounter = `${count} человека тусанут ${people}`;
    } else if (count === 0) {
      peopleCounter = "Никто с тобой не тусанет";
    }
    return peopleCounter;
  };

  const handleDelete = (id) => {
    setCount((prevState) => prevState - 1);
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
    console.log(id);
  };

  const renderPeopleCounter = () => {
    return (
      <span
        className={
          count === 0 ? badgeClasses + "warning" : badgeClasses + "primary"
        }
      >
        {formatCount()}
      </span>
    );
  };

  return (
    <>
      <h2>{renderPeopleCounter()}</h2>
      <table className="table">{renderTable()}</table>
    </>
  );
};

export default Users;
