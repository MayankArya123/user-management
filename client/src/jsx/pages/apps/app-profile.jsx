const IMAGE_URl = import.meta.env.VITE_API_URL;
import React, { Fragment, lazy, useReducer } from "react";
import { Button, Dropdown, Modal, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { IMAGES, SVGICON } from "../../constant/theme";
import { followersgrid, projectgrid } from "../../constant/alldata";
import UserSidebar from "../../element/usersidebar";
import { useSelector } from "react-redux";

function AppProfile() {
  const authState = useSelector((state) => state?.auth?.user);

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />
      <div className="row">
        <div className="col-xl-9 col-xxl-8">
          <Tab.Container defaultActiveKey="Posts">
            <div className="row">
              <div className="col-xl-12">
                <div className="profile card card-body p-0">
                  <div className="profile-head">
                    <div className="photo-content">
                      <div className="photo-btn">
                        <Link
                          to={`/edit-profile/${authState?._id}`}
                          className="btn bgl-light text-white"
                        >
                          <i className="flaticon-editing me-2" />
                          Edit
                        </Link>
                      </div>
                      <div className="cover-photo"></div>
                    </div>
                    <div className="profile-info z-1">
                      <div className="profile-photo w-[160px] h-[240px]">
                        <img
                          src={`${IMAGE_URl + authState?.profilePicture} `}
                          alt="profileImg"
                          className="w-100 h-100"
                        />
                      </div>
                      <div className="profile-details">
                        <div className="profile-name px-3 pt-2">
                          <h4 className="text-white  mb-0 fs-23">
                            {authState?.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Container>
        </div>
        <UserSidebar />
      </div>
    </Fragment>
  );
}

export default AppProfile;
