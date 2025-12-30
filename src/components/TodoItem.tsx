import React from "react";
import { TodoItemModel } from "../model/TodoItemModel";

interface TodoItemProps {
  todo: TodoItemModel;
  onUpdate: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  onDelete,
}) => {
  return (
    <li>
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate(todo.id, !todo.completed)}
      />
      {todo.completed ? <s>{todo.title}</s> : todo.title}
      <button className="delete" onClick={() => onDelete(todo.id)}>
        x
      </button>
    </li>
  );
};
