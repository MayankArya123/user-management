import { Fragment, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../services/UserService";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ChangePassword() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (authState) {
      setPasswordData({
        currentPassword: authState?.currentPassword,
      });
    }
  }, [authState]);

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    const response = await changePassword(passwordData);

    if (response?.status === 200) {
      alert("password changed successfully");
      return navigate("/dashboard");
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Change Password" motherMenu="App" />

      <div className="row">
        <div className="col-xl-6 col-lg-8 m-auto">
          <div className="card profile-card m-b30">
            <div className="card-header">
              <h4 className="card-title">Change Password</h4>
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

                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
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
