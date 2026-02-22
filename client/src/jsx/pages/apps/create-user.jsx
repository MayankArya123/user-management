const IMAGE_URl = import.meta.env.VITE_API_URL;
import { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import { IMAGES } from "../../constant/theme";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserAction } from "../../../store/actions/AuthActions";
import axios from "axios";
import { createUser } from "../../../services/UserService";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth?.user);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log("check auth state", authState);

    setProfileImage(authState?.profilePicture);
  }, [authState]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    console.log("create user hitting");

    const response = await createUser(formData);

    console.log("response from create user", response);

    if (response?.status === 201) {
      alert("user created");
      return navigate("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Edit Profile" motherMenu="App" />
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card profile-card m-b30">
            <div className="card-header">
              <h4 className="card-title">Account setup</h4>
            </div>
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="Name">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        name="role"
                        className="col-sm-12 form-control"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="Email">
                        Email address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <textarea
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  SUBMIT
                </button>
                <Link
                  to="/page-forgot-password"
                  className="text-hover float-end"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default CreateUser;
