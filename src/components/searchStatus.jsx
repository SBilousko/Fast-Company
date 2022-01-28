import React from "react";
import PropTypes from "prop-types";

const SearchStatus = (props) => {
  const { count } = props;
  const badgeClasses = "badge m-2 bg-";

  const formatCount = (count) => {
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

  return (
    <span
      className={
        count === 0 ? badgeClasses + "warning" : badgeClasses + "primary"
      }
    >
      {formatCount()}
    </span>
  );
};

SearchStatus.propTypes = {
  count: PropTypes.number.isRequired
};

export default SearchStatus;
