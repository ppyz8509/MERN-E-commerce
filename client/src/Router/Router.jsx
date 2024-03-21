import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/home/Home";
import ProductList from "../pages/Shop/ProductList";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UpdatePofile from "../Pages/dashboard/updateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Cart from "../Pages/Shop/Cart";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard"
import User from "../pages/dashboard/admin/User";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: (
          <PrivateRouter>
            <ProductList />
          </PrivateRouter>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/update-profile",
        element: <UpdatePofile />,
      },
    ],
  },
  {
    path: "dashboard",
    element:  <DashboardLayout />,
    children: [{ path: "users", element: <User /> },
  {path:"",
element:<Dashboard/>}],
  },
  {
    path: "/singup",
    element: <SignUp />,
  },
  {
    path: "/singin",
    element: <SignIn />,
  },
]);

export default router;