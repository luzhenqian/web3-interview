export interface ITask<T> {
  id: string;
  executor: () => Promise<T>;
}

export class Task<T> implements ITask<T> {
  constructor(
    public readonly id: string,
    public readonly executor: () => Promise<T>
  ) {}
}

export interface IPromiseQueue<T> {
  addTask: (task: ITask<T>) => Promise<T>;
  getQueue: () => ITask<T>[];
  getRunning: () => ITask<T>[];
}

class PromiseQueue<T> implements IPromiseQueue<T> {
  private readonly concurrency: number; // 允许同时运行的最大任务数
  private currentRunningTasks: ITask<T>[] = []; // 当前正在运行的任务数组
  private queue: Array<{
    task: ITask<T>;
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
  }> = []; // 等待执行的任务队列

  constructor(concurrency: number) {
    if (!Number.isInteger(concurrency) || concurrency <= 0) {
      throw new Error(`并发数必须是一个正整数，但接收到的是 ${concurrency}。`);
    }
    this.concurrency = concurrency;
  }

  // 处理队列中的一个任务，并管理它的状态
  private async processTask(taskItem: {
    task: ITask<T>;
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
  }) {
    try {
      const result = await taskItem.task.executor();
      taskItem.resolve(result);
    } catch (error) {
      taskItem.reject(error);
    } finally {
      // 无论任务成功还是失败，最终都要从当前任务中移除，并尝试运行下一个任务
      this.currentRunningTasks = this.currentRunningTasks.filter(
        (t) => t.id !== taskItem.task.id
      );
      this.dequeue();
    }
  }

  // 从队列中取出任务执行，直到达到并发限制
  private dequeue() {
    while (
      this.currentRunningTasks.length < this.concurrency &&
      this.queue.length > 0
    ) {
      const taskItem = this.queue.shift()!;
      this.currentRunningTasks.push(taskItem.task);
      this.processTask(taskItem);
    }
  }

  addTask(task: ITask<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.dequeue(); // 每次添加任务后尝试运行任务
    });
  }

  getQueue(): ITask<T>[] {
    return this.queue.map((item) => item.task);
  }

  getRunning(): ITask<T>[] {
    return this.currentRunningTasks;
  }
}

export default PromiseQueue;
