"use client";

import React, { useCallback, useEffect, useState } from "react";
import PromiseQueue, { ITask, Task } from "./PromiseQueue";
import { v4 as uuidv4 } from "uuid";

const CONCURRENCY = 3;
const promiseQueue = new PromiseQueue<string>(CONCURRENCY);

function PromiseQueueVisualizer() {
  const [queue, setQueue] = useState<ITask<any>[]>([]);
  const [runningTask, setRunningTask] = useState<ITask<any>[]>([]);
  const [addTasksCount, setAddTasksCount] = useState(0);

  useEffect(() => {
    const updateQueueInfo = () => {
      setQueue(promiseQueue.getQueue());
      setRunningTask(promiseQueue.getRunning());
    };

    updateQueueInfo();
    const interval = setInterval(
      updateQueueInfo,
      1000 / 60 // 60 FPS
    );

    return () => clearInterval(interval);
  }, []);

  const addTask = useCallback((duration: number) => {
    const taskId = uuidv4();
    const task = new Task(
      taskId,
      () =>
        new Promise<string>((resolve) => {
          setTimeout(() => {
            console.log(`Task ${taskId} finished`);
            resolve(`Task ${taskId} finished`);
          }, duration);
        })
    );
    promiseQueue.addTask(task);
  }, []);

  const addMultipleTasks = useCallback(() => {
    const taskCount = addTasksCount;
    if (isNaN(taskCount) || taskCount <= 0) {
      alert("请输入有效的任务数量！");
      return;
    }
    for (let i = 0; i < taskCount; i++) {
      const duration = Math.floor(Math.random() * 4000) + 1000;
      addTask(duration);
    }
    setAddTasksCount(0);
  }, [addTasksCount, addTask]);

  const handleTaskCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTasksCount(parseInt(e.target.value) || 0);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-xl font-bold mb-4">Promise 任务队列</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <span className="font-semibold">最大并发任务数：</span>
          <span>{CONCURRENCY}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">运行中的任务数：</span>
          <span>{runningTask.length}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">队列中等待执行的任务数：</span>
          <span>{queue.length}</span>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold">当前运行的任务：</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {runningTask.map((task) => (
              <div
                key={task.id}
                className="p-2 bg-green-200 rounded-md text-black"
              >
                任务 {task.id} 执行中...
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-bold">当前等待执行的任务：</h2>
          <div className="grid grid-cols-1 gap-4">
            {queue.map((task, index) => (
              <div
                key={task.id}
                className="p-2 bg-yellow-200 rounded-md text-black"
              >
                任务 {task.id} 等待中...
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className=" mt-4 text-lg font-semibold">批量添加任务</p>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => addTask(Math.floor(Math.random() * 1000) + 100)}
      >
        添加任务(~1000ms)
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        onClick={() => addTask(Math.floor(Math.random() * 2500) + 500)}
      >
        添加任务(~3000ms)
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        onClick={() => addTask(Math.floor(Math.random() * 4000) + 1000)}
      >
        添加任务(~5000ms)
      </button>

      <p className=" mt-4 text-lg font-semibold">批量添加任务</p>
      <div className="flex gap-2 mt-4">
        <input
          type="number"
          placeholder="任务数量"
          className="p-2 rounded-md border border-gray-300"
          value={addTasksCount}
          onChange={handleTaskCountChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addMultipleTasks}
        >
          添加任务
        </button>
      </div>
    </div>
  );
}

export default PromiseQueueVisualizer;
