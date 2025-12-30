import { TodoItemModel } from "../model/TodoItemModel.js";
import { element } from "./html-util.js";
import { TodoCallbacks, TodoItemView } from "./TodoItemView.js";

export class TodoListView {
  /**
   * `todoItems`に対応するTodoリストのHTML要素を作成して返す
   * @param {TodoItemModel[]} todoItems TodoItemModelの配列
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
   */
  createListElement(
    todoItems: TodoItemModel[],
    { onUpdateTodo, onDeleteTodo }: TodoCallbacks
  ): Element | null {
    const todoListElement = element`<ul></ul>`;
    // 各TodoItemモデルに対応したHTML要素を作成し、リスト要素へ追加する
    if (!todoListElement) {
      return null;
    }
    todoItems.forEach((todoItem) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createItemElement(todoItem, {
        onDeleteTodo,
        onUpdateTodo,
      });
      if (todoItemElement) {
        todoListElement.appendChild(todoItemElement);
      }
    });
    return todoListElement;
  }
}
