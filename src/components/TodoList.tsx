import React from "react";
import { TodoItemModel } from "../model/TodoItemModel";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: TodoItemModel[];
  onUpdate: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdate,
  onDelete,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
