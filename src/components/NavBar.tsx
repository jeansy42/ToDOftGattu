import "./NavBar.sass";
import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <nav>
      <NavLink className={"nav__tasks nav__element"} to={"/tasks/"}></NavLink>
      <NavLink className={"nav__home nav__element"} to={"/"}></NavLink>
      <NavLink
        className={"nav__newtasks nav__element"}
        to={"/newtask/"}
      ></NavLink>
    </nav>
  );
}

export default NavBar;
