import "./Tasks.sass";
import { useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TaskCard from "../components/TaskCard";
import { Task } from "./NewTask";
import { GlobalContextType, useGlobalContext } from "../context/Context";
import NavBar from "../components/NavBar";
import {
  filterByComplete,
  filterByMonth,
  filterByToday,
  filterByUnComplete,
  filterByYear,
} from "../utils/filters";

export function Component() {
  const [foundTask, setFoundTask] = useState<Task[]>([]);
  const [taskToFind, setTaskToFind] = useState<string>("");
  const [filterby, setFilterby] = useState<string>("Completed");
  const [showfilter, setShowfilter] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState("all");

  const { tasks, setInitialContent } = useGlobalContext() as GlobalContextType;

  const [tasksToShow, setTasksToShow] = useState<Task[]>(tasks);

  const filterRef = useRef<HTMLDivElement>(null);
  const filterOptionsRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(0);

  const allRef = useRef<HTMLLIElement>(null);
  const completedRef = useRef<HTMLLIElement>(null);
  const unCompletedRef = useRef<HTMLLIElement>(null);
  const todayRef = useRef<HTMLLIElement>(null);
  const monthRef = useRef<HTMLLIElement>(null);
  const yearRef = useRef<HTMLLIElement>(null);

  const arrayRefs = [
    allRef,
    completedRef,
    unCompletedRef,
    todayRef,
    monthRef,
    yearRef,
  ];

  const data = useLoaderData() as Task[];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskToFind(e.target.value);

  const handleClickOuside = (e: MouseEvent) => {
    if (
      !filterRef.current?.contains(e.target as Node) &&
      !filterOptionsRef.current?.contains(e.target as Node)
    )
      setShowfilter(false);
  };

  useEffect(() => {
    if (taskToFind !== "") {
      const obj = tasks.filter((task) =>
        task.title.toLowerCase().includes(taskToFind.toLowerCase())
      );
      setFoundTask(obj);
    } else if (taskToFind === "") setFoundTask([]);
  }, [taskToFind]);

  useEffect(() => {
    setInitialContent(data);
  }, []);

  useEffect(() => {
    if (showfilter) {
      document.addEventListener("click", handleClickOuside);
      return () => document.removeEventListener("click", handleClickOuside);
    }
  }, [showfilter]);

  useEffect(() => {
    if (countRef.current !== 0)
      for (const e of arrayRefs) {
        e.current?.className === currentFilter
          ? e.current?.classList.add("active")
          : e.current?.classList.remove("active");
      }
    countRef.current++;
  }, [currentFilter]);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setTasksToShow(tasks);
        break;
      case "completed":
        setTasksToShow(filterByComplete(tasks));
        break;
      case "uncompleted":
        setTasksToShow(filterByUnComplete(tasks));
        break;
      case "today":
        setTasksToShow(filterByToday(tasks));
        break;
      case "month":
        setTasksToShow(filterByMonth(tasks));
        break;
      case "year":
        setTasksToShow(filterByYear(tasks));
        break;
      default:
        break;
    }
  }, [tasks, currentFilter]);

  return (
    <div>
      <NavBar />
      <div className="global__container">
        <div className="tasks__header">
          <div className="task__header-title">
            <h3>Welcome to Tasks</h3>
            <h5>Have a great day !</h5>
          </div>
          <span className="userIcon"></span>
        </div>
        <div className="tasks__top">
          <input
            className="search"
            onInput={handleInput}
            type="text"
            placeholder="Search task"
          />

          {foundTask.length > 0
            ? foundTask.map((task) => <TaskCard key={task.id} task={task} />)
            : taskToFind.length > 0 && <p className="noResult">No results</p>}

          <div className="tasks__filter">
            <h5>My Tasks</h5>
            <div
              ref={filterRef}
              className="filter"
              onClick={() => setShowfilter(true)}
            >
              <span>Filter by</span>
              <div className="currentFilterOptions__container">
                <span
                  className={`current__filter ${showfilter ? "active" : ""}`}
                >
                  {filterby}
                </span>
                {showfilter && (
                  <div className="filter__options-container">
                    <div ref={filterOptionsRef} className="filter__options">
                      <span
                        className={`${
                          filterby === "Completed" ? "active" : ""
                        }`}
                        onClick={(e: React.MouseEvent) => {
                          setFilterby("Completed");
                          setCurrentFilter("all");
                          setShowfilter(false);
                          e.stopPropagation();
                        }}
                      >
                        Completed
                      </span>
                      <span
                        className={`${filterby === "Date" ? "active" : ""}`}
                        onClick={(e: React.MouseEvent) => {
                          setFilterby("Date");
                          setCurrentFilter("today");
                          setShowfilter(false);
                          e.stopPropagation();
                        }}
                      >
                        Date
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {filterby === "Completed" && (
            <ul className="filter__status">
              <li
                className="all"
                ref={allRef}
                onClick={() => setCurrentFilter("all")}
              >
                All
              </li>
              <li
                className="completed"
                ref={completedRef}
                onClick={() => setCurrentFilter("completed")}
              >
                Complete
              </li>
              <li
                className="uncompleted"
                ref={unCompletedRef}
                onClick={() => setCurrentFilter("uncompleted")}
              >
                Uncomplete
              </li>
            </ul>
          )}

          {filterby === "Date" && (
            <ul className="filter__status">
              <li
                className="today"
                ref={todayRef}
                onClick={() => setCurrentFilter("today")}
              >
                Today´s Task
              </li>
              <li
                className="month"
                ref={monthRef}
                onClick={() => setCurrentFilter("month")}
              >
                Monthly Task
              </li>
              <li
                className="year"
                ref={yearRef}
                onClick={() => setCurrentFilter("year")}
              >
                Yearly Task
              </li>
            </ul>
          )}
        </div>

        <div className="tasks__container">
          {tasksToShow.length > 0 ? (
            tasksToShow.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <p className="noTasks">No tasks yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
