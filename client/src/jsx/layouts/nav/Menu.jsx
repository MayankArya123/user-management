export const MenuList = [
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-home" />,
    to: "dashboard",
    content: [
      { title: "Dashboard Light", to: "dashboard" },
      { title: "Dashboard Dark", to: "dashboard-dark" },
    ],
  },

  {
    title: "My Profile",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-user" />,
    content: [{ title: "Profile", to: "app-profile" }],
  },
];
