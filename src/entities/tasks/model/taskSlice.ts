import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import { tasks as initialTasks} from './tasks';
import { type Task } from './types';

const TASKS_STORAGE_KEY = 'tasks_storage';

function getInitialTasks() {
    try {
        const stored = localStorage.getItem(TASKS_STORAGE_KEY);
        if (stored) {
        return JSON.parse(stored);
        }
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(initialTasks));
        return initialTasks;
    } catch {
        return initialTasks;
    }
}

const initialState = {
    tasks: getInitialTasks(),
};


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
                localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
            },
        updateTask: (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex((task: Task) => task.id === action.payload.id);
                    if (index) {
                        state.tasks[index] = action.payload;
                    }
                localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
            },
        deleteTask: (state, action: PayloadAction<string>) => {
                state.tasks = state.tasks.filter((task: Task) => task.id !== action.payload);
                localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
            }    
        },
    selectors: {
            selectTasks: (sliceState) => {
                return sliceState.tasks;
            }
        }
    }
)

export const {selectTasks} = taskSlice.selectors;
export const {createTask, updateTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
