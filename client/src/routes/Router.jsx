import React from 'react'
import {createBrowserRouter,} from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import ProductList from '../pages/home/shop/ProductList';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import UpdateProfile from '../pages/home/dashboard/UpdateProfile';
import PrivateRouter from '../PrivateRouter/PrivateRouter';
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
        element:(
          <PrivateRouter>
           <ProductList/>
          </PrivateRouter>
        ),
      },
      {
        path:"/update-profile",
        element:<UpdateProfile/>
      }
    ],
  },
  {
      path:"/signin",
      element:<SignIn/>
  },
  {
    path:"/signup",
    element:<SignUp/>
}
]);

export default router;