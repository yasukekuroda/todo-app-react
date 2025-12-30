import { TodoItemModel } from "../model/TodoItemModel.js";
import { element } from "./html-util.js";

export interface TodoCallbacks {
  onUpdateTodo({ id, completed }: { id: string; completed: boolean }): void;
  onDeleteTodo({ id }: { id: string }): void;
}

export class TodoItemView {
  // private callbacks: TodoCallbacks;
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createItemElement(
    todoItem: TodoItemModel,
    { onUpdateTodo, onDeleteTodo }: TodoCallbacks
  ): Element | null {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
                                    <s>${todoItem.title}</s>
                                    <button class="delete">x</button>
                                </li>`
      : element`<li><input type="checkbox" class="checkbox">
                                    ${todoItem.title}
                                    <button class="delete">x</button>
                                </li>`;
    if (!todoItemElement) {
      return null;
    }
    const inputCheckboxElement =
      todoItemElement.querySelector<HTMLInputElement>(".checkbox");
    inputCheckboxElement?.addEventListener("change", () => {
      // コールバック関数を実行.
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
      });
    });
    const deleteButtonElement =
      todoItemElement.querySelector<HTMLElement>(".delete");
    deleteButtonElement?.addEventListener("click", () => {
      // コールバック関数を実行.
      onDeleteTodo({
        id: todoItem.id,
      });
    });
    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
