import { Chip } from "@mui/material";
import type { Task } from "../types/task";
import { useBoardStore } from "../store/boardStore";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {

    const[showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    // console.log(task.assigneeId)



    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();


    return(
        <div className="task-card" onClick={()=> setSelectedTask(task.id)}>
            <div className="d-flex gap-2 align-items-center justify-content-between">
                <h4 className="mb-0">{task.title}</h4>
                <div className="d-flex gap-3 align-items-center">
                    <div className="delete-btn">
                        {
                            showDeleteConfirm ? (
                                <div className="delete-confirm d-flex gap-2 align-items-center" onClick={(e) => e.stopPropagation()}>
                                    <span>Delete?</span>
                                    <button className="green" onClick={()=> deleteTask(task.id)}>Yes</button>
                                    <button onClick={()=> setShowDeleteConfirm(false)}>Cancel</button>
                                </div>
                            ) : (
                            <IconButton
                                size="small"
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDeleteConfirm(true);
                                }}
                            >
                                <DeleteIcon fontSize="medium" />
                            </IconButton>
                            )
                        }
                            
                        </div>
                    <Chip label={task.priority.toUpperCase()} color={getPriorityColor()} size="small" />
                </div>
            </div>
            <div className="info">
                {
                    task.description && (
                        <p className="description">{task.description}</p>
                    )
                }
                <div className="task-meta d-flex justify-content-between align-items-center gap-3">
                    <div className="tag-date-wrapper d-flex gap-3 align-items-center">
                        {
                            task.tagId && (
                                <span className="task-tag">
                                    {task.tagId.split("-").join(" ")}
                                </span>
                            )
                        }

                        {
                            task.dueDate && (
                                <span className={isOverdue ? "due-date overdue" : "due-date"}>
                                    <label>Due Date:</label> {task.dueDate}
                                </span>
                            )
                        }
                    </div>

                    <span className="avatar">
                                {task.assigneeId ? task.assigneeId.split("-").map((word) => word.charAt(0).toUpperCase()).join("") : "?"}
                    </span>
                </div>
            </div>
        </div>
    )
};

export default TaskCard;