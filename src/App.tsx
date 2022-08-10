import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todo } from "./components/Todo";

export const App = () => {
  return (
    <div className="App">
      <Todo />
    </div>
  );
};

export default App;
