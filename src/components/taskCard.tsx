import { Chip } from "@mui/material";
import type { Task } from "../types/task";

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {

    const getPriorityColor = () => {
        switch(task.priority) {
            case "high":
                return "error";
            case "medium":
                return "warning";
            case "low":
                return "success";
            default:
                return "default";
        }
    };

    return(
        <div className="task-card d-flex gap-2 align-items-center justify-content-between">
            <h4 className="mb-0">{task.title}</h4>
            <Chip label={task.priority.toUpperCase()} color={getPriorityColor()} size="small" />
        </div>
    )
};

export default TaskCard;