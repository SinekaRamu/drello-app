const TodoCard = () => {
  return (
    <>
      <blockquote contenteditable="true" className="rounded p-2">
        <p>Edit this content to add your own quote</p>
        <cite contenteditable="true" className="">
          last updated
        </cite>
      </blockquote>
    </>
  );
};

export default TodoCard;
