import type { Task } from "../types/task";

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    return(
        <div className="task-card">
            <h4>{task.title}</h4>
            <p>{task.priority}</p>
        </div>
    )
};

export default TaskCard;