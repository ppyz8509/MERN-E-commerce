import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";

const updatePorfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const { updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile({ name, photoURL })
      .then(() => {
        alert("Profile Updated!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="section-container flex items-center justify-center my-20">
      <div className="modal-action mt-0 flex flex-col justify-center shadow-2xl rounded-lg ">
        <h3 className="font-bold text-lg text-center ">Update Profile</h3>

        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="text"
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              required
              {...register("photoURL")}
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Update"
              className="btn bg-red text-white "
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default updatePorfile;
