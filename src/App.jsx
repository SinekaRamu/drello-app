import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useReducer, useEffect } from "react";
import Todo from "./components/Todo";

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("My-Drello")) || [];
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, getFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("My-Drello", JSON.stringify(todos));
  }, [todos]);

  function todoReducer(todos, action) {
    switch (action.type) {
      case "TODO_ADD": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.value,
            inSate: "todo",
          },
        ];
      }
      case "TODO_DELETE": {
        const filtered = todos.filter((t) => t.id != action.value);
        return [...filtered];
      }

      case "TODO_EDIT": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value.id);
        if (idx !== -1) {
          newTodos[idx]["text"] = action.value.text;
        }
        return newTodos;
      }

      default:
        throw Error("Unknown action: " + action.type);
    }
  }

  function handleAdd(text) {
    dispatch({
      type: "TODO_ADD",
      value: text,
    });
  }
  function handleEdit(text, id) {
    dispatch({
      type: "TODO_EDIT",
      value: { text, id },
    });
  }

  function handleDelete(id) {
    dispatch({
      type: "TODO_DELETE",
      value: id,
    });
  }

  return (
    <div>
      <header className="main-header">
        <h1>Drello</h1>
      </header>
      <div className="container ">
        <div className="list-wrapper">
          <Todo
            todos={todos}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>

        <div className="list-wrapper">
          <div className="taskDiv">
            <div className="task-header">
              <h2>In Progress</h2>
            </div>
          </div>
        </div>

        <div className="list-wrapper">
          <div className="taskDiv">
            <div className="task-header">
              <h2>Completed</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
