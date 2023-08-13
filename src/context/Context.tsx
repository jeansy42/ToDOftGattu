import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useReducer,
} from "react";
import { Task } from "../pages/NewTask";
import { TaskReducer } from "./TaskReducer";
export interface GlobalContextType {
  firstLetterToUpper: (param: string) => string;
  tasks: Task[];
  setInitialContent: (tasks: Task[]) => void;
  updateTaskStatus: (id: number) => void;
  deleteTask: (id: number) => void;
}

const context = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const utilContext = useContext(context);
  return utilContext;
};
function Context({ children }: { children: ReactNode }) {
  const initialState: Task[] = [];

  const [tasks, dispatch] = useReducer(TaskReducer, initialState);

  const setInitialContent = (tasks: Task[]) => {
    dispatch({ type: "NEW_CONTENT", payload: tasks });
  };

  const updateTaskStatus = (id: number) => {
    dispatch({ type: "SET_STATUS", id: id });
  };

  const deleteTask = (id: number) => {
    dispatch({ type: "DELETE", id: id });
  };

  const firstLetterToUpper = (param: string): string => {
    const toUperParam: string =
      param.slice(0, 1).toUpperCase() + param.slice(1);
    return toUperParam;
  };

  return (
    <context.Provider
      value={{
        firstLetterToUpper,
        tasks,
        setInitialContent,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default Context;
