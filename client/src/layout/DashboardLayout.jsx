import React from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Outlet } from "react-router-dom";

const isAdmin = true;
const DashboardLayout = () => {
  return (
    <div>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <MdDashboard />
              </label>

              <button className="btn btn-error sm:hidden flex items-center gap-2">
                <CiLogout />
                Logout
              </button>
            </div>
            <div className="mt-5 md-mt2 mx-4">
              Content
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} className="w-20" />
                  <div className="badge badge-privary bg-purple-700 text-black">Admin</div>
                </Link>
              </li>
              <hr />
              <li>
                <Link>
                  <MdDashboard />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link>
                  <FaRegClipboard />
                  Manage Order
                </Link>
              </li>
              <li>
                <Link>
                  <IoMdAdd />
                  Add Product
                </Link>
              </li>
              <li>
                <Link>
                  <FaEdit />
                  Manage Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <FaUserEdit />
                  All users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <Link
            to="/"
            className="btn btn-sx btn-error sm:btn-sm md:btn-md lg:btn-lg"
          >
            You are not admin ! Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;