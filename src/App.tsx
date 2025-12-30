import React, { useState, useEffect } from "react";
import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoList } from "./components/TodoList";

const App: React.FC = () => {
  const [model] = useState(() => new TodoListModel([]));
  const [todos, setTodos] = useState<TodoItemModel[]>(model.getTodoItems());

  useEffect(() => {
    const handleChange = () => {
      setTodos([...model.getTodoItems()]);
    };
    model.onChange(handleChange);
    return () => {
      model.offChange(handleChange);
    };
  }, [model]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("title") as HTMLInputElement;
    if (input.value) {
      model.addTodo(
        new TodoItemModel({ title: input.value, completed: false })
      );
      input.value = "";
    }
  };

  const handleUpdate = (id: string, completed: boolean) => {
    model.updateTodo({ id, completed });
  };

  const handleDelete = (id: string) => {
    model.deleteTodo({ id });
  };

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleAdd}>
          <input
            name="title"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            autoComplete="off"
          />
        </form>
      </header>
      <section className="main">
        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{model.getTotalCount()}</strong> items left
        </span>
      </footer>
    </div>
  );
};

export default App;
