import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, selectTasks } from '../slices/TaskSlice';
import { type AppDispatch } from '../store/store';
import { TaskForm } from '../components/TaskForm/TaskForm';

export const EditTaskPage = () => {
    const { id } = useParams<{ id: string }>();
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const task = tasks.find((task) => task.id === id);
    if (!task) return <p>Task not found</p>;

    return (
        <TaskForm
        initialData={task}
        onSubmit={(updatedTask) => {
            dispatch(updateTask(updatedTask));
            navigate('/');
        }}
        onCancel={() => navigate('/')}
        />
    );
};
