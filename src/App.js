import { useReducer } from "react";

import Digits from "./Digits";
import Operation from "./Operation";

const reducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_INPUT":
      if (state.reset === true)
        return { ...state, currentContent: action.payload, reset: false };
      if (action.payload === "." && state.currentContent.includes("."))
        return state;
      if (action.payload === "0" && state.currentContent === "0") return state;
      return {
        ...state,
        currentContent: state.currentContent + action.payload,
      };
    case "CLEAR":
      return { ...state, prevContent: "", currentContent: "", operation: "" };
    case "OPERATION":
      if (state.currentContent === "" && state.prevContent === "") return state;
      if (state.prevContent === "") {
        return {
          ...state,
          currentContent: "",
          prevContent: state.currentContent,
          operation: action.payload,
        };
      }
      if (state.currentContent === "") {
        return { ...state, operation: action.payload };
      }
      return {
        ...state,
        prevContent: evaluate(
          state.prevContent,
          state.currentContent,
          state.operation
        ),
        currentContent: "",
        operation: action.payload,
      };
    case "EVALUATE":
      if (
        state.prevContent === "" ||
        state.currentContent === "" ||
        state.operation === ""
      )
        return state;
      return {
        ...state,
        prevContent: "",
        operation: "",
        reset: true,
        currentContent: evaluate(
          state.prevContent,
          state.currentContent,
          state.operation
        ),
      };
    case "DELETE":
      if (state.currentContent === "") return state;
      if (state.currentContent.length === 1)
        return { ...state, currentContent: "" };
      return { ...state, currentContent: state.currentContent.slice(0, -1) };
    default:
      break;
  }
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand) => {
  if (operand === "") return;
  const [integer, decimal] = operand.split(".");
  console.log(integer, decimal);
  if (decimal === undefined) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};

const evaluate = (firstValue, secondValue, operation) => {
  let result;
  const num1 = parseFloat(firstValue);
  const num2 = parseFloat(secondValue);
  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      break;
  }
  return result.toString();
};

const defaultState = {
  prevContent: "",
  currentContent: "",
  operation: "",
  reset: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <main>
      <div className="title">
        <h1>React Calculator App</h1>
        <div className="underline"></div>
      </div>
      <div className="calc-grid">
        <div className="result-contents full-span">
          <div className="prev-content">
            {formatOperand(state.prevContent)} {state.operation}
          </div>
          <div className="current-content">
            {formatOperand(state.currentContent)}
          </div>
        </div>
        <button onClick={() => dispatch({ type: "CLEAR" })} className="span2">
          AC
        </button>
        <button onClick={() => dispatch({ type: "DELETE" })}>DEL</button>
        <Operation operation="/" dispatch={dispatch} />
        <Digits digit="1" dispatch={dispatch} />
        <Digits digit="2" dispatch={dispatch} />
        <Digits digit="3" dispatch={dispatch} />
        <Operation operation="*" dispatch={dispatch} />
        <Digits digit="4" dispatch={dispatch} />
        <Digits digit="5" dispatch={dispatch} />
        <Digits digit="6" dispatch={dispatch} />
        <Operation operation="+" dispatch={dispatch} />
        <Digits digit="7" dispatch={dispatch} />
        <Digits digit="8" dispatch={dispatch} />
        <Digits digit="9" dispatch={dispatch} />
        <Operation operation="-" dispatch={dispatch} />
        <Digits digit="0" dispatch={dispatch} />
        <Digits digit="." dispatch={dispatch} />
        <button
          onClick={() => dispatch({ type: "EVALUATE" })}
          className="span2"
        >
          =
        </button>
      </div>
    </main>
  );
}

export default App;
