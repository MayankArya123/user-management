import { Fragment, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../services/UserService";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePassword() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const [openEyes1, setOpenEyes1] = useState(true);
  const [openEyes2, setOpenEyes2] = useState(true);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const changePasswordTrigger = async () => {
    try {
      const response = await changePassword(passwordData);

      if (response?.status === 200) {
        toast.success("password changed successfully");
        return navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage = err.response.data.message;
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    changePasswordTrigger();
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Change Password" motherMenu="App" />

      <div className="row">
        <div className="col-xl-6 col-lg-8 m-auto">
          <div className="card profile-card m-b30">
            <div className="card-header">
              <h4 className="card-title"> Change Password</h4>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3 position-relative">
                  <label className="form-label">New Password</label>
                  <input
                    type={openEyes1 ? "password" : "text"}
                    className="form-control"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={() => setOpenEyes1(!openEyes1)}
                    style={{
                      cursor: "pointer",
                      top: "50%",
                      cursor: "pointer",
                      position: "absolute",
                      right: "20px",
                    }}
                  >
                    {openEyes1 ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="form-group mb-3 position-relative">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type={openEyes2 ? "password" : "text"}
                    className="form-control"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={() => setOpenEyes2(!openEyes2)}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      cursor: "pointer",
                    }}
                  >
                    {openEyes2 ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary w-100">
                  UPDATE PASSWORD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ChangePassword;
