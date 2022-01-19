import React from "react";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const User = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.profession.name}</td>
      <td>
        {props.qualities.map((qualitie) => (
          <Qualitie {...qualitie} key={qualitie._id} />
        ))}
      </td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate}</td>
      <td>
        <Bookmark
          id={props._id}
          bookmark={props.bookmark}
          onFavourite={props.onFavourite}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => props.onDelete(props._id)}
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
