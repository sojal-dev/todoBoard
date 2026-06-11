import { Alert, Snackbar } from "@mui/material";
import { useBoardStore } from "../store/boardStore";
import Column from "./column";
import TaskPanel from "./TaskPanel";

const Board = () => {
  const tasks = useBoardStore(
    (state) => state.tasks
  );

  const searchTerm = useBoardStore(
    (state) => state.searchTerm
  );

  const priorityFilter = useBoardStore(
      (state) => state.priorityFilter
  );

  const assigneeFilter = useBoardStore(
    (state) => state.assigneeFilter
  );

  const tagFilter = useBoardStore(
    (state) => state.tagFilter
  )

  const sortBy = useBoardStore(
    (state) => state.sortBy
  );

  const filteredTasks = tasks
  .filter(
    (task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((task) => {
      if(!priorityFilter)
        return true;

      return(
        task.priority === priorityFilter
      );
    })
    .filter((task) => {
      if(!assigneeFilter)
        return true;

      return(
        task.assigneeId === assigneeFilter
      )
    })
    .filter((task) => {
      if(!tagFilter)
        return true;

      return(
        task.tagId === tagFilter
      )
    })

    const sortedTasks = [...filteredTasks];

    if(sortBy === "priority"){
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      sortedTasks.sort(
        (a,b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    }

    if (sortBy === "dueDate") {
        sortedTasks.sort(
            (a, b) =>
                new Date(
                    a.dueDate || "9999-12-31"
                ).getTime()
                -
                new Date(
                    b.dueDate || "9999-12-31"
                ).getTime()
        );
    }

  const backlogTasks = sortedTasks.filter(
    (task) => task.column === "backlog"
  );

  const progressTasks = sortedTasks.filter(
    (task) => task.column === "inProgress"
  );

  const doneTasks = sortedTasks.filter(
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

  const restoreTask = useBoardStore(
    (state) => state.restoreTask
  );

  const lastDeletedTask = useBoardStore(
    (state) => state.lastDeletedTask
  );

  const toastType = useBoardStore(
    (state) => state.toastType
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
        autoHideDuration={8000}
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
          action={
            toastType === "delete" &&
            lastDeletedTask && (
              <button onClick={() => {
                restoreTask();
                closeToast();
              }} >UNDO</button>
            )
          }
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Board;