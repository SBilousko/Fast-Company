import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty }) => {
  console.log(items);
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li key={items[item][valueProperty]} className="list-group-item">
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  valueProperty: PropTypes.object.isRequired,
  contentProperty: PropTypes.object.isRequired
};

export default GroupList;
