import type { Task } from "../types/task";
import TaskCard from "../components/taskCard"
import { Button } from "@mui/material";
import { useBoardStore } from "../store/boardStore";


interface ColumnProps {
    title: string;
    tasks: Task[];
    columnType: Task["column"];
}

const Column = ({ title, tasks, columnType }: ColumnProps) => {

    const addTask = useBoardStore(
        (state) => state.addTask
    );

    return(
        <div className="column">
            <div className="column-header">
                <h3>
                    {title}
                    <span className="task-count">
                        ({tasks.length})
                    </span>
                </h3>
            </div>
            <Button variant="contained" fullWidth onClick={()=> addTask(columnType)} >Add Task</Button>
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
