import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { TaskForm } from '../components/TaskForm/TaskForm';

export const NewTaskPage = () => {
    const { addTask } = useTaskContext();
    const navigate = useNavigate();

    return (
        <TaskForm
        onSubmit={(newTask) => {
            addTask(newTask);
            navigate('/');
        }}
        onCancel={() => navigate('/')}
        />
    );
};
