import TodoCard from "./TodoCard";
import { useState } from "react";
const Todo = () => {
  const [card, setCard] = useState([]);

  const addCard = () => {
    const newBlockquotes = [...card, <TodoCard />];
    setCard(newBlockquotes);
  };
  return (
    <div className="col-sm taskDiv">
      <div className="d-flex justify-content-between mb-3">
        <h2>Todo</h2>
        <button className="btn btn-light" onClick={addCard}>
          +
        </button>
      </div>
      <div className="mb-3">
        {card.map((card, index) => (
          <div key={index}>{card}</div>
        ))}
      </div>
      <TodoCard />
    </div>
  );
};

export default Todo;
