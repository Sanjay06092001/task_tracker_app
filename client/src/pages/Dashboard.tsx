import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err: any) {
      setError('Failed to fetch tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    try {
      await api.post('/tasks', { title: title.trim() });
      setTitle('');
      setError('');
      fetchTasks();
    } catch {
      setError('Failed to add task.');
    }
  };

  const handleUpdate = async (id: string, completed: boolean, newTitle?: string) => {
    if (newTitle !== undefined && !newTitle.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    try {
      await api.put(`/tasks/${id}`, { completed, title: newTitle ? newTitle.trim() : undefined });
      setError('');
      fetchTasks();
    } catch {
      setError('Failed to update task.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      setError('Failed to delete task.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Task Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <form onSubmit={handleAdd} className="add-task-form single-line-form">
        <input type="text" placeholder="New task title" value={title} onChange={e => setTitle(e.target.value)} required />
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>
      {error && <div className="error">{error}</div>}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input type="checkbox" checked={task.completed} onChange={() => handleUpdate(task.id, !task.completed)} />
            <div className="task-content">
              {editId === task.id ? (
                <div className="edit-controls">
                  <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                  <div className='edit-buttons' style={{padding: '1rem 0rem'}}>
                    <button onClick={() => { handleUpdate(task.id, task.completed, editTitle); setEditId(null); }}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{task.title}</span>
                  <button onClick={() => { setEditId(task.id); setEditTitle(task.title); }}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </>
              )}
              <span className="created-at">{new Date(task.createdAt).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
