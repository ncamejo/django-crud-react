import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createTask, updateTask, getTask } from '../api/tasks.api';
import { DeleteTask } from '../components/DeleteTask';
import { taskNotification } from '../helpers/notifications';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (!id) {
      await createTask(data);
      taskNotification('Tarea creada', '#E933FF');
    } else {
      await updateTask(id, data);
      taskNotification('Tarea actualizada', '#EF6434', 'top-center');
    }
    navigate('/');
  });

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const {
          data: { title, description },
        } = await getTask(id);
        setValue('title', title);
        setValue('description', description);
      }
    };
    loadTask();
  }, []);

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit}>
        <input
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          type='text'
          placeholder='Title'
          {...register('title', { required: true })}
        />
        {errors.title && <span>title is required</span>}
        <textarea
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          rows='3'
          placeholder='Description'
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>description is required</span>}
        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>
          Save
        </button>
      </form>
      {id && <DeleteTask id={id} />}
    </div>
  );
}
