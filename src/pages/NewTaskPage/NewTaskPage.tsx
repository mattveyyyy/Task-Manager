import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTask } from '@entities/tasks/model/taskSlice';
import { type AppDispatch } from '@app/store';
import { TaskForm } from '@features/manage-task/ui/TaskForm/TaskForm';
import type { Task } from '@entities/tasks/model/types';

export const NewTaskPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    return (
        <TaskForm
            onSubmit={(newTask: Task) => {
                dispatch(createTask(newTask));
                navigate('/');
            }}
            onCancel={() => navigate('/')}
        />
    );
};
