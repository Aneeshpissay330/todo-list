import React from "react";
import TaskItem from "../TaskItem";

interface Task {
  id: string;
  title: string;
  completed?: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div id="task-list" className="space-y-6">
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;