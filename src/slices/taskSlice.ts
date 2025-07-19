import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {tasks} from '../data/tasks'

export type Task = {
    id: string;
    title: string;
    description?: string;
    category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    date: string;
};

interface TaskListState {
    tasks: Task[]
}

const initialState: TaskListState = {
    tasks
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
            },
        updateTask: (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                    if (index) {
                        state.tasks[index] = action.payload;
                    }
            },
        deleteTask: (state, action: PayloadAction<string>) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload)
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
export const {addTask, updateTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
