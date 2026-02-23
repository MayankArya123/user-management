import { Dropdown } from "react-bootstrap";
import { IMAGES, SVGICON } from "../constant/theme";
import { Link } from "react-router-dom";
import { galleryBlog } from "../constant/alldata";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useSelector } from "react-redux";

function UserSidebar() {
  const authState = useSelector((state) => state?.auth?.user);

  return (
    <>
      <div className="col-xl-3 col-xxl-4">
        <div className="card h-auto">
          <div className="card-header pb-0 border-0">
            <h4 className="card-title--medium mb-0"> {"Bio"} </h4>
          </div>
          <div className="card-body pt-3">
            <p className="text-dark"> {authState?.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserSidebar;
