import React from 'react'
import {createBrowserRouter,} from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import ProductList from '../pages/home/shop/ProductList';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
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
        path:"/shop",
        element:<ProductList/>
      },
     
    ],
  },
  {
      path:"/signup",
      element:<SignUp/>
  },
  {
    path:"/signin",
    element:<SignIn/>
}
]);

export default router;