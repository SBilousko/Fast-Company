import React, { useState } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = () => {
  const users = api.users.fetchAll();

  const formatCount = () => {
    let peopleCounter = "";
    const today = "с тобой сегодня";
    if ((count >= 5 && count <= 12) || count === 1) {
      peopleCounter = `${count} человек тусанет ${today}`;
    } else if (count >= 2 && count <= 4) {
      peopleCounter = `${count} человека тусанут ${today}`;
    } else if (count === 0) {
      peopleCounter = "Никто с тобой не тусанет";
    }
    return peopleCounter;
  };

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
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
      </>
    );
  };

  const initialState = users;
  const [count, setCount] = useState(users.length);
  const [usersList, setUsers] = useState(initialState);
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    setCount((prevState) => prevState - 1);
    const newUsers = usersList.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const handleFavourite = (id) => {
    console.log("Favourite ", id);
    const newUsers = usersList.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(newUsers);
  };

  const handlePageChange = (pageIndex) => {
    console.log("page:", pageIndex);
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(usersList, currentPage, pageSize);

  const renderTable = () => {
    if (count === 0) return "";
    return (
      <>
        <table className="table">
          {renderTHead()}
          <tbody>
            {userCrop.map((user) => (
              <User
                {...user}
                key={user._id}
                onDelete={handleDelete}
                onFavourite={handleFavourite}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <>
      <h2>
        <SearchStatus formatCount={formatCount} count={count} />
      </h2>
      {renderTable()}
    </>
  );
};

export default Users;
