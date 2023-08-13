import "./App.sass";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewTask from "./pages/NewTask";
import UpdateTask from "./pages/UpdateTask";
import { givePreviousInfoTask, tasksLoader } from "./utils/loaders";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "newtask",
    element: <NewTask />,
  },
  {
    path: "updatetask/:id",
    loader: async ({ params }) =>
      params.id !== undefined && givePreviousInfoTask(params.id),
    element: <UpdateTask />,
  },
  {
    path: "tasks",
    loader: async () => tasksLoader(),
    lazy: () => import("./pages/Tasks"),
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
