export type Task = {
    id: string;
    title: string;
    description?: string;
    category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    date: string;
};

export interface TaskFormProps {
    initialData?: Task;
    onSubmit: (task: Task) => void;
    onCancel: () => void;
}

export interface TaskItemProps {
    id: string;
    title: string;
    description?: string;
    category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    date: string;
    onEdit(id: string): void;
    onDelete(id: string): void;
}


export interface TaskListProps {
    tasks: Task[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    droppableId: string;
}