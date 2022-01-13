import React from "react";
import PropTypes from "prop-types";

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

SearchStatus.propTypes = {
  count: PropTypes.number.isRequired,
  formatCount: PropTypes.func.isRequired
};

export default SearchStatus;
