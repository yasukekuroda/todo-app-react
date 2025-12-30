import { EventEmitter, Listener } from "../EventEmitter.js";
import { TodoItemModel } from "./TodoItemModel.js";

export class TodoListModel extends EventEmitter {
  private items: TodoItemModel[] = [];

  /**
   * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
   */
  constructor(items: TodoItemModel[] = []) {
    super();
    this.items = items;
  }

  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount(): number {
    return this.items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems(): TodoItemModel[] {
    return this.items;
  }

  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
  onChange(listener: Listener): void {
    this.addEventListener("change", listener);
  }

  /**
   * `onChange`で登録したリスナー関数を解除する
   * @param {Function} listener
   */
  offChange(listener: Listener): void {
    this.removeEventListener("change", listener);
  }

  /**
   * 登録済みのリスナー関数を実行する。
   * (モデル状態が変更されたときに実行する想定。)
   */
  emitChange(): void {
    this.emit("change");
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem: TodoItemModel): void {
    // タイトルが空のものは追加しない
    if (todoItem.isEmptyTitle()) {
      return;
    }
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{ id:string, completed: boolean }}
   */
  updateTodo({ id, completed }: { id: string; completed: boolean }): void {
    const todoItem = this.items.find((todo) => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを削除する
   * @param {{ id: string }}
   */
  deleteTodo({ id }: { id: string }): void {
    // `id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除する
    this.items = this.items.filter((todo) => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}
