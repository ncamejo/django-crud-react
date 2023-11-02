/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../api/tasks.api';
import { taskNotification } from '../helpers/notifications';

export const DeleteTask = ({ id }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='flex justify-end'>
        <button
          className='bg-red-500 p-3  rounded-lg w-48 mt-3'
          onClick={async () => {
            const accepted = window.confirm('Are you sure?');
            if (!accepted) return;
            await deleteTask(id);
            taskNotification('Tarea eliminada', '#ECEF34', 'top-center');
            navigate('/');
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};
