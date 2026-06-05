import { useBoardStore } from "../store/boardStore";
import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, FormControl, Select, Snackbar, Alert } from "@mui/material";

const TaskPanel = () => {
  const tasks = useBoardStore(
    (state) => state.tasks
  );

  const selectedTaskId = useBoardStore(
    (state) => state.selectedTaskId
  );

  const updateTask = useBoardStore(
    (state) => state.updateTask
  );

  const selectedTask = tasks.find(
    (task) => task.id === selectedTaskId
  );

  const setSelectedTask = useBoardStore(
    (state) => state.setSelectedTask
  );

  const setToast = useBoardStore(
    (state) => state.setToast
  );


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [tagId, setTagId] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);

    useEffect(()=> {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                handleClose();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return() => window.removeEventListener(
            "keydown",
            handleKeyDown
        );

    }, [isChange]);

  useEffect(() => {
    if (!selectedTask) 
        return;

    setTitle(selectedTask.title);
    setDescription(selectedTask.description);
    setPriority(selectedTask.priority);
    setDueDate(selectedTask.dueDate || "");
    setAssigneeId(selectedTask.assigneeId || "");
    setTagId(selectedTask.tagId || "");
  }, [selectedTask]);

  if (!selectedTask) {
    return null;
  }

  const handleSave = () => {
    updateTask(selectedTask.id, {
      title,
      description,
      priority,
      dueDate,
      assigneeId,
      tagId,
    });
    setIsChange(false);
    setToast("Task Updated Successfully");
    setSelectedTask(null);
  };

  const handleClose = () => {
    if(isChange && !window.confirm("You have unsaved changes. Close anyway?")){
        return;
    }
    setSelectedTask(null);
  };



  return (
    <>
    <div className="task-detail-panel-wrapper">
        <div className="task-panel-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Task Details</h2>
            <button className="close-btn" onClick={handleClose}>✕</button>
        </div>
        <div className="task-detail-panel mt-4">
        <div className="fields">
            <label>Title</label>
            <TextField
                fullWidth
                value={title}
                onChange={(e) =>{
                setTitle(e.target.value);
                setIsChange(true)
                }}
                margin="normal"
            />
        </div>
        <div className="fields">
            <label>Description</label>
            <TextField
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) =>{
                setDescription(
                    e.target.value
                )
                setIsChange(true)
                }}
                margin="normal"
            />
        </div>
        <div className="fields">
            <label>Priority</label>

            <FormControl fullWidth>
                <Select
                value={priority}
                onChange={(e) =>{
                    setPriority(
                    e.target.value as
                        | "low"
                        | "medium"
                        | "high"
                    )
                setIsChange(true)
                }}
                >
                <MenuItem value="low">
                    Low
                </MenuItem>

                <MenuItem value="medium">
                    Medium
                </MenuItem>

                <MenuItem value="high">
                    High
                </MenuItem>
                </Select>
            </FormControl>
            </div>
        <div className="fields">
            <label>Due Date</label>
            <TextField
                fullWidth
                type="date"
                value={dueDate}
                onChange={(e) =>{
                setDueDate(
                    e.target.value
                )
                setIsChange(true)
                }}
                margin="normal"
            />
        </div>
        <div className="fields">
            <label>Assignee</label>

            <FormControl fullWidth>
                <Select
                value={assigneeId}
                onChange={(e) => {
                    setAssigneeId(
                    e.target.value
                    )
                setIsChange(true)
                }}
                >
                <MenuItem value="sojal-saini">
                    Sojal Saini
                </MenuItem>

                <MenuItem value="harsh-dhiman">
                    Harsh Dhiman
                </MenuItem>

                <MenuItem value="rishi-saini">
                    Rishi Saini
                </MenuItem>
                </Select>
            </FormControl>
            </div>
            <div className="fields">
                <label>Tag</label>

                <FormControl fullWidth>
                    <Select
                    value={tagId}
                    onChange={(e) => {
                        setTagId(
                        e.target.value
                        )
                        setIsChange(true)
                    }}
                    >
                    <MenuItem value="frontend">
                        Frontend
                    </MenuItem>

                    <MenuItem value="backend">
                        Backend
                    </MenuItem>

                    <MenuItem value="bug">
                        Bug
                    </MenuItem>

                    <MenuItem value="client-dependency">
                        Client Dependency
                    </MenuItem>
                    </Select>
                </FormControl>
                </div>
        <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSave}
        >
            Save Changes
        </Button>
        </div>
    </div>
    </>
  );
};

export default TaskPanel;