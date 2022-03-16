import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserLink = ({ id, linkLabel }) => {
  return <Link key={id} to={`/users/${id}`}>
    {linkLabel}
  </Link>;
};

UserLink.propTypes = {
  id: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired
};

export default UserLink;
