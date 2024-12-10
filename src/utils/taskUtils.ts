import { Task } from '../types/task';

export function generateTaskId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function createTask(taskData: Omit<Task, 'id' | 'comments'>): Task {
  return {
    id: generateTaskId(),
    ...taskData,
    comments: [],
    attachments: taskData.attachments || []
  };
}