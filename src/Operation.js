import React from "react";

const Operation = ({ dispatch, operation }) => {
  return (
    <button onClick={() => dispatch({ type: "OPERATION", payload: operation })}>
      {operation}
    </button>
  );
};

export default Operation;
