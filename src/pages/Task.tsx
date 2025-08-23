import { useAppDispatch, useAppSelector } from "../app/hooks"
import TaskList from "../components/TaskList";
import { deleteTask, toggleTask } from "../features/tasks";

interface TaskProps {
  type: "all" | "active" | "completed"
}

const Task : React.FC<TaskProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const toggleTasks = (id: string) => {
    dispatch(toggleTask(id));
  }
  const deleteTasks = (id: string) => {
    dispatch(deleteTask(id));
  }
  return (
    <TaskList 
      tasks={type === "all" ? tasks : type === "active" ? pendingTasks : completedTasks}
      onToggle={toggleTasks}
      onDelete={deleteTasks}
    />
  )
}

export default Task