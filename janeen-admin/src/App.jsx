// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { ThemeProvider } from "@/contexts/theme-context";

// import Layout from "@/routes/layout";
// import DashboardPage from "@/routes/dashboard/page";

// function App() {
//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element: <Layout />,
//             children: [
//                 {
//                     index: true,
//                     element: <DashboardPage />,
//                 },
//                 {
//                     path: "analytics",
//                     element: <h1 className="title">Analytics</h1>,
//                 },
//                 {
//                     path: "reports",
//                     element: <h1 className="title">Reports</h1>,
//                 },
//                 {
//                     path: "customers",
//                     element: <h1 className="title">Customers</h1>,
//                 },
//                 {
//                     path: "new-customer",
//                     element: <h1 className="title">New Customer</h1>,
//                 },
//                 {
//                     path: "verified-customers",
//                     element: <h1 className="title">Verified Customers</h1>,
//                 },
//                 {
//                     path: "products",
//                     element: <h1 className="title">Products</h1>,
//                 },
//                 {
//                     path: "new-product",
//                     element: <h1 className="title">New Product</h1>,
//                 },
//                 {
//                     path: "inventory",
//                     element: <h1 className="title">Inventory</h1>,
//                 },
//                 {
//                     path: "settings",
//                     element: <h1 className="title">Settings</h1>,
//                 },
//             ],
//         },
//     ]);

//     return (
//         <ThemeProvider storageKey="theme">
//             <RouterProvider router={router} />
//         </ThemeProvider>
//     );
// }

// export default App;


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import Layout from "@/routes/layout";

import ProtectedRoute from "./ProtectedRoute";

// Pages (placeholders)
import DashboardPage from "@/routes/dashboard/page";
import NotificationPage from "@/routes/notification/page";
import NotificationsList from "@/routes/notification/list";
import AdminBlogDashboard from "./routes/blogs/page";
import BadgeAdmin from "./routes/BadgeAdmin/BadgeAdmin";
import AdminLogin from "./routes/AdminLogin/AdminLogin";
import AdminCoursesPage from "./routes/CoursesList/CoursesList";
import Content from "./routes/content/Content";
import ChatAdmin from "./routes/ChatAdmin/ChatAdmin";
import UsersPage from "./routes/Users/UsersPage";
import GameScoresPage from "./routes/GameScores/GameScoresPage";

// CMS
const CmsContent = () => <h1 className="title">Content Management</h1>;
const CmsMedia = () => <h1 className="title">Media Library</h1>;
const CmsTranslations = () => <h1 className="title">Translations</h1>;

// Users
const UsersList = () => <h1 className="title">Users</h1>;
const UserSubscriptions = () => <h1 className="title">Subscriptions</h1>;
const ParentChildProfiles = () => <h1 className="title">Parent–Child Profiles</h1>;

// Badges
const BadgesList = () => <h1 className="title">Badges</h1>;
const Leaderboards = () => <h1 className="title">Leaderboards</h1>;

// Courses
// const CoursesList = () => <h1 className="title">Courses</h1>;
const CourseExams = () => <h1 className="title">Exams</h1>;

// Payments
const Payments = () => <h1 className="title">Transactions</h1>;
const RevenueReports = () => <h1 className="title">Revenue Reports</h1>;

// Analytics / General Reports
const Analytics = () => <h1 className="title">Analytics</h1>;
const Reports = () => <h1 className="title">Reports</h1>;

// Settings
const Settings = () => <h1 className="title">Settings</h1>;

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
        

//         { index: true, element: <DashboardPage /> },

//         // CMS
//         { path: "cms/content", element: <CmsContent /> },
//         { path: "cms/media", element: <CmsMedia /> },
//         { path: "cms/translations", element: <CmsTranslations /> },

//         // Users
//         { path: "users/list", element: <UsersList /> },
//         { path: "users/subscriptions", element: <UserSubscriptions /> },
//         { path: "users/profiles", element: <ParentChildProfiles /> },

//         // Badges
//         { path: "badges/list", element: <BadgesList /> },
//         { path: "badges/leaderboards", element: <Leaderboards /> },

//         // Courses
//         { path: "courses/list", element: <CoursesList /> },
//         { path: "courses/exams", element: <CourseExams /> },

//         // Payments
//         { path: "payments/transactions", element: <Payments /> },
//         { path: "payments/revenue", element: <RevenueReports /> },

//         // Analytics / Reports
//         { path: "analytics", element: <Analytics /> },
//         { path: "reports", element: <Reports /> },

//         // Settings
//         { path: "settings", element: <Settings /> },
//         // NEW: Notifications admin
//         { path: "notifications/new", element: <NotificationsList/> },
//         { path: "notifications/create", element: <NotificationPage/> },

//           { path: "blogs/blog", element: <AdminBlogDashboard/> },
//           // { path: "user/login", element: <AdminLogin/> },

//                 { path: "badges/badge", element: <BadgeAdmin/> },

//       ],
//     },
//   ]);

//   return (
//     <ThemeProvider storageKey="theme">
//       <RouterProvider router={router} />
//     </ThemeProvider>
//   );
// }

// export default App;

function App() {
  const router = createBrowserRouter([
    // 🔓 PUBLIC ROUTE (LOGIN)
    {
      path: "/login",
      element: <AdminLogin />,
    },

    // 🔒 PROTECTED ADMIN ROUTES
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { index: true, element: <DashboardPage /> },

            // CMS
            { path: "cms/content", element: <CmsContent /> },
            { path: "cms/media", element: <CmsMedia /> },
            { path: "cms/translations", element: <CmsTranslations /> },

            // Users
            { path: "users/list", element: <UsersList /> },
            { path: "users/subscriptions", element: <UserSubscriptions /> },
            { path: "users/profiles", element: <ParentChildProfiles /> },

            // Badges
            { path: "badges/list", element: <BadgesList /> },
            { path: "badges/leaderboards", element: <Leaderboards /> },
            { path: "badges/badge", element: <BadgeAdmin /> },

            // Courses
            { path: "courses/list", element: <AdminCoursesPage /> },
            { path: "courses/exams", element: <CourseExams /> },

            // Payments
            { path: "payments/transactions", element: <Payments /> },
            { path: "payments/revenue", element: <RevenueReports /> },

            // Analytics / Reports
            { path: "analytics", element: <Analytics /> },
            { path: "reports", element: <Reports /> },

            // Settings
            { path: "settings", element: <Settings /> },

            // Notifications
            { path: "notifications/new", element: <NotificationsList /> },
            { path: "notifications/create", element: <NotificationPage /> },

            // Blogs
            { path: "blogs/blog", element: <AdminBlogDashboard /> },

                        { path: "content/contentStage", element: <Content /> },

            // Chat
            { path: "chat/channels", element: <ChatAdmin /> },

            // Users / Members
            { path: "users/members", element: <UsersPage /> },

            // Game Scores
            { path: "games/scores", element: <GameScoresPage /> },

          ],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
