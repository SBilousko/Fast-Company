import React from "react";

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

export default Bookmark;
