import { useBoardStore } from "../store/boardStore";
import { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [tagId, setTagId] = useState("");

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
  };

  return (
    <div className="task-detail-panel">
      <h2>Task Details</h2>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        margin="normal"
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        margin="normal"
      />
      <TextField
        select
        fullWidth
        label="Priority"
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as
              | "low"
              | "medium"
              | "high"
          )
        }
        margin="normal"
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
      </TextField>

        <label>Due Date</label>
      <TextField
        fullWidth
        type="date"
        label="Due Date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(
            e.target.value
          )
        }
        margin="normal"
      />

      <TextField
        select
        fullWidth
        label="Assignee"
        value={assigneeId}
        onChange={(e) =>
          setAssigneeId(
            e.target.value
          )
        }
        margin="normal"
      >
        <MenuItem value="john">
          Sojal
        </MenuItem>

        <MenuItem value="sarah">
          Harsh
        </MenuItem>

        <MenuItem value="alex">
          Rishi
        </MenuItem>
      </TextField>

      <TextField
        select
        fullWidth
        label="Tag"
        value={tagId}
        onChange={(e) =>
          setTagId(
            e.target.value
          )
        }
        margin="normal"
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

        <MenuItem value="bug">
          Client Dependency
        </MenuItem>
      </TextField>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default TaskPanel;