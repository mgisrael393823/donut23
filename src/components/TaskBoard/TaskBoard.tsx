import React, { useState } from 'react';
import { Task, TaskStatus } from '../../types/task';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import { createTask } from '../../utils/taskUtils';
import { Plus, Star } from 'lucide-react';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Implement Authentication',
    description: 'Set up JWT authentication system',
    priority: 'high',
    status: 'todo',
    dueDate: new Date('2024-03-20'),
    tags: ['backend', 'security'],
    timeEstimate: 8,
    comments: [],
    attachments: []
  },
  {
    id: '2',
    title: 'Design Dashboard',
    description: 'Create wireframes for main dashboard',
    priority: 'medium',
    status: 'in-progress',
    dueDate: new Date('2024-03-18'),
    tags: ['design', 'ui'],
    timeEstimate: 6,
    comments: [],
    attachments: []
  }
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'comments'>) => {
    const newTask = createTask(taskData);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsFormOpen(false);
  };

  const handleTaskDrop = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-eerie-black">Upcoming Work</h2>
          <div className="flex gap-4 mt-2">
            <button className="text-sm text-electric border-b-2 border-electric pb-1">
              Upcoming
            </button>
            <button className="text-sm text-gray-500 hover:text-electric pb-1">
              Board
            </button>
            <button className="text-sm text-gray-500 hover:text-electric pb-1">
              Notes
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 overflow-x-auto pb-6">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={getTasksByStatus('todo')}
          onTaskDrop={handleTaskDrop}
        />
        <TaskColumn
          title="In Progress"
          status="in-progress"
          tasks={getTasksByStatus('in-progress')}
          onTaskDrop={handleTaskDrop}
        />
        <TaskColumn
          title="Completed"
          status="completed"
          tasks={getTasksByStatus('completed')}
          onTaskDrop={handleTaskDrop}
        />
      </div>

      {isFormOpen && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}