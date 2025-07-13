import { TaskList } from '../TaskList/TaskList'
import type {Task} from '../TaskList/TaskList'
import styles from './TaskBoard.module.css';

const sampleTasks: Task[] = [
    {
        id: '1',
        title: 'Fix login issue',
        description: 'Login fails when using special characters.',
        category: 'Bug',
        status: 'To Do',
        priority: 'High',
    },
    {
        id: '2',
        title: 'Add dark mode',
        description: 'Users should be able to toggle dark mode.',
        category: 'Feature',
        status: 'In Progress',
        priority: 'Medium',
    },
    {
        id: '3',
        title: 'Update README',
        description: 'Improve project documentation.',
        category: 'Documentation',
        status: 'Done',
        priority: 'Low',
    },
    {
        id: '4',
        title: 'Refactor auth module',
        description: 'Simplify code structure and remove duplication.',
        category: 'Refactor',
        status: 'To Do',
        priority: 'Medium',
    },
    {
        id: '5',
        title: 'Write unit tests',
        description: 'Increase coverage for task module.',
        category: 'Test',
        status: 'In Progress',
        priority: 'High',
    },
    {
        id: '6',
        title: 'Fix broken link on landing page',
        category: 'Bug',
        status: 'Done',
        priority: 'Low',
    },
    {
        id: '7',
        title: 'Test',
        description: 'Add filters for priority, status, and assignee to help users find tasks quickly.',
        category: 'Test',
        status: 'In Progress',
        priority: 'Medium',
    },
];

export const TaskBoard = () => {
    const handleEdit = (id: string) => {
        console.log(`Edit task with ID: ${id}`);
    };

    const columns = [
        { title: 'To Do', status: 'To Do' },
        { title: 'In Progress', status: 'In Progress' },
        { title: 'Done', status: 'Done' },
    ];

    return (
        <div className={styles.board}>
        {columns.map((col) => {
            const filtered = sampleTasks.filter((task) => task.status === col.status);
            return (
            <div key={col.status} className={styles.column}>
                <h2 className={styles.columnTitle}>{col.title}</h2>
                <TaskList tasks={filtered} onEdit={handleEdit} />
            </div>
            );
        })}
        </div>
    );
};
