export const MenuList = [
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-home" />,
    content: [
      { title: "Dashboard Light", to: "dashboard" },
      { title: "Dashboard Dark", to: "dashboard-dark" },
      { title: "Dashboard 2", to: "dashboard-2" },
      { title: "Projects", to: "project-page" },
      { title: "Contact", to: "contact" },
      { title: "Kanban", to: "kanban" },
      { title: "Message", to: "message" },
    ],
  },
  {
    title: "Profile",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon flaticon-user-1" />,
    content: [
      { title: "Overview", to: "profile-overview" },
      { title: "Projects", to: "profile-projects" },
      { title: "Projects Details", to: "profile-projects-details" },
      { title: "Campaigns", to: "profile-campaigns" },
      { title: "Documents", to: "profile-documents" },
      { title: "Followers", to: "profile-followers" },
      { title: "Activity", to: "profile-activity" },
    ],
  },
  {
    title: "Account",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon flaticon-app" />,
    content: [
      { title: "Overview", to: "account-overview" },
      { title: "Settings", to: "account-settings" },
      { title: "Security", to: "account-security" },
      { title: "Activity", to: "account-activity" },
      { title: "Billing", to: "account-billing" },
      { title: "Statements", to: "account-statements" },
      { title: "Referrals", to: "account-referrals" },
      { title: "Api keys", to: "account-apikeys" },
      { title: "Logs", to: "account-logs" },
    ],
  },

  {
    title: "User",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-user" />,
    content: [
      { title: "Profile", to: "app-profile" },
      { title: "Edit Profile", to: "edit-profile" },
    ],
  },
];
