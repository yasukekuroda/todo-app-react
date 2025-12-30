// 基本的なリスナー型定義
export type Listener = () => void;

export class EventEmitter {
  // 登録する [イベント名, Set(リスナー関数)] を管理するMap
  private listeners: Map<string, Set<Listener>> = new Map();

  /**
   * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  addEventListener(type: string, listener: Listener): void {
    // 指定したイベントに対応するSetを作成しリスナー関数を登録する
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    const listenerSet = this.listeners.get(type);
    listenerSet?.add(listener);
  }

  /**
   * 指定したイベントのイベントリスナーを解除する
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  removeEventListener(type: string, listener: Listener): void {
    // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
    const listenerSet = this.listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.delete(listener);
  }

  /**
   * 指定したイベントをディスパッチする
   * @param {string} type イベント名
   */
  emit(type: string): void {
    // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
    const listenerSet = this.listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((listener) => {
      listener.call(this);
    });
  }
}
