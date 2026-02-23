const IMAGE_URl = import.meta.env.VITE_API_URL;
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "../../constant/theme";
import { ThemeContext } from "../../../context/ThemeContext";
import fscreen from "fscreen";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserAction } from "../../../store/actions/GetActions";
import { useSelector } from "react-redux";

function Header({ onNote }) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { background, changeBackground } = useContext(ThemeContext);
  const handleThemeMode = () => {
    if (background.value === "dark") {
      changeBackground({ value: "light", label: "Light" });
    } else {
      changeBackground({ value: "dark", label: "Dark" });
    }
  };
  const handleFullscreenToggle = () => {
    if (!fscreen.fullscreenElement) {
      fscreen.requestFullscreen(document.documentElement).catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    } else {
      fscreen.exitFullscreen();
    }
  };
  return (
    <>
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left"></div>
              <ul className="navbar-nav header-right">
                <li className="nav-item dropdown notification_dropdown">
                  <Link
                    className="nav-link dz-fullscreen"
                    to={"#"}
                    onClick={handleFullscreenToggle}
                  >
                    {" "}
                    {SVGICON.fullscreen}{" "}
                  </Link>
                </li>

                <li className="nav-item dropdown header-profile">
                  <Link
                    className="nav-link"
                    to={"#"}
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={`${IMAGE_URl + authState?.profilePicture} `}
                      alt="profileImg"
                    />
                    <div className="header-info ms-3">
                      <span className="fs-14 font-w600 mb-0">
                        {" "}
                        {authState?.name}{" "}
                      </span>
                    </div>
                    {SVGICON.threeline}
                  </Link>
                  <div className="profile-detail card">
                    <div className="card-body p-0">
                      <div className="d-flex profile-media justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={`${IMAGE_URl + authState?.profilePicture} `}
                            alt="profileImg"
                          />
                          <div className="ms-3">
                            <h4 className="mb-0"> {authState?.name} </h4>
                            <p className="mb-0"> {authState?.email} </p>
                          </div>
                        </div>
                        <Link to={`/edit-profile/${authState?._id}`}>
                          <div className="icon-box"> {SVGICON.edit} </div>
                        </Link>
                      </div>
                      <div className="media-box">
                        <ul className="d-flex flex-colunm gap-2 flex-wrap">
                          <li>
                            <Link to="/app-profile">
                              <div className="icon-box-lg">
                                {" "}
                                {SVGICON.profile} <p> Profile </p>{" "}
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link to="/page-login">
                              <div className="icon-box-lg">
                                {" "}
                                {SVGICON.logout} <p> Logout </p>{" "}
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Header;
