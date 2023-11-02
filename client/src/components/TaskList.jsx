import { useEffect, useState } from 'react';
import { getAllTasks } from '../api/tasks.api';
import { TasksCard } from './TasksCard';

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadAllTasks = async () => {
      const res = await getAllTasks();
      setTasks(res.data);
    };

    loadAllTasks();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-3'>
      {tasks && tasks.map((task) => <TasksCard key={task.id} task={task} />)}
    </div>
  );
};
