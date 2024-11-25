import React, { FC } from "react";

type TodoItemsProps = {
  todo: string;
  onRemove: () => void;
};

export const TodoItems: FC<TodoItemsProps> = ({ todo, onRemove }) => {
  return (
    <div className = "todo-item">
      <span>{todo}</span>
      <button onClick={onRemove}>Izbriši</button>
    </div>
  );
};