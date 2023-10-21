import React from 'react';
import { Grid, InputAdornment, List, Paper, TextField, IconButton, Typography, Button } from '@mui/material'
import './App.css'
import { styled } from '@mui/material/styles';
import { RootState } from './app/store';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addTask, clearAllTasks, completeAllTasks, editTask, removeTask, toggleTask } from './features/tasks/tasksSlice';
import DynamicTaskItem from './DynamicListItem';
import { Add } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  width: window.innerWidth,
  height: window.innerHeight * 0.8
}));

function App() {
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const [editingTaskId, setEditingTaskId] = React.useState<number | null>(null);
  const [editedText, setEditedText] = React.useState('');

  const handleToggleTask = (taskId: number) => {
    dispatch(toggleTask(taskId));
  };

  const [taskText, setTaskText] = React.useState('');

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };
  const handleDeleteTask = (taskId: number) => {
    dispatch(removeTask(taskId));
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleEdit = (value: string) => {
    setEditedText(value);
  }

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditedText(taskToEdit.text); // Initialize editedText with the task's text
      setEditingTaskId(taskId);
    }
  };

  const handleSaveTask = (taskId: number, editedText: string) => {
    if (editedText.trim() !== '') {
      dispatch(editTask({ id: taskId, text: editedText }));
      setEditingTaskId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedText('');
  };

  const handleClearAll = () => {
    dispatch(clearAllTasks());
  };

  const handleCompletedAll = () => {
    dispatch(completeAllTasks());
  };
  const pendingTasks = tasks.filter((task) => !task.checked);
  const pendingTasksCount = pendingTasks.length;
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <StyledPaper square={false} elevation={5}>
        <TextField
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          label="Enter your new task"
          fullWidth
          onKeyDown={handleKeyPress}
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="start"><IconButton onClick={handleAddTask}><Add /></IconButton></InputAdornment>,
          }}
        />
        {tasks.length > 0 && <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 10 }}
        >
          <Typography style={{ marginRight: 10 }}>{`You have ${pendingTasksCount} pending task${pendingTasksCount !== 1 ? 's' : ''}`}</Typography>
          <Button style={{ marginRight: 10 }} variant="contained" onClick={handleClearAll}>Clear All</Button>
          <Button variant="contained" onClick={handleCompletedAll}>Mark All as Completed</Button>
        </Grid>}
        <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: window.innerHeight * 0.7, overflowY: 'auto', overflowX: 'hidden' }}>
          {tasks.map((task) => (
            <DynamicTaskItem
              key={task.id}
              id={task.id}
              text={task.text}
              checked={task.checked}
              handleToggle={handleToggleTask}
              handleDelete={handleDeleteTask}
              handleEdit={handleEdit}
              onEdit={() => handleEditTask(task.id)}
              isEditing={editingTaskId === task.id}
              editedText={editedText}
              onSave={handleSaveTask}
              onCancel={handleCancelEdit}
            />
          ))}
        </List>
      </StyledPaper>
    </Grid>
  )
}

export default App
