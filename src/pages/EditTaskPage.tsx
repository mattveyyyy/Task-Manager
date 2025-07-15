import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { TaskForm } from '../components/TaskForm/TaskForm';

export const EditTaskPage = () => {
    const { id } = useParams<{ id: string }>();
    const { tasks, updateTask } = useTaskContext();
    const navigate = useNavigate();

    const task = tasks.find((task) => task.id === id);
    if (!task) return <p>Task not found</p>;

    return (
        <TaskForm
        initialData={task}
        onSubmit={(updatedTask) => {
            updateTask(updatedTask);
            navigate('/');
        }}
        onCancel={() => navigate('/')}
        />
    );
};
