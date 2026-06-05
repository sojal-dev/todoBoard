import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task } from "../types/task";
import { todoTasks } from "../utils/todoTasks";

interface BoardStore {
  tasks: Task[];
  addTask: (column: Task["column"]) => void;
  deleteTask: (id: string) => void;
  selectedTaskId: string | null;
  setSelectedTask: (id: string | null) => void;
  updateTask: (
    id: string,
    updates: Partial<Task>
  ) => void;
  toastMessage: string;
  showToast: boolean;
  setToast: (message: string) => void;
  closeToast: ()=> void;
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

      selectedTaskId: null,

      setSelectedTask: (id) => set({
        selectedTaskId: id,
      }),

      updateTask: (id, updates) => 
        set((state) => ({
          tasks: state.tasks.map((task) => 
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
            toastMessage: "",
            showToast: false,
            setToast: (message) => set({
              toastMessage: message,
              showToast: true,
            }),

            closeToast: () => set({
              showToast: false,
            }),
            }),
    {
      name: "todoBoard-storage",
    }
  )
);