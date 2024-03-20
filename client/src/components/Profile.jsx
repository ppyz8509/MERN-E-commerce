import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { onIdTokenChanged } from "firebase/auth";

const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout()
      .then(() => {
        alert("Logout !");
        navigate("/");
      })
      .catch(error);
    console.log(error);
  };

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user?.photoURL ? (
                <img alt="User Photo Profile" src={user?.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://th.bing.com/th/id/R.190ec45e85a736714a81a796bd48a8ad?rik=UuYYrZ5Q1RLm9A&pid=ImgRaw&r=0"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a>Orders</a>
            </li>
            <li>
              <a>Setting</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
