import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TodoItems } from './TodoItems';
import './TodoList.scss';
import { addTask } from '../../services/taskService';
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

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

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
        {tasks.map((task, index) => (
          <TodoItems 
            key={index} 
            todo={task.title} 
            onRemove={() => removeTask(index)} 
          />
        ))}
      </div>
        
      </div>
    </div>
  );
};

