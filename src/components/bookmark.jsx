import React from "react";
import PropTypes from "prop-types";

const Bookmark = (props) => {
  let btnClasses = "btn bi-heart";
  btnClasses += props.bookmark ? "-fill" : "";
  return (
    <button
      type="button"
      className={btnClasses}
      onClick={() => props.onFavourite(props.id)}
    ></button>
  );
};

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onFavourite: PropTypes.func.isRequired
};

export default Bookmark;
