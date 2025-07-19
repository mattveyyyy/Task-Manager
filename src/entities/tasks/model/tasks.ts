import { type Task } from "./types";

export const tasks: Task[] = [
    {
        id: '1',
        title: 'Fix login issue',
        description: 'Login fails when using special characters.',
        category: 'Bug',
        status: 'To Do',
        priority: 'High',
        date: "2025-07-14T10:30:00"
    },
    {
        id: '2',
        title: 'Add dark mode',
        description: 'Users should be able to toggle dark mode.',
        category: 'Feature',
        status: 'In Progress',
        priority: 'Medium',
        date: "2025-07-14T10:30:00"
    },
    {
        id: '3',
        title: 'Update README',
        description: 'Improve project documentation.',
        category: 'Documentation',
        status: 'Done',
        priority: 'Low',
        date: "2025-07-14T10:30:00"
    },
];