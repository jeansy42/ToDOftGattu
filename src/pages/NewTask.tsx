import "./NewTask.sass";
import { useForm, SubmitHandler } from "react-hook-form";
import { GlobalContextType, useGlobalContext } from "../context/Context";
import { createTaskRequest } from "../api/task";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export interface Task {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  id?: number;
}
function NewTask() {
  const { firstLetterToUpper } = useGlobalContext() as GlobalContextType;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>();

  const onSubmit: SubmitHandler<Task> = async ({
    title,
    description,
    dueDate,
  }) => {
    const okTitle = firstLetterToUpper(title);
    const okDescription = firstLetterToUpper(description);
    const task: Task = {
      title: okTitle,
      description: okDescription,
      status: "pending",
      dueDate,
    };
    console.log(task);
    try {
      await createTaskRequest(task);
      navigate("/tasks/");
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <div>
      <NavBar />
      <form className="newTask__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__title">
          <h4>Creat New Task</h4>
          <span className="userIcon"></span>
        </div>
        {/*Title */}
        <div className="title__container">
          <label htmlFor="title">Title</label>
          <input
            className="newTask__input"
            type="text"
            id="title"
            placeholder="Introduce the task's title"
            {...register("title", {
              required: { value: true, message: "Title is required" },
              minLength: {
                value: 3,
                message: "Title must have at least 3 characters!",
              },
              maxLength: {
                value: 30,
                message: "Title must have a maximun of 30 characters!",
              },
            })}
          />
        </div>
        {errors.title && <span className="error">{errors.title.message}</span>}
        {/*Description */}
        <div className="description__container">
          <label htmlFor="description">Add Details</label>
          <textarea
            className="newTask__input"
            id="description"
            placeholder="Introduce some description"
            {...register("description", {
              required: { value: true, message: "Description is required! " },
              minLength: {
                value: 10,
                message: "Description must have at least 10 characters!",
              },
              maxLength: {
                value: 200,
                message: "Description  must have a maximum of 200 characters!",
              },
            })}
          ></textarea>
        </div>
        {errors.description && (
          <span className="error">{errors.description.message}</span>
        )}
        {/*Duedate */}
        <div className="duedate__container">
          <label htmlFor="duedate">Due date</label>
          <input
            className="newTask__input"
            type="date"
            id="duedate"
            {...register("dueDate", {
              required: { value: true, message: "Due date is required" },
              pattern: {
                value: /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/,
                message: "Invalide date",
              },
              validate: (value) => {
                const okFormatDate = value.replace(/-/g, "/");
                const userDate = new Date(okFormatDate);
                const resetDay = new Date().toDateString();
                const today = new Date(resetDay);
                return userDate >= today || "The date must by in the future";
              },
            })}
          />
        </div>
        {errors.dueDate && (
          <span className="error">{errors.dueDate.message}</span>
        )}
        <div className="buttons__container">
          <button className="send" type="submit"></button>
        </div>
      </form>
    </div>
  );
}

export default NewTask;
