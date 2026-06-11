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
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  assigneeFilter: string;
  setAssigneeFilter: (value: string) => void;
  tagFilter: string;
  setTagFilter: (value: string) => void;
  clearFilters: () => void;
  draggedTaskId: string | null;
  setDraggedTaskId: (id: string | null) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  lastDeletedTask: Task | null;
  setLastDeletedTask: (task: Task | null) => void;
  restoreTask: () => void;
  toastType: string;
  setToastType: (type: string) => void;
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
              lastDeletedTask: null,
              toastType: "",
            }),

            searchTerm: "",
            setSearchTerm: (value) => set({
              searchTerm: value,
            }),

            priorityFilter: "",
            setPriorityFilter: (value) => set({
              priorityFilter: value,
            }),

            assigneeFilter: "",
            setAssigneeFilter: (value) => set({
              assigneeFilter: value,
            }),

            tagFilter: "",
            setTagFilter: (value) => set({
              tagFilter: value,
            }),

            clearFilters: () => set({
              priorityFilter: "",
              assigneeFilter: "",
              tagFilter: "",
              searchTerm: "",
              sortBy: "default",
            }),

            draggedTaskId: null,
            setDraggedTaskId: (id) => set({
              draggedTaskId: id,
            }),

            sortBy: "default",
            setSortBy: (value) => set({
              sortBy: value,
            }),

            lastDeletedTask: null,
            setLastDeletedTask: (task) => set({
              lastDeletedTask: task,
            }),
            restoreTask: () => 
              set((state) => {
                if(!state.lastDeletedTask)
                  return {};

                return{
                  tasks: [
                    ...state.tasks,
                    state.lastDeletedTask,
                  ],
                  lastDeletedTask: null,
                };
              }),
              toastType: "",
              setToastType: (type) => set({
                toastType: type
              }),
    }),
    {
      name: "todoBoard-storage",
    }
  )
);