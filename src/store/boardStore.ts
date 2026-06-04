import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task } from "../types/task";
import { todoTasks } from "../utils/todoTasks";

interface BoardStore {
  tasks: Task[];
  addTask: (column: Task["column"]) => void;
  deleteTask: (id: string) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      tasks: todoTasks,

      addTask: (column) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title: "New Task",
              description: "",
              priority: "medium",
              column,
              order: state.tasks.length,
            },
          ],
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: "todoBoard-storage",
    }
  )
);