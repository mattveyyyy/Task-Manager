import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTask} from '../slices/TaskSlice';
import { type AppDispatch } from '../store/store';
import { TaskForm } from '../components/TaskForm/TaskForm';

export const NewTaskPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    return (
        <TaskForm
        onSubmit={(newTask) => {
            dispatch(addTask(newTask));
            navigate('/');
        }}
        onCancel={() => navigate('/')}
        />
    );
};
