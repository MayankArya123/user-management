import { useContext, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import CommanSection from "./CommanSection";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardDark = () => {
  const { changeBackground } = useContext(ThemeContext);
  const authState = useSelector((state) => state?.auth?.user);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);

  return (
    <>
      {authState?.role === "admin" ? (
        <CommanSection />
      ) : (
        <div className="container mt-4">
          <div
            className="card shadow-sm"
            style={{ maxWidth: "500px", margin: "auto" }}
          >
            <div className="card-body text-center">
              {/* Avatar */}
              {authState?.profilePicture ? (
                <img
                  src={authState.profilePicture}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  width="100"
                  height="100"
                />
              ) : (
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "100px", height: "100px", fontSize: "36px" }}
                >
                  {authState?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Name */}
              <h4 className="mb-1">{authState?.name}</h4>

              {/* Email */}
              <p className="text-muted mb-2">{authState?.email}</p>

              {/* Role */}
              <span className="badge bg-info mb-3 text-dark">
                {authState?.role}
              </span>

              {/* Status */}
              <div className="mb-3">
                <strong>Status: </strong>
                {authState?.isBlocked ? (
                  <span className="text-danger">Blocked</span>
                ) : (
                  <span className="text-success">Active</span>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-center gap-2">
                <Link
                  to={`/edit-profile/${authState?._id}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  Edit Profile
                </Link>
                <Link
                  to={`/page-forgot-password`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DashboardDark;
