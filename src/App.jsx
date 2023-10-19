import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useReducer, useEffect } from "react";
import Todo from "./components/Todo";
import InProgress from "./components/InProgress";
import Completed from "./components/Completed";
// import TitleCard from "./components/TitleCard";
function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("My-Drello")) || [];
}

function App() {
  // const [drelloState, setDrelloState] = useState([
  //   "Todo",
  //   "In Progress",
  //   "Completed",
  // ]);
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
            time: new Date().toLocaleTimeString(),
            inState: "Todo",
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
          newTodos[idx]["time"] = new Date().toLocaleTimeString();
        }
        return newTodos;
      }

      case "TODO_DROP": {
        let newTasks = todos.filter((t) => {
          if (t.id == action.value.id) {
            t.inState = action.value.state;
          }
          return t;
        });
        return newTasks;
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

  function onDrop(ev, state) {
    let id = ev.dataTransfer.getData("id");
    dispatch({
      type: "TODO_DROP",
      value: { id, state },
    });
  }
  const onDragOver = (ev) => {
    ev.preventDefault();
  };
  return (
    <div>
      <header className="main-header">
        <h1>Drello</h1>
      </header>
      <div className="container ">
        {/* {drelloState.map((t, index) => (
          <div key={index} className="list-wrapper">
            <div className="taskDiv">
              <TitleCard
                title={t}
                handleAdd={handleAdd}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, "todo")}
              />
            </div>
          </div>
        ))} */}
        <div
          className="list-wrapper"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "Todo")}
        >
          <div className="taskDiv">
            <div className="task-header">
              <h2>Todo</h2>
              <button onClick={() => handleAdd("")}>+</button>
            </div>
            <Todo
              todos={todos}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        </div>
        <div
          className="list-wrapper"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "In Progress")}
        >
          <div className="taskDiv">
            <div className="task-header">
              <h2>In Progress</h2>
            </div>
            <InProgress
              todos={todos}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        </div>

        <div
          className="list-wrapper"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "Completed")}
        >
          <div className="taskDiv">
            <div className="task-header">
              <h2>Completed</h2>
            </div>
            <Completed
              todos={todos}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
