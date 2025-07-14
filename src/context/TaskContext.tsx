import { createContext, useContext, useState, type ReactNode } from 'react';

export type Task = {
    id: string;
    title: string;
    description?: string;
    category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
};

type TaskContextType = {
    tasks: Task[];
    updateTask: (updatedTask: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
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

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const updateTask = (updatedTask: Task) => {
        setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, updateTask }}>
        {children}
        </TaskContext.Provider>
    );
    };

export const useTaskContext = () => {
    const context = useContext(TaskContext);
        if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
    return context;
};
