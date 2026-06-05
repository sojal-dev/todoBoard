import { Alert, Snackbar } from "@mui/material";
import { useBoardStore } from "../store/boardStore";
import Column from "./column";
import TaskPanel from "./TaskPanel";

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
  );

  const showToast = useBoardStore(
    (state) => state.showToast
  );

  const toastMessage = useBoardStore(
    (state) => state.toastMessage
  );

  const closeToast = useBoardStore(
    (state) => state.closeToast
  );


  return (
    <>
      <TaskPanel />
      <div className="board">
        <Column title="Backlog" tasks={backlogTasks} columnType="backlog"/>
        <Column title="In Progress" tasks={progressTasks} columnType="inProgress"/>
        <Column title="Done" tasks={doneTasks} columnType="done"/>
      </div>
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={closeToast}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={closeToast}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Board;