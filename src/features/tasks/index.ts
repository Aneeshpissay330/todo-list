import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateUUID } from "../../utils/uuid";

export interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TasksState {
    items: Task[];
}

const initialState: TasksState = {
    items: [],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ title: string }>) => {
            state.items.push({
                id: generateUUID(),
                title: action.payload.title,
                completed: false,
            });
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.items.find((t) => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        editTask: (state, action: PayloadAction<{ id: string; title: string }>) => {
            const task = state.items.find((t) => t.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
        clearCompleted: (state) => {
            state.items = state.items.filter((t) => !t.completed);
        },
    },
});

export const { addTask, toggleTask, editTask, deleteTask, clearCompleted } =
    tasksSlice.actions;

export default tasksSlice.reducer;
