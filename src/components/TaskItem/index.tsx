import { IconButton } from "@Aneeshpissay330/components-ui";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectIsDark } from "../../features/theme";

interface TaskItemProps {
    id: string;
    title: string;
    completed?: boolean;
    onToggle?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    id,
    title,
    completed = false,
    onToggle,
    onEdit,
    onDelete,
}) => {
    const isDark = useAppSelector(selectIsDark);
    const textColor = isDark ? "#FFFFFF" : "#1F2937";   // semantic: text color
    const fillColor = isDark ? "#1F2937" : "#FFFFFF";   // semantic: background/fill
    return (
        <div
            id={`task-${id}`}
            className={`task-item bg-white dark:bg-[#1F2937] border border-medium-gray rounded-2xl p-6 flex items-center space-x-6`}
            style={{ display: "flex" }}
        >
            <div className="flex items-center space-x-4 flex-grow">
                <span className="material-symbols-outlined" onClick={() => onToggle && onToggle(id)} style={{ cursor: "pointer", color: completed ? "#10b981" : "#9ca3af" }}>
                    {completed ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span className={`text-lg ${completed ? "line-through" : ""}`}>{title}</span>
            </div>
            <div className="flex text-darker-gray">
                <IconButton disabled={completed} onClick={() => onEdit && onEdit(id)} backgroundColor={fillColor} color={textColor} icon={<span className="material-symbols-outlined">
                    edit
                </span>} />
                <IconButton onClick={() => onDelete && onDelete(id)} backgroundColor={fillColor} color={textColor} icon={<span className="material-symbols-outlined">
                    delete
                </span>} />
            </div>
        </div>
    );
};

export default TaskItem;