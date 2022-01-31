import React from "react";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onFavourite
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qualitie) => (
          <Qualitie {...qualitie} key={qualitie._id} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <Bookmark
          id={_id}
          bookmark={bookmark}
          onClick={() => onFavourite(_id)}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  qualities: PropTypes.array.isRequired,
  rate: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onFavourite: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default User;
