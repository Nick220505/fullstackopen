const Todo = ({ todo, completeTodo, deleteTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '70%',
        margin: 'auto',
      }}
    >
      <span>{todo.text}</span>
      {todo.done ? (
        <>
          <span>This todo is done</span>
          <span>
            <button onClick={onClickDelete(todo)}> Delete </button>
          </span>
        </>
      ) : (
        <>
          <span>This todo is not done</span>
          <span>
            <button onClick={onClickDelete(todo)}> Delete </button>
            <button onClick={onClickComplete(todo)}> Set as done </button>
          </span>
        </>
      )}
    </div>
  );
};

export default Todo;
