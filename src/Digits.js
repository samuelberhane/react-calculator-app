import React from "react";

const Digits = ({ dispatch, digit }) => {
  return (
    <button onClick={() => dispatch({ type: "DISPLAY_INPUT", payload: digit })}>
      {digit}
    </button>
  );
};

export default Digits;
