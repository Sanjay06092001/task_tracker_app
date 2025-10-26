import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../storage';

const JWT_SECRET = 'supersecretkey';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password required.' });
    return;
  }
  const existing = Object.values(users).find(u => u.email === email);
  if (existing) {
    res.status(409).json({ message: 'Email already registered.' });
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  const id = Math.random().toString(36).substr(2, 9);
  users[id] = { id, email, passwordHash: hash, tasks: [] };
  res.status(201).json({ message: 'User registered.' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password required.' });
    return;
  }
  const user = Object.values(users).find(u => u.email === email);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
};
