import type { Task } from "../types/task";
import TaskCard from "../components/taskCard"
import { Button, Chip } from "@mui/material";

interface ColumnProps {
    title: string;
    tasks: Task[];
}

const Column = ({ title, tasks }: ColumnProps) => {
    return(
        <div className="column">
            <div className="column-header">
                <h3>{title}</h3>
                <Chip label={tasks.length} size="small" />
            </div>
            <Button variant="outlined" fullWidth >Add Task</Button>
            <div className="task-list">
                {
                    tasks.map((task) => (
                    <TaskCard key={task.id} task={task}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Column;  