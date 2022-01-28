import React, { useState, useEffect } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";

const Users = () => {
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

  // const initialState = users;
  const [users, setUsers] = useState();
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  // const users = api.users.fetchAll();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleDelete = (id) => {
    // setCount((prevState) => prevState - 1);
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const handleFavourite = (id) => {
    const newUsers = users.map((user) => {
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

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
      : users;

    // const [count, setCount] = useState(filteredUsers.length);
    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const renderTable = () => {
      if (count === 0) return "";
      return (
        <div className="d-flex flex-column">
          <h2>
            <SearchStatus length={count} />
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
      setSelectedProf();
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
  }
  return "Загрузка...";
};

export default Users;
