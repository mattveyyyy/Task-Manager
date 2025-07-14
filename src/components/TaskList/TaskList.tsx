import { Droppable, Draggable } from '@hello-pangea/dnd';
import { TaskItem } from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
}

interface TaskListProps {
    tasks: Task[];
    onEdit: (id: string) => void;
    droppableId: string;
    }

export const TaskList = ({ tasks, onEdit, droppableId }: TaskListProps) => {
    return (
        <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${styles.taskList} ${
                    snapshot.isDraggingOver ? styles.draggingOver : ''
                }`}
            >
            {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                    <TaskItem {...task} onEdit={onEdit} />
                    </div>
                )}
                </Draggable>
            ))}

            {tasks.length === 0 && (
                <div className={styles.emptyColumn}>Перетащи задачу сюда</div>
            )}

            <div className={styles.placeholderWrapper}>
                {provided.placeholder}
            </div>

            </div>
        )}
        </Droppable>
    );
};
