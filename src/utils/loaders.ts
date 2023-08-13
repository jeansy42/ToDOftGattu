import { getAllTasksRequest, getTaskRequest } from "../api/task";
import { Task } from "../pages/NewTask";

export const tasksLoader = async () => {
  const data = await getAllTasksRequest();
  return data.reverse();
};

export const givePreviousInfoTask = async (
  id: string
): Promise<Task | void> => {
  const idNumber: number | undefined =
    id !== undefined ? parseInt(id) : undefined;
  if (idNumber !== undefined) {
    const dataPreviousTask = await getTaskRequest(idNumber);
    return dataPreviousTask;
  }
};
