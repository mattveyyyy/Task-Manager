import { TaskItem } from '../TaskItem/TaskItem'
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
}

export const TaskList = ({ tasks, onEdit }: TaskListProps) => {
    return (
        <div className={styles.taskList}>
        {tasks.map((task) => (
            <TaskItem key={task.id} {...task} onEdit={onEdit} />
        ))}
        </div>
    );
};
