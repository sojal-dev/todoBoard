import type { Task } from "../types/task";

export const todoTasks: Task[] = [
  {
    id: "1",
    title: "Create Login Page",
    description: "",
    priority: "high",
    column: "backlog",
    order: 0,
  },
  {
    id: "2",
    title: "Setup Dashboard",
    description: "",
    priority: "medium",
    column: "inProgress",
    order: 1,
  },
  {
    id: "3",
    title: "Fix Navbar",
    description: "",
    priority: "low",
    column: "done",
    order: 2
  },
];