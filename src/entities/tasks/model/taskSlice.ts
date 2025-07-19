import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import { tasks } from './tasks';
import { type Task } from './types';

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
        createTask: (state, action: PayloadAction<Task>) => {
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
export const {createTask, updateTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
