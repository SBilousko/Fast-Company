import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          (<TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data }} />)
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  children: PropTypes.array,
  columns: PropTypes.object,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object
};

export default Table;
