export interface TodoItemInterface {
  id: string;
  title: string;
  completed: boolean;
}

export class TodoItemModel implements TodoItemInterface {
  id: string; // TodoアイテムのID
  title: string; // Todoアイテムのタイトル
  completed: boolean; // Todoアイテムが完了済みならばtrue、そうでない場合はfalse

  constructor({ title, completed }: { title: string; completed: boolean }) {
    this.id = crypto.randomUUID();
    console.log("🚀 ~ constructor ~ id:", this.id);
    this.title = title;
    this.completed = completed;
  }

  /**
   * タイトルが空文字列の場合にtrueを返す
   * @returns {boolean}
   */
  isEmptyTitle(): boolean {
    return this.title.length === 0;
  }
}
