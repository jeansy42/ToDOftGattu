import { host } from "../utils/config";
import { Task } from "../pages/NewTask";

export const createTaskRequest = async (task: Task) => {
  await fetch(`${host}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

export const updateTaskRequest = async (task: Task, id: number) => {
  await fetch(`${host}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
};

export const deleteTaskRequest = async (id: number) => {
  await fetch(`${host}/${id}`, { method: "DELETE" });
};

export const setStatusTaskRequest = async (id: number, status: boolean) => {
  await fetch(`${host}/status/${id}/${status}`, { method: "PUT" });
};

export const getAllTasksRequest = async (): Promise<Task[]> => {
  const res = await fetch(`${host}/all`);
  const data = await res.json();
  return data;
};

export const getTaskRequest = async (id: number): Promise<Task> => {
  const res = await fetch(`${host}/${id}`);
  const data = await res.json();
  return data;
};
