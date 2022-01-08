import React from "react";

const Qualitie = (props) => {
  const badgeClasses = "badge m-2 bg-";
  return <span className={badgeClasses + props.color}>{props.name}</span>;
};

export default Qualitie;
