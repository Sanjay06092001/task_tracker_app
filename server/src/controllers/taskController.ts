import { Request, Response } from 'express';
import { users } from '../storage';
import { Task } from '../types/user';

export const getTasks = (req: Request, res: Response): void => {
  const user = users[(req as any).userId];
  res.json(user.tasks);
};

export const createTask = (req: Request, res: Response): void => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ message: 'Title required.' });
    return;
  }
  const task: Task = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    completed: false,
    createdAt: new Date()
  };
  users[(req as any).userId].tasks.push(task);
  res.status(201).json(task);
};

export const updateTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const user = users[(req as any).userId];
  const task = user.tasks.find((t: Task) => t.id === id);
  if (!task) {
    res.status(404).json({ message: 'Task not found.' });
    return;
  }
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
};

export const deleteTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const user = users[(req as any).userId];
  const idx = user.tasks.findIndex((t: Task) => t.id === id);
  if (idx === -1) {
    res.status(404).json({ message: 'Task not found.' });
    return;
  }
  user.tasks.splice(idx, 1);
  res.status(204).send();
};
