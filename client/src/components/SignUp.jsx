import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import Modal from "./Modal";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
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
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Account creted Successfilly");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="section-container flex items-center justify-center my-20">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <h3 className="font-bold text-lg text-center ">Create An Account</h3>

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
              value="Sing Up"
              className="btn bg-red text-white "
            />
          </div>
          <p className="text-center my-2">
            Have have account?{" "}
            <Link
              onClick={() => document.getElementById("login").showModal()}
              className="underline text-red ml-1"
            >
              Login
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
          <button className="btn btn-ghost btn-circle hover:bg-red">
            <FaGoogle />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red">
            <FaFacebook />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal name={"login"} />
    </div>
  );
};

export default SignUp;
