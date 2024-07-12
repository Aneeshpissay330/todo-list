import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { addTask, editTask, toggleCompleted, deleteTask, initializeTasks } from '../../features/tasks';
import { InputGroup, Button, Form } from 'react-bootstrap';

const Home: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const saveTask = () => {
    dispatch(addTask({ completed: false, task: newTask }));
    setNewTask('');
  };

  const editTaskHandler = () => {
    if (editTaskId !== null) {
      dispatch(editTask({ taskId: editTaskId, newTask }));
      setNewTask('');
      setEdit(false);
      setEditTaskId(null);
    }
  };

  const handleCompleted = (checked: boolean, index: number) => {
    dispatch(toggleCompleted({ taskId: index, completed: checked }));
  };

  const handleEdit = (index: number) => {
    setEdit(true);
    setEditTaskId(index);
    setNewTask(tasks[index].task);
  };

  const handleDelete = (indexToDelete: number) => {
    dispatch(deleteTask(indexToDelete));
  };

  return (
    <div className="m-5">
      <h3 id="title">Todo-List</h3>
      <InputGroup>
        <Form.Control
          placeholder="Enter a task here"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              edit ? editTaskHandler() : saveTask();
            }
          }}
        />
        <Button onClick={edit ? editTaskHandler : saveTask}>Add</Button>
      </InputGroup>
      {tasks.map((task, index) => (
        <div
          id="list"
          style={{ backgroundColor: editTaskId === index ? '#FFA500' : 'transparent' }}
          key={index}
        >
          <Form
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Form.Check
              type="checkbox"
              label={task.task}
              style={{
                color: task.completed ? '#FFA500' : 'white',
              }}
              checked={task.completed}
              onChange={(e) => handleCompleted(e.target.checked, index)}
            />
            <div>
              <i
                title="Edit"
                className="fa-solid fa-pen-to-square"
                onClick={() => handleEdit(index)}
              ></i>
              <i
                title="Delete"
                className="fa-solid fa-trash"
                onClick={() => handleDelete(index)}
              ></i>
            </div>
          </Form>
        </div>
      ))}
    </div>
  );
};

export default Home;