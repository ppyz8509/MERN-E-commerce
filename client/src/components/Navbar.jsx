import React from "react";

const Navbar = () => {
  const navItems = (
    <>
      <li className="mb-2">
        <a className="text-neutral">Home</a>
      </li>
      <li tabIndex={0} className="mb-4">
  <details>
    <summary className="text-neutral">Category</summary>
    <ul className="p-2 text-neutral">
      <li>
        <a>All</a>
      </li>
      <li>
        <a>Clothing</a>
      </li>
      <li>
        <a>Accessories</a>
      </li>
      <li>
        <a>Gadget</a>
      </li>
      <li>
        <a>Swag</a>
      </li>
    </ul>
  </details>
</li>
<li tabIndex={0} className="mb-4">
  <details>
    <summary className="text-neutral">Service</summary>
    <ul className="p-2 text-neutral">
      <li>
        <a>Order Online</a>
      </li>
      <li>
        <a>Order Tracking</a>
      </li>
    </ul>
  </details>
</li>
      <li>
        <a className="text-neutral">Promotion</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div>
        <div className="navbar bg-base-100 text-neutral-content rounded-b-lg shadow-xl">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl text-black" href="/">
              {" "}
              <img src="/logo.png" alt="" className="h-12 pr-1 mx-auto" />
              SE Souvenir Shop
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 ">{navItems}</ul>
          </div>
          <div className="navbar-end">
          <button className="btn btn-ghost btn-circle hidden lg:flex mr-3 items-center justify-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hidden lg:flex text-black"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item ">8</span>
              </div>
            </div>
            <a className="btn bg-red rounded-full px-5 text-white flex items-center gap-2  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
              </svg>
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
