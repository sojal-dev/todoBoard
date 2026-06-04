import { Button, Chip } from "@mui/material";
import type { Task } from "../types/task";
import { useBoardStore } from "../store/boardStore";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

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

    const deleteTask = useBoardStore(
        (state) => state.deleteTask
    );

    const selectedTaskId = useBoardStore(
        (state) => state.selectedTaskId
    );

    const setSelectedTask = useBoardStore(
        (state) => state.setSelectedTask
    );

    // console.log(selectedTaskId);


    return(
        <div className="task-card" onClick={()=> setSelectedTask(task.id)}>
            <div className="d-flex gap-2 align-items-center justify-content-between">
                <h4 className="mb-0">{task.title}</h4>
                <div className="d-flex gap-3 align-items-center">
                    <div className="delete-btn">
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => deleteTask(task.id)}
                            >
                                <DeleteIcon fontSize="medium" />
                            </IconButton>
                        </div>
                    <Chip label={task.priority.toUpperCase()} color={getPriorityColor()} size="small" />
                </div>
            </div>
        </div>
    )
};

export default TaskCard;