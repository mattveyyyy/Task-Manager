import { TaskBoard } from '@widgets/TaskBoard/TaskBoard';
import { AddButton } from '@shared/ui/AddButton/AddButton';
import { useNavigate } from 'react-router-dom';

export const TaskBoardPage = () => {
    const navigate = useNavigate();

    const handleCreateTask = () => {
        navigate('/task/new');
    };

    return (
        <>
        <TaskBoard />
        <AddButton onClick={handleCreateTask} />
        </>
    );
};
