import { type Task } from '@/entities/tasks/model/types';
import { tasks as initialTasks } from '@/entities/tasks/model/tasks';
const STORAGE_KEY = 'tasks_storage';


function getStoredTasks(): Task[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    console.log('Raw from localStorage:', raw);
    if (!raw) {
        console.log('localStorage пустой, записываю initialTasks');
        saveTasks(initialTasks);
        return initialTasks;
    }
    return JSON.parse(raw) as Task[];
}

function saveTasks(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// GET /tasks
export async function getTasks(): Promise<Task[]> {
    return Promise.resolve(getStoredTasks());
}

// GET /tasks/:id
export async function getTask(id: string): Promise<Task | undefined> {
    const tasks = getStoredTasks();
    return Promise.resolve(tasks.find(task => task.id === id));
}

// POST /tasks
export async function createTask(task: Task): Promise<Task> {
    const tasks = getStoredTasks();
    tasks.push(task);
    saveTasks(tasks);
    return Promise.resolve(task);
}

// PATCH /tasks/:id
export async function updateTask(task: Task): Promise<Task> {
    const tasks = getStoredTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks[index] = task;
        saveTasks(tasks);
    }
    return Promise.resolve(task);
}

// DELETE /tasks/:id
export async function deleteTask(id: string): Promise<void> {
    const tasks = getStoredTasks();
    const updated = tasks.filter(task => task.id !== id);
    saveTasks(updated);
    return Promise.resolve();
}

// GET /tasks?query=searchText
export async function searchTasks(query: string): Promise<Task[]> {
    const tasks = getStoredTasks();
    const lower = query.toLowerCase();
    return Promise.resolve(
        tasks.filter(task =>
        task.title.toLowerCase().includes(lower)
        )
    );
}
