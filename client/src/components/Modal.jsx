import React, { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";

const Modal = ({ name }) => {
  const { login, signUpWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate(); // เพิ่ม useNavigate
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        alert("Login Successful");
        document.getElementById(name).close();
        navigate("/"); // เปลี่ยนเส้นทางไปหน้าแรก
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googlesignUp = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("google sign up Successfully");
        document.getElementById("login").close();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <dialog
        id={name}
        className="modal modal-bottom sm:modal-middle text-black"
      >
        <div className="modal-box">
          <div className="modal-action mt-0 flex flex-col justify-center">
            <h3 className="font-bold text-lg text-center ">Please Login</h3>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required 
                  {...register("email")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required 
                  {...register("password")}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn bg-red text-white "
                />
              </div>
              <p className="text-center my-2">
                Don't have an account?{" "}
                <Link to={"/signup"} className="underline text-red ml-1">
                  Sign Up Now
                </Link>
              </p>
              <button
                htmlFor={name}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById(name).close()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 hover:text-red"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            <div className="text-center space-x-3 mb-5">
            <button
                htmlFor={name}
                className="btn btn-sm btn-circle hover:bg-red hover:text-white "
                onClick={() => document.getElementById(name).close()}
              ><FaGithub /></button>
            <button
                htmlFor={name}
                className="btn btn-sm btn-circle hover:bg-red hover:text-white "
                onClick={googlesignUp}
              > <FaGoogle /></button>
             <button
                htmlFor={name}
                className="btn btn-sm btn-circle hover:bg-red hover:text-white "
                onClick={() => document.getElementById(name).close()}
              ><FaFacebook /></button>

            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
