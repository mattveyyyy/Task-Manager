import { TaskList } from '@entities/tasks/ui/TaskList/TaskList';
import styles from './TaskBoard.module.css';
import { useNavigate } from 'react-router-dom';
import { updateTask, deleteTask, selectTasks } from '@entities/tasks/model/taskSlice';
import type { Task } from '@entities/tasks/model/types';
import type { AppDispatch } from '@app/store';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';

// Fix drag-n-drop 
export const TaskBoard = () => {
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const columns = [
        { title: 'To Do', status: 'To Do' as Task['status'], droppableId: 'To Do' },
        { title: 'In Progress', status: 'In Progress' as Task['status'], droppableId: 'In Progress' },
        { title: 'Done', status: 'Done' as Task['status'], droppableId: 'Done' },
    ];

    const handleEdit = (id: string) => {
        navigate(`/task/${id}`);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteTask(id))
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
        return;

        const draggedTask = tasks.find((t: Task) => t.id === draggableId);
        if (!draggedTask) return;

        const newStatus = destination.droppableId as Task['status'];
        const updatedTask = { ...draggedTask, status: newStatus };

        dispatch(updateTask(updatedTask))
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
            {columns.map((col) => {
            const filteredTasks = tasks.filter((task: Task) => task.status === col.status);
            return (
                <div key={col.droppableId} className={styles.column}>
                <h2 className={styles.columnTitle}>{col.title}</h2>
                <TaskList droppableId={col.droppableId} tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete}/>
                </div>
            );
            })}
        </div>
        </DragDropContext>
    );
};


