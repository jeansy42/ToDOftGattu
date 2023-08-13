import "./Dashboard.sass";
import dashboard_img from "../assets/images/checklist-1295319.svg";
import { Link, useNavigation } from "react-router-dom";
function Dashboard() {
  const navegation = useNavigation();
  return (
    <div>
      <div className="img__container">
        <img src={dashboard_img} alt="Task List img" />
      </div>
      <div className="sub__image">
        <h2>Manage Your Daily TODO</h2>
        {navegation.state !== "idle" && <h2>LOADING PLEASE WAIT.....</h2>}
        <p>
          Simplify your life using our todo list dashboard. Stay on top of
          tasks, set due dates, and watch your productivity soar. Take charge of
          your schedule and conquer your to-dos effortlessly. Get started now!"
        </p>
        <div className="btns__container">
          <Link to={"/newtask/"}>
            <button className="newTask">Create A Task</button>
          </Link>
          <Link to={"/tasks/"}>
            <button className="viewTask">View Tasks</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
