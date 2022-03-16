import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ bookmark, ...rest }) => {
  let btnClasses = "btn bi-heart";
  btnClasses += bookmark ? "-fill" : "";
  return <button type="button" className={btnClasses} {...rest}></button>;
};

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired
};

export default Bookmark;
