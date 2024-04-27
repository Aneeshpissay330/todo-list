import { useState } from 'react';
import { InputGroup, Button, Form } from 'react-bootstrap';

type Tasks = {
  completed: boolean;
  task: string;
}

const Home = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [newTask, setNewTask] = useState('');
  const [edit, setEdit] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const saveTask = () => {
    const task: Tasks = {
      completed: false,
      task: newTask
    };
    const tempTasks = [...tasks];
    tempTasks.push(task);
    setTasks(tempTasks);
    setNewTask("");
  }
  const editTask = () => {
    const updatedTasks = [...tasks]; // Create a copy of the tasks array
    if (editTaskId !== null) {
      updatedTasks[editTaskId] = { ...updatedTasks[editTaskId], task: newTask }; // Update the completed property of the specific task
    }
    setTasks(updatedTasks);
    setNewTask("");
    setEdit(false);
    setEditTaskId(null);
  }
  const handleCompleted = (checked: boolean, index: number) => {
    const updatedTasks = [...tasks]; // Create a copy of the tasks array
    updatedTasks[index] = { ...updatedTasks[index], completed: checked }; // Update the completed property of the specific task
    setTasks(updatedTasks);
  }
  const handleEdit = (index: number) => {
    setEdit(true);
    setEditTaskId(index);
    setNewTask(tasks[index].task);
  }
  const handleDelete = (indexToDelete: number) => {
    const updatedTasks = tasks.filter((task, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };
  return (
    <div className="m-5">
      <h3 id='title'>Todo-List</h3>
      <InputGroup>
        <Form.Control
          placeholder="Enter a task here"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              edit ? editTask() : saveTask()
            }
          }}
        />
        <Button onClick={edit ? editTask : saveTask}>
          Save
        </Button>
      </InputGroup>
      {tasks.map((task, index) => (
        <div id="list" style={{ backgroundColor: editTaskId === index ? '#7565a4' : 'transparent' }} key={index}>
          <Form style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Form.Check
              type="checkbox"
              label={task.task}
              style={{
                color: 'white', // Text color
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
              checked={task.completed}
              onChange={(e) => handleCompleted(e.target.checked, index)}
            />
            <div>
              <i title="Edit" className="fa-solid fa-pen-to-square" onClick={() => handleEdit(index)}></i>
              <i title="Delete" className="fa-solid fa-trash" onClick={() => handleDelete(index)}></i>
            </div>
          </Form>
        </div>
      ))}
    </div>
  )
}

export default Home;