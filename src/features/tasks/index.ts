import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  completed: boolean;
  task: string;
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
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<{ taskId: number; newTask: string }>) => {
      const { taskId, newTask } = action.payload;
      state.tasks[taskId].task = newTask;
    },
    toggleCompleted: (state, action: PayloadAction<{ taskId: number; completed: boolean }>) => {
      const { taskId, completed } = action.payload;
      state.tasks[taskId].completed = completed;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
    },
    initializeTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, editTask, toggleCompleted, deleteTask, initializeTasks } = tasksSlice.actions;

export default tasksSlice.reducer;