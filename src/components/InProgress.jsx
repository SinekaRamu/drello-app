import TodoCard from "./TodoCard";
const InProgress = ({ handleAdd, handleDelete, handleEdit, todos }) => {
  const updateAdd = (value, id) => {
    handleAdd(value, id);
  };

  function handleDragStart(e, id) {
    e.dataTransfer.setData("id", id);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("moving");
  };

  return (
    <div>
      {todos
        .filter((t) => t.inState === "In Progress")
        .map((t) => (
          <div key={t.id}>
            <TodoCard
              sendAdd={updateAdd}
              handleDelete={handleDelete}
              editContent={handleEdit}
              task={t}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
            />
          </div>
        ))}
    </div>
  );
};

export default InProgress;
