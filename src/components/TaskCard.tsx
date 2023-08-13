import "./TaskCard.sass";
import { useNavigate } from "react-router-dom";
import {
  deleteTaskRequest,
  getTaskRequest,
  setStatusTaskRequest,
} from "../api/task";
import { GlobalContextType, useGlobalContext } from "../context/Context";
import { Task } from "../pages/NewTask";
import { useEffect, useRef, useState } from "react";

function TaskCard({ task }: { task: Task }) {
  const navigate = useNavigate();

  const updDelRef = useRef<HTMLDivElement>(null);
  const confCanRef = useRef<HTMLDivElement>(null);

  const okdate: string = task.dueDate.replace(/-/g, "/");
  const duedate = new Date(okdate).toDateString();

  const { updateTaskStatus, deleteTask, firstLetterToUpper } =
    useGlobalContext() as GlobalContextType;

  const uperStatus = firstLetterToUpper(task.status);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const modal = useRef<HTMLElement>(null);
  const openModal = () => setShowOptions(true);
  const closeModal = () => setShowOptions(false);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      !modal.current?.contains(e.target as Node) &&
      !updDelRef.current?.contains(e.target as Node) &&
      !confCanRef.current?.contains(e.target as Node)
    ) {
      closeModal();
      setConfirmDelete(false);
    }
  };

  const onChange = async () => {
    try {
      const status: boolean = task.status === "pending" || false;
      if (task.id !== undefined) {
        await setStatusTaskRequest(task.id, status);
        updateTaskStatus(task.id);
        setIsChecked(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (task.id !== undefined) {
        await deleteTaskRequest(task.id);
        deleteTask(task.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showOptions) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  useEffect(() => {
    setIsChecked(() => task.status === "completed" || false);
    const { id } = task;
    const waitData = async () => {
      if (id !== undefined) {
        const data = await getTaskRequest(id);
        console.log(data);
      }
    };
    waitData();
  }, [task.status]);

  return (
    <div className="taskCard">
      <label className={`checkbox__container ${isChecked ? "checked" : ""}`}>
        <input type="checkbox" onChange={onChange} checked={isChecked} />
      </label>
      <div className="task__main">
        <div className="taskCard__headerOptions-container">
          <div className={`taskCard__header ${task.status}`}>
            <h4>{task.title}</h4>
            <span className={task.status}>{uperStatus}</span>
          </div>
          <span
            ref={modal}
            className={`taskCard__options ${showOptions ? "hidden" : ""}`}
            onClick={openModal}
          ></span>
          {showOptions &&
            (!confirmDelete ? (
              <div ref={updDelRef} className="UpdDel">
                <span
                  onClick={() => navigate(`/updatetask/${task.id}/`)}
                  className="update"
                ></span>
                <span
                  className="delete"
                  onClick={() => setConfirmDelete(true)}
                ></span>
              </div>
            ) : (
              <div ref={confCanRef} className="confirm-delete__container">
                <span className="confirm" onClick={handleDelete}></span>
                <span
                  className="cancel"
                  onClick={() => setConfirmDelete(false)}
                ></span>
              </div>
            ))}
        </div>
        <div className={`taskCard__duedate ${task.status}`}>
          <span className="calendar"></span>
          <span>{duedate}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
