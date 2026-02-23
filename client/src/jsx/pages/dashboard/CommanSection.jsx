import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../constant/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import {
  countrylistprogressbar,
  hometabledata,
  swipershirtdata,
} from "../../constant/alldata";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../../services/UserService";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../services/UserService";
import { toggleBlockUser } from "../../../services/UserService";
import { impersonateUser, switchBack } from "../../../services/UserService";

const CommanSection = () => {
  const authState = useSelector((state) => state?.auth?.user);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [blockedFilter, setBlockedFilter] = useState(null);
  const limit = 5;

  const isImpersonating = () => {
    const token = localStorage.getItem("impersonateToken");
    if (!token) return false;

    const decoded = JSON.parse(atob(token.split(".")[1]));

    console.log("decoded check", decoded);

    return Boolean(decoded.impersonatedBy);
  };

  const BlockUnBlockUser = async (id) => {
    console.log("check id", id);
    const response = await toggleBlockUser(id);
    console.log("response check", response);
    getUserData();
  };

  const PersonateImpersonateUser = async (id) => {
    console.log("id check", id);

    const res = await impersonateUser(id);
    localStorage.setItem("impersonateToken", res.data.token);
    localStorage.setItem("originalAdmin", authState._id);
  };

  const switchBackToAdmin = async () => {
    console.log("check");

    const impersonateToken = localStorage.getItem("impersonateToken");
    if (!impersonateToken) return;

    const decoded = JSON.parse(atob(impersonateToken.split(".")[1]));
    const impersonationLogId = decoded.impersonationLogId;

    const res = await switchBack(impersonationLogId);

    // Restore admin token
    localStorage.setItem("token", res.data.token);

    // Clear impersonation data
    localStorage.removeItem("impersonateToken");
    localStorage.removeItem("originalAdmin");

    window.location.reload();
  };

  const getUserData = async () => {
    const response = await getUsers({
      page: currentPage,
      limit,
      search,
      role: roleFilter,
      blocked: blockedFilter,
    });

    console.log("response", response);

    setUsers(response.users);
    setTotalPages(response.pages);
  };

  const deleteUserData = async (id) => {
    console.log("check id", id);
    const deleteResponse = await deleteUser(id);

    if (deleteResponse?.status === 200) {
      getUserData();
    }
  };

  useEffect(() => {
    getUserData();
  }, [currentPage, search, roleFilter, blockedFilter]);

  console.log("users", users);

  const chackboxFun = (type) => {
    setTimeout(() => {
      const motherChackBox = document.querySelector(".home-check");
      const chackbox = document.querySelectorAll(".home-check1");
      for (let i = 0; i < chackbox.length; i++) {
        const element = chackbox[i];
        if (type === "all") {
          if (motherChackBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherChackBox.checked = false;
            break;
          } else {
            motherChackBox.checked = true;
          }
        }
      }
    }, 100);
  };
  const [data, setData] = useState([...hometabledata]);
  const [sortConfig, setSortConfig] = useState({
    key: "workstation",
    direction: "ascending",
  });

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-IN", options);
  };

  return (
    <>
      <div className="page-head">
        {/* {isImpersonating() && (
          <div className="impersonation-banner">
            ⚠ You are impersonating a user
            <button
              className="btn btn-light btn-sm fw-semibold"
              onClick={switchBackToAdmin}
            >
              Switch Back
            </button>
          </div>
        )} */}
        <div className="row">
          <div className="col-sm-6 mb-sm-4 mb-3">
            <h3 className="mb-0">Good Morning, {authState?.name} </h3>
            <p className="mb-0">
              {authState?.role === "admin" ? "Here are all users" : ""}
            </p>
          </div>
          <div className="col-sm-6 mb-4 text-sm-end">
            {/* <Link to={"#"} className="btn btn-outline-secondary">
              Add User
            </Link> */}
            <Link to={"/create-user"} className="btn btn-primary ms-2">
              Add User
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header flex-wrap">
                  <h5 className="mb-0"> Users </h5>
                  <div
                    style={{ width: "30%" }}
                    className="d-flex align-items-center justify-content-between transaction flex-wrap"
                  >
                    <div className="input-group search-area style-1">
                      <span className="input-group-text">
                        <Link to={"#"} className="m-0">
                          <i className="flaticon-search-interface-symbol" />
                        </Link>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => {
                          setCurrentPage(1); // reset page
                          setSearch(e.target.value);
                        }}
                      />
                    </div>
                    {/* <Link to={"#"} className="btn">
                      {" "}
                      {SVGICON.tablesort} Sort By{" "}
                    </Link> */}
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        as="div"
                        className="btn btn-outline-primary"
                      >
                        {SVGICON.tablefilter} Filter
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="p-3"
                        style={{ minWidth: "250px" }}
                      >
                        {/* Role Filter */}
                        <div className="mb-3">
                          <label className="form-label">Role</label>
                          <select
                            className="form-select"
                            value={roleFilter}
                            onChange={(e) => {
                              setCurrentPage(1);
                              setRoleFilter(e.target.value);
                            }}
                          >
                            <option value="">All</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                        </div>

                        {/* Blocked Filter */}
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            value={blockedFilter}
                            onChange={(e) => {
                              setCurrentPage(1);
                              setBlockedFilter(e.target.value);
                            }}
                          >
                            <option value="">All</option>
                            <option value="true">Blocked</option>
                            <option value="false">Active</option>
                          </select>
                        </div>

                        {/* Clear Button */}
                        <button
                          className="btn btn-sm btn-secondary w-100"
                          onClick={() => {
                            setRoleFilter("");
                            setBlockedFilter("");
                            setCurrentPage(1);
                          }}
                        >
                          Clear Filters
                        </button>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="card-body pb-2">
                  <div className="table-responsive">
                    <div className="dataTables_wrapper no-footer">
                      <table
                        id="transaction-tbl"
                        className="table transaction-tbl ItemsCheckboxSec dataTable no-footer"
                      >
                        <thead className="border-self">
                          <tr>
                            <th
                              className="sorting c-pointer"
                              onClick={() => sortData("date")}
                            >
                              Name
                            </th>
                            <th
                              className="sorting c-pointer"
                              onClick={() => sortData("date")}
                            >
                              Date
                            </th>
                            <th
                              className="sorting c-pointer"
                              onClick={() => sortData("client")}
                            >
                              Role
                            </th>

                            <th
                              className="sorting c-pointer"
                              onClick={() => sortData("status")}
                            >
                              Is Blocked
                            </th>
                            <th
                              className="sorting c-pointer"
                              onClick={() => sortData("action")}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((data, index) => (
                            <tr key={index}>
                              <td>
                                {" "}
                                <p className="mb-0 ms-2">{data?.name}</p>{" "}
                              </td>
                              <td>
                                {" "}
                                <p className="mb-0 ms-2">
                                  {formatDate(data?.createdAt)}
                                </p>{" "}
                              </td>
                              <td>
                                {" "}
                                <span>{data.role}</span>{" "}
                              </td>

                              <td>
                                {" "}
                                <span>
                                  {data.isBlocked ? "true" : "false"}
                                </span>{" "}
                              </td>
                              <td>
                                <Dropdown
                                  className="dropdown c-pointer ms-2"
                                  align="end"
                                >
                                  <Dropdown.Toggle
                                    as="div"
                                    className="btn-link i-false custome-d"
                                  >
                                    {SVGICON.tableaction}
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                    <Dropdown.Item
                                      className="dropdown-item"
                                      onClick={() => deleteUserData(data?._id)}
                                    >
                                      Delete
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href={`/edit-profile/${data?._id}`}
                                      className="dropdown-item"
                                    >
                                      Edit
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                      onClick={() =>
                                        BlockUnBlockUser(data?._id)
                                      }
                                    >
                                      {data.isBlocked ? "Unblock" : "Block"}
                                    </Dropdown.Item>

                                    {!isImpersonating() && (
                                      <Dropdown.Item
                                        onClick={() =>
                                          PersonateImpersonateUser(data?._id)
                                        }
                                      >
                                        Impersonate
                                      </Dropdown.Item>
                                    )}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-3 gap-2">
          <button
            className="btn btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default CommanSection;
