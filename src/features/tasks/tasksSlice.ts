// src/features/tasks/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: number;
    text: string;
    checked: boolean;
}

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            const newTask: Task = {
                id: state.tasks.length + 1,
                text: action.payload,
                checked: false,
            };
            state.tasks.push(newTask);
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find((t) => t.id === action.payload);
            if (task) {
                task.checked = !task.checked;
            }
        },
        editTask: (state, action: PayloadAction<{ id: number; text: string }>) => {
            const task = state.tasks.find((t) => t.id === action.payload.id);
            if (task) {
                task.text = action.payload.text;
            }
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        clearAllTasks: (state) => {
            state.tasks = [];
        },
        completeAllTasks: (state) => {
            state.tasks.forEach((task) => {
                task.checked = true;
            });
        },
    },
});

export const { addTask, toggleTask, editTask, removeTask, clearAllTasks, completeAllTasks } = tasksSlice.actions;

export default tasksSlice.reducer;