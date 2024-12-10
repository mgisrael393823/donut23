import React from 'react';
import { Task, TaskStatus } from '../../types/task';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskDrop: (taskId: string, newStatus: TaskStatus) => void;
}

export default function TaskColumn({ title, status, tasks, onTaskDrop }: TaskColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onTaskDrop(taskId, status);
  };

  return (
    <div
      className="flex flex-col w-full lg:w-80 bg-white/50 backdrop-blur-sm rounded-lg p-5 border-2 border-cream"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className="text-xl font-bold mb-6 text-eerie-black">{title}</h3>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}