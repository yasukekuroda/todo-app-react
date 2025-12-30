import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { render } from "./view/html-util.js";

export class App {
  private readonly todoListModel: TodoListModel;
  private readonly todoListView: TodoListView;
  private readonly formElement: HTMLFormElement | null;
  private readonly formInputElement: HTMLInputElement | null;
  private readonly todoListElement: HTMLElement | null;
  private readonly todoCountElement: HTMLElement | null;

  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel([]);
    this.formElement = document.querySelector<HTMLFormElement>("#js-form");
    this.formInputElement =
      document.querySelector<HTMLInputElement>("#js-form-input");
    this.todoListElement = document.querySelector<HTMLElement>("#js-todo-list");
    this.todoCountElement =
      document.querySelector<HTMLElement>("#js-todo-count");
  }

  /**
   * [リスナー関数] Todo追加時にCallされる
   * 処理内容： モデルを更新する.
   * @param {string} title
   */
  private handleAdd = (title: string): void => {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  };

  /**
   * [リスナー関数] Todo更新時にCallされる
   * 処理内容： モデルを更新する.
   * @param {{ id:string, completed: boolean }}
   */
  private handleUpdate = ({
    id,
    completed,
  }: {
    id: string;
    completed: boolean;
  }): void => {
    this.todoListModel.updateTodo({ id, completed });
  };

  /**
   * [リスナー関数] Todo削除時にCallされる
   * 処理内容： モデルを更新する.
   * @param {{ id: string }}
   */
  private handleDelete = ({ id }: { id: string }): void => {
    this.todoListModel.deleteTodo({ id });
  };

  /**
   * [リスナー関数] フォーム送信した際にCallされる
   * 処理内容： モデルを更新する.
   * @param {Event} event
   */
  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    if (!this.formInputElement) return;
    this.handleAdd(this.formInputElement.value);
    this.formInputElement.value = "";
  };

  /**
   * [リスナー関数] モデル(=TodoListModel)の状態を変更した際にCallされる
   * 処理内容： Viewを再構築する(=更新後Modelを元にTodoを画面表示する)。
   */
  private handleChange = (): void => {
    const newTodoListElement = this.todoListView.createListElement(
      this.todoListModel.getTodoItems(),
      {
        onUpdateTodo: this.handleUpdate,
        onDeleteTodo: this.handleDelete,
      }
    );
    if (newTodoListElement && this.todoListElement) {
      render(newTodoListElement, this.todoListElement);
    }
    if (this.todoCountElement) {
      this.todoCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    }
  };

  /**
   * アプリとDOMの紐づけを登録する関数
   */
  mount(): void {
    this.formElement?.addEventListener("submit", this.handleSubmit);
    this.todoListModel.onChange(this.handleChange);
  }

  /**
   * アプリとDOMの紐づけを解除する関数
   */
  unmount(): void {
    this.formElement?.removeEventListener("submit", this.handleSubmit);
    this.todoListModel.offChange(this.handleChange);
  }
}
