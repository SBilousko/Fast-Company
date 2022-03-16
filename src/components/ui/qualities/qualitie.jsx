import React from "react";
import PropTypes from "prop-types";

const Qualitie = (props) => {
  const badgeClasses = "badge m-2 bg-";
  return <span className={badgeClasses + props.color}>{props.name}</span>;
};

Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualitie;
