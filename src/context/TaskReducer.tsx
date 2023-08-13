import { Task } from "../pages/NewTask";
import { Action } from "../utils/types";

export const TaskReducer = (state: Task[], action: Action) => {
  switch (action.type) {
    case "SET_STATUS": {
      const tasksUpdatedStatus = state.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            status: task.status === "completed" ? "pending" : "completed",
          };
        } else return task;
      });
      return tasksUpdatedStatus;
    }
    case "DELETE": {
      const tasksAfterDelete = state.filter((task) => task.id !== action.id);
      return tasksAfterDelete;
    }
    case "NEW_CONTENT": {
      return action.payload;
    }
    default:
      return state;
  }
};
