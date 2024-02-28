import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../context/AuthProvider';
import { Link, useLocation, useNavigate } from "react-router-dom";


const UpdateProfile = () => {
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
      <div className="modal-action mt-0 flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg text-center">Update Profile</h3>

        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.firstName && <span className="text-error">First Name is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Picture URL</span>
            </label>
            <input
              type="text"
              placeholder="Profile Picture URL"
              className="input input-bordered"
              {...register("photoURL", { required: true })}
            />
            {errors.profilePictureUrl && <span className="text-error">Profile Picture URL is required</span>}
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Update Profile"
              className="btn bg-red text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
