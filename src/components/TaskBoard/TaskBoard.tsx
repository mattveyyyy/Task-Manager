import { TaskList } from '../TaskList/TaskList';
import styles from './TaskBoard.module.css';
import { useNavigate } from 'react-router-dom';
import { useTaskContext, type Task } from '../../context/TaskContext';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';

export const TaskBoard = () => {
    const { tasks, updateTask } = useTaskContext();
    const navigate = useNavigate();

    const columns = [
        { title: 'To Do', status: 'To Do' as Task['status'], droppableId: 'To Do' },
        { title: 'In Progress', status: 'In Progress' as Task['status'], droppableId: 'In Progress' },
        { title: 'Done', status: 'Done' as Task['status'], droppableId: 'Done' },
    ];

    const handleEdit = (id: string) => {
        navigate(`/task/${id}`);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
        return;

        const draggedTask = tasks.find((t) => t.id === draggableId);
        if (!draggedTask) return;

        const newStatus = destination.droppableId as Task['status'];
        const updatedTask = { ...draggedTask, status: newStatus };

        updateTask(updatedTask);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
            {columns.map((col) => {
            const filteredTasks = tasks.filter((task) => task.status === col.status);
            return (
                <div key={col.droppableId} className={styles.column}>
                <h2 className={styles.columnTitle}>{col.title}</h2>
                <TaskList droppableId={col.droppableId} tasks={filteredTasks} onEdit={handleEdit} />
                </div>
            );
            })}
        </div>
        </DragDropContext>
    );
};
