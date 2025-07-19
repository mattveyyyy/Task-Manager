import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, selectTasks } from '@entities/tasks/model/taskSlice';
import { type AppDispatch } from '@app/store';
import { TaskForm } from '@features/manage-task/ui/TaskForm/TaskForm';
import type { Task } from '@entities/tasks/model/types';

export const EditTaskPage = () => {
    const { id } = useParams<{ id: string }>();
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const task = tasks.find((task: Task) => task.id === id);
    if (!task) return <p>Task not found</p>;

    return (
        <TaskForm
        initialData={task}
        onSubmit={(updatedTask: Task) => {
            dispatch(updateTask(updatedTask));
            navigate('/');
        }}
        onCancel={() => navigate('/')}
        />
    );
};
