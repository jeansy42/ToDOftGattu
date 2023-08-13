import { Task } from "../pages/NewTask";

const giveCurrentDate = () => {
  const dateToday = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");
  return dateToday;
};

export const filterByComplete = (tasks: Task[]): Task[] => {
  const tasksByComplete = tasks.filter((task) => task.status === "completed");
  return tasksByComplete;
};
export const filterByUnComplete = (tasks: Task[]): Task[] => {
  const tasksByComplete = tasks.filter((task) => task.status === "pending");
  return tasksByComplete;
};

export const filterByToday = (tasks: Task[]): Task[] => {
  const tasksToday = tasks.filter((task) => {
    const taskDate = task.dueDate.split("-");
    const taskDay = taskDate[2];
    const taskMonth = taskDate[1];
    const taskYear = taskDate[0];

    const dateToday = giveCurrentDate();
    const currentDay = dateToday[1];
    const currentMonth = dateToday[0];
    const currentYear = dateToday[2];

    return (
      taskDay === currentDay &&
      taskMonth === currentMonth &&
      taskYear === currentYear
    );
  });
  return tasksToday;
};
export const filterByMonth = (tasks: Task[]): Task[] => {
  const tasksMonth = tasks.filter((task) => {
    const taskDate = task.dueDate.split("-");

    const taskMonth = taskDate[1];
    const taskYear = taskDate[0];

    const dateToday = giveCurrentDate();
    const currentMonth = dateToday[0];
    const currentYear = dateToday[2];

    return taskMonth === currentMonth && taskYear === currentYear;
  });
  return tasksMonth;
};
export const filterByYear = (tasks: Task[]): Task[] => {
  const tasksYear = tasks.filter((task) => {
    const taskDate = task.dueDate.split("-");
    const taskYear = taskDate[0];

    const dateToday = giveCurrentDate();
    const currentYear = dateToday[2];

    return taskYear === currentYear;
  });
  return tasksYear;
};
