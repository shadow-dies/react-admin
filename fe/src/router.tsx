/* eslint-disable react-hooks/rules-of-hooks */
import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import System from "./pages/System";
import List from "./pages/List";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Person from "./pages/Person";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Navigate to = "login"/>
  },
  {
    path: "/login",
    element:<Login ></Login>
  },
  {
    path:"/index",
    element: <System />,
    children: [
      {
        path:"admin",
        element: <List />
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path:"person/:key",
        element: <Person></Person>
      }
    ]
  },
  

]);
export default router;