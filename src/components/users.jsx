import React, { useState, useEffect } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";

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
            <th scope="col">Профессия</th>
            <th scope="col">Качества</th>
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
  const [usersList, setUsers] = useState(initialState);
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setselectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleDelete = (id) => {
    // setCount((prevState) => prevState - 1);
    const newUsers = usersList.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const handleFavourite = (id) => {
    const newUsers = usersList.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(newUsers);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const filteredUsers = selectedProf
    ? usersList.filter((user) => user.profession === selectedProf)
    : usersList;

  // const [count, setCount] = useState(filteredUsers.length);
  const count = filteredUsers.length;

  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const handleProfessionSelect = (item) => {
    setselectedProf(item);
  };

  const renderTable = () => {
    if (count === 0) return "";
    return (
      <div className="d-flex flex-column">
        <h2>
          <SearchStatus formatCount={formatCount} length={count} />
        </h2>
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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    );
  };

  const clearFilter = () => {
    setselectedProf();
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      {renderTable()}
    </div>
  );
};

export default Users;
