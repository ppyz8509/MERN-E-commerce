import React from "react";

const Navbar = () => {
  const navItems = (
    <>
      <li className="py-2">
        <a className="text-grey">Home</a>
      </li>
      <li tabIndex={0} className="py-2">
        <details>
          <summary className="text-grey">Category</summary>
          <ul className="p-2 text-#7E7E7E">
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
      <li tabIndex={0} className="py-2">
        <details>
          <summary className="text-grey">Service</summary>
          <ul className="p-2 text-#7E7E7E">
            <li>
              <a>Order Online</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li className="py-2">
        <a className="text-grey">Promotion</a>
      </li>
    </>
  );
  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div>
        <div className="navbar bg-neutral text-neutral-content rounded-xl shadow-lg">
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl" href="/">
              {" "}
              <img src="/logo.png" alt="" className="h-12 pr-1 mx-auto" />
              SE Souvenir Shop
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 ">{navItems}</ul>
          </div>
          <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
            <a className="btn bg-red text-white">Button</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
