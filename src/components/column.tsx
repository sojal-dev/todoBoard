import type { Task } from "../types/task";
import TaskCard from "../components/taskCard"
import { Button } from "@mui/material";
import { useBoardStore } from "../store/boardStore";
import NoTaskImage  from "../assets/no-task.png";
import { useState } from "react";


interface ColumnProps {
    title: string;
    tasks: Task[];
    columnType: Task["column"];
}

const Column = ({ title, tasks, columnType }: ColumnProps) => {

    const [isDragOver, setIsDragOver] = useState(false);

    const allTasks = useBoardStore(
        (state) => state.tasks
    );

    const addTask = useBoardStore(
        (state) => state.addTask
    );

    const draggedTaskId = useBoardStore(
        (state) => state.draggedTaskId
    );

    const setDraggedTaskId = useBoardStore(
        (state) => state.setDraggedTaskId
    );

    const updateTask = useBoardStore(
        (state) => state.updateTask
    );
    
    return(
        <div className={`column ${isDragOver ? "drag-over" : ""}`} 
        onDragOver={(e) => {
            e.preventDefault();
            if(!isDragOver){
                setIsDragOver(true);
            }
        }}
        onDragLeave = {(e) => {
            const relatedTarget = e.relatedTarget as Node;
            if(!e.currentTarget.contains(
                relatedTarget
            )){
                setIsDragOver(false);
            }
        }}
        onDrop={() => {
            setIsDragOver(false);
            if(!draggedTaskId)
            return;
            const draggedTask = allTasks.find(
                (task) => task.id === draggedTaskId
            );
            if(
                draggedTask?.column === columnType
            ){
                setDraggedTaskId(null);
                return;
            }
            updateTask(
                draggedTaskId,
                { column: columnType }
            );
            setDraggedTaskId(null);
        }}>
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
                    tasks.length === 0 ? (
                        <div className="empty-text">
                            <img src={NoTaskImage} alt="No tasks found" />
                            <p>Oops! No tasks found</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard key={task.id} task={task}/>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default Column;
