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
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth?.user);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

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
    phone: "",
    role: "",
    isBlack: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log("check auth state", authState);

    if (authState) {
      setFormData({
        name: authState.name || "",
        email: authState.email || "",
        phone: authState.phone || "",
        bio: authState.bio || "",
      });
    }

    setProfileImage(authState?.profilePicture);
  }, [authState]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("bio", formData.bio);

    if (image) {
      console.log("check image", image);
      data.append("profilePicture", image);
    }

    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }
    console.log("updated data check", data);

    const result = await dispatch(
      updateUserAction(authState?._id, data, navigate),
    );
  };

  const role = authState?.role;

  return (
    <Fragment>
      <PageTitle activeMenu="Edit Profile" motherMenu="App" />
      <div className="row">
        {role === "user" && (
          <div className="col-xl-3 col-lg-4">
            <div className="clearfix">
              <div className="card  profile-card author-profile m-b30">
                <div className="card-body">
                  <div className="p-5">
                    <div className="author-profile">
                      <div className="author-media">
                        <img
                          src={`${imagePreview ? imagePreview : IMAGE_URl + profileImage} `}
                          alt="profileImg"
                        />
                        <div
                          className="upload-link"
                          title=""
                          data-toggle="tooltip"
                          data-placement="right"
                          data-original-title="update"
                        >
                          <input
                            type="file"
                            name="profilePicture"
                            className="update-flie"
                            onChange={handleImageChange}
                          />
                          <i className="fa fa-camera" />
                        </div>
                      </div>
                      <div className="author-info">
                        <h6 className="title"> {authState?.name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={
            role === "user" ? "col-xl-9 col-lg-8" : "col-xl-12 col-lg-12"
          }
        >
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

                  {role === "user" ? (
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="number"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ) : (
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
                  )}

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

                  {role !== "user" && (
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label">Bio</label>
                        <textarea
                          className="form-control"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
                {/* <Link
                  to="/page-forgot-password"
                  className="text-hover float-end"
                >
                  Forgot your password?
                </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default EditProfile;
