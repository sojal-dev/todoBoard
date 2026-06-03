import { useBoardStore } from "../store/boardStore";
import Column from "./column";

const Board = () => {
  const tasks = useBoardStore(
    (state) => state.tasks
  );

  const backlogTasks = tasks.filter(
    (task) => task.column === "backlog"
  );

  const progressTasks = tasks.filter(
    (task) => task.column === "inProgress"
  );

  const doneTasks = tasks.filter(
    (task) => task.column === "done"
  )

  return (
    <div className="board">
      <Column title="Backlog" tasks={backlogTasks} />
      <Column title="In Progress" tasks={progressTasks} />
      <Column title="Done" tasks={doneTasks} />
    </div>
  );
};

export default Board;