import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './TodoList.scss';
import { addTask, getUserTasks, deleteTask, updateTask, getUserTasksRealtime } from '../../services/taskService';
import { useAuth } from '../../hooks/useAuth';
import { Task } from '../../types/Task';

export const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useAuth();
  const location = useLocation();
  const { category } = useParams<{ category: string }>();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const categoryFromState = location.state?.category || category || 'Uncategorized';
    setSelectedCategory(categoryFromState);
  }, [location.state, category]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const tasksData = await getUserTasks(user.uid);
        setTasks(tasksData);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    let unsubscribe: () => void;
    if (user) {
      unsubscribe = getUserTasksRealtime(user.uid, setTasks);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && newTaskTitle.trim()) {
      const newTask: Task = {
        title: newTaskTitle,
        description: '',
        completed: false,
        userId: user.uid,
        createdAt: new Date(),
        category: selectedCategory,
      };
      const taskId = await addTask(newTask);
      if (taskId) {
        setTasks([...tasks, { ...newTask, id: taskId }]);
        setNewTaskTitle('');
        setMessage('Task added successfully!');
        setTimeout(() => setMessage(null), 3000); 
      }
    }
  };

  const handleToggleComplete = async (task: Task) => {
    await updateTask(task.id!, { completed: !task.completed });
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  if (!user) {
    return <div>Please log in to view tasks.</div>;
  }

  return (
    <div className='todo-list'>
      <div className='todo-container'>
        <h1>{selectedCategory} Tasks</h1>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter new task"
          />
          <button type="submit">Add Task</button>
        </form>
        <div>
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
              />
              {task.title}
              <button onClick={() => handleDeleteTask(task.id!)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;