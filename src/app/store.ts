import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@entities/tasks/model/taskSlice';
import authReducer from '@entities/auth/authSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


