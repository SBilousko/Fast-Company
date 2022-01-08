import React from "react";

const Bookmark = (props) => {
  let btnClasses = "btn bi-heart";
  btnClasses += props.bookmark ? "-fill" : "";
  console.log(props.bookmark, btnClasses);
  return (
    <button
      type="button"
      className={btnClasses}
      onClick={() => props.onFavourite(props.id)}
    ></button>
  );
};

export default Bookmark;
