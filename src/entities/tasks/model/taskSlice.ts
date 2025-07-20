import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type Task } from './types';
import * as fakeApi from '@/shared/api/fakeTaskAPI';

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
    return await fakeApi.getTasks();
});

export const createTask = createAsyncThunk('tasks/create', async (task: Task) => {
    return await fakeApi.createTask(task);
});

export const updateTask = createAsyncThunk('tasks/update', async (task: Task) => {
    return await fakeApi.updateTask(task);
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
    await fakeApi.deleteTask(id);
    return id;
});

export const searchTasks = createAsyncThunk('tasks/search', async (query: string) => {
    return await fakeApi.searchTasks(query);
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    selectors: {
        selectTasks: (state: TaskState) => state.tasks,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.loading = false;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Ошибка при загрузке задач';
        })

        .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        })

        .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
            state.tasks[index] = action.payload;
            }
        })

        .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        })

        .addCase(searchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        });
    },
});

export const { selectTasks } = taskSlice.selectors;
export default taskSlice.reducer;
