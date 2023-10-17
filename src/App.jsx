import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Todo from "./components/Todo";
function App() {
  return (
    <div className="container">
      <h1>Drello</h1>
      <div className="row ">
        <Todo />
        <div className="col-sm taskDiv">
          <h2>In Progress</h2>
        </div>
        <div className="col-sm taskDiv">
          <h2>Completed</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
