import { Task } from "../pages/NewTask";

export type Action =
  | { type: "DELETE"; id: number }
  | { type: "SET_STATUS"; id: number }
  | { type: "NEW_CONTENT"; payload: Task[] };


