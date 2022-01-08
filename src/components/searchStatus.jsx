import React from "react";

const SearchStatus = (props) => {
  const { count } = props;
  const badgeClasses = "badge m-2 bg-";

  return (
    <span
      className={
        count === 0 ? badgeClasses + "warning" : badgeClasses + "primary"
      }
    >
      {props.formatCount()}
    </span>
  );
};

export default SearchStatus;
