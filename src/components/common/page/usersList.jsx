import React, { useState, useEffect } from "react";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../groupList";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../form/textField";

const UsersList = () => {
  const [users, setUsers] = useState();
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  // const [searchString, setSearchString] = useState();
  const [findedUsers, setFindedUsers] = useState();

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

  const clearFilter = () => {
    setSelectedProf();
  };

  const clearSearchString = () => {
    const searchField = document.querySelector("#search");
    searchField.value = "";
  };

  const handleDelete = (id) => {
    // setCount((prevState) => prevState - 1);
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const handleFavourite = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
        // return { ...user, bookmark: !user.bookmark };
        return user;
      }
      return user;
    });
    setUsers(newUsers);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setFindedUsers();
    clearSearchString();
    setSelectedProf(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
      : users;

    const handleChange = ({ target }) => {
      clearFilter();
      // setSearchString(target.value);
      const searchString = target.value;
      const searchResult = users.filter(
        (user) => user.name.toLowerCase().indexOf(searchString) + 1
      );
      setFindedUsers(searchResult);
    };

    // const [count, setCount] = useState(filteredUsers.length);
    const sortedUsers = findedUsers || _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const count = sortedUsers.length;

    const renderTable = () => {
      // if (count === 0) return "";
      return (
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <TextField placeholder="Search..." onChange={handleChange} name="search" />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onDelete={handleDelete}
              onFavourite={handleFavourite}
              onSort={handleSort}
              selectedSort={sortBy}
            />
          )}
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

export default UsersList;
