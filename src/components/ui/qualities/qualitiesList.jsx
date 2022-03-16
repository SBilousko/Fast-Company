import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qualitie) => (
        <Qualitie {...qualitie} key={qualitie._id} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
