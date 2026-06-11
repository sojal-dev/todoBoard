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
    const [isDragging, setIsDragging] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    

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

    const setSelectedTask = useBoardStore(
        (state) => state.setSelectedTask
    );

    const setDraggedTaskId = useBoardStore(
        (state) => state.setDraggedTaskId
    );

    const updateTask = useBoardStore(
        (state) => state.updateTask
    );

    const saveTitle = () => {
        if (!editTitle.trim()) {
            setEditTitle(task.title);
            setIsEditing(false);
            return;
        }

        updateTask(task.id, {
            title: editTitle.trim(),
        });

        setIsEditing(false);
    };
    
    const setLastDeletedTask = useBoardStore(
        (state) => state.setLastDeletedTask
    );

    const setToast = useBoardStore(
        (state) => state.setToast
    );

    const setToastType = useBoardStore(
        (state) => state.setToastType
    );


    // console.log(selectedTaskId);
    // console.log(task.assigneeId)



    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();


    return(
        <div className={`task-card ${isDragging ? "dragging" : ""}`} onClick={()=> setSelectedTask(task.id)} draggable 
        onDragStart={()=> {
            setDraggedTaskId(task.id);
            setIsDragging(true);
        }}
        onDragEnd={() => {
            setIsDragging(false);
            setDraggedTaskId(null);
            }}>
            <div className="d-flex gap-2 align-items-center justify-content-between">
                {
                    isEditing ? (
                        <input
                            autoFocus
                            value={editTitle}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            onChange={(e) =>
                                setEditTitle(e.target.value)
                            }
                            onBlur={saveTitle}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    saveTitle();
                                }
                            }}
                            className="value-edit"
                        />
                    ) : (
                        <h4 className="mb-0" 
                        onClick={(e) => e.stopPropagation()}
                        onDoubleClick={(e) => {
                            e.stopPropagation();    
                            setEditTitle(task.title);
                            setIsEditing(true);}}>{task.title}</h4>
                    )
                }
                <div className="d-flex gap-3 align-items-center">
                    <div className="delete-btn">
                        {
                            showDeleteConfirm ? (
                                <div className="delete-confirm d-flex gap-2 align-items-center" onClick={(e) => e.stopPropagation()}>
                                    <span>Delete?</span>
                                    <button className="green" onClick={()=> {
                                        setLastDeletedTask(task);
                                        deleteTask(task.id);
                                        setToast("Task Deleted");
                                        setToastType("delete");
                                        setShowDeleteConfirm(false);
                                        }}>Yes</button>
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