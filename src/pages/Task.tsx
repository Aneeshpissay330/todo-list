import { Button, Dialog, Modal, TextInput } from "@Aneeshpissay330/components-ui";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import TaskList from "../components/TaskList";
import { deleteTask, editTask, toggleTask } from "../features/tasks";
import { useActionState, useState } from "react";
import { selectIsDark } from "../features/theme";

interface TaskProps {
  type: "all" | "active" | "completed"
}

type NoState = null;

const Task: React.FC<TaskProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const [taskId, setTaskId] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = useAppSelector(selectIsDark);
  const toggleTasks = (id: string) => {
    dispatch(toggleTask(id));
  }
  const editTasks = (id: string) => {
    setTaskId(id);
    setModalOpen(true);
  }
  const deleteTasks = (id: string) => {
    setTaskId(id);
    setDialogOpen(true);
  }
  async function updateTodo(_: NoState, formData: FormData): Promise<NoState> {
    const title = formData.get("title") as string;
    dispatch(editTask({ id: taskId, title }));
    setModalOpen(false);
    return null; // ✅ must return the state type
  }

  const [_, formAction] = useActionState<NoState, FormData>(
    updateTodo,
    null
  );
  const backgroundColor = isDark ? "#1F2937" : "#FFFFFF";   // semantic: background
  const fillColor = isDark ? "#FFFFFF" : "#1F2937";   // semantic: text color
  const textColor = isDark ? "#1F2937" : "#FFFFFF";
  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Delete Task"
        backgroundColor={backgroundColor}
        footer={
          <>
            <Button
              backgroundColor={fillColor}
              color={textColor}
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              backgroundColor="red"
              color="#fff"
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                if (taskId) {
                  dispatch(deleteTask(taskId));
                }
                setDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
      </Dialog>
      <Modal style={{ width: 'fit-content' }} backgroundColor={backgroundColor} open={modalOpen} onClose={() => setModalOpen(false)}>
        <div id="input-section" className="mb-8">
          <div className="bg-white dark:bg-[#1F2937] border border-medium-gray rounded-2xl p-8 shadow-sm">
            <form action={formAction}>
              <div className="flex items-center space-x-6">
                <TextInput
                  placeholder="Update task..."
                  name="title"
                  variant="outlined"
                  borderColor={fillColor}
                  focusedBorderColor={fillColor}
                  color={fillColor}
                  defaultValue={taskId ? tasks.find(task => task.id === taskId)?.title : ''}
                />
                <Button color={textColor} backgroundColor={fillColor} leftIcon={<span className="material-symbols-outlined">
                  edit
                </span>}>Update</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <TaskList
        tasks={type === "all" ? tasks : type === "active" ? pendingTasks : completedTasks}
        onToggle={toggleTasks}
        onEdit={editTasks}
        onDelete={deleteTasks}
      />
    </>
  )
}

export default Task