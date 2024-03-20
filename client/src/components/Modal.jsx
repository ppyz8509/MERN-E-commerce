import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";

const Modal = ({ name }) => {
  const { login, signUpWhiteGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        //console.log(user);
        document.getElementById(name).close();
          navigate(from, { replace: true });
        alert("Login Successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignUp = () => {
    signUpWhiteGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Google SigUp Successfully");
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
                <Link to={"/singup"} className="underline text-red ml-1">
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
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            <div className="text-center space-x-3 md-3">
              <button
                className="btn btn-ghost btn-circle hover:bg-red hover:text-white"
                onClick={googleSignUp}
              >
                <FaGoogle />
              </button>
              <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
                <FaFacebook />
              </button>
              <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
                <FaGithub />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
