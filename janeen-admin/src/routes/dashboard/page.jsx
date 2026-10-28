// import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// import { useTheme } from "@/hooks/use-theme";

// import { overviewData, recentSalesData, topProducts } from "@/constants";

// import { Footer } from "@/layouts/footer";

// import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users } from "lucide-react";

// const DashboardPage = () => {
//     const { theme } = useTheme();

//     return (
//         <div className="flex flex-col gap-y-4">
//             <h1 className="title">Dashboard</h1>
            
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 <div className="card">
//                     <div className="card-header">
//                         <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
//                             <Package size={26} />
//                         </div>
//                         <p className="card-title">Total Products</p>
//                     </div>
//                     <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
//                         <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">25,154</p>
//                         <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
//                             <TrendingUp size={18} />
//                             25%
//                         </span>
//                     </div>
//                 </div>
//                 <div className="card">
//                     <div className="card-header">
//                         <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
//                             <DollarSign size={26} />
//                         </div>
//                         <p className="card-title">Total Paid Orders</p>
//                     </div>
//                     <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
//                         <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">$16,000</p>
//                         <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
//                             <TrendingUp size={18} />
//                             12%
//                         </span>
//                     </div>
//                 </div>
//                 <div className="card">
//                     <div className="card-header">
//                         <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
//                             <Users size={26} />
//                         </div>
//                         <p className="card-title">Total Customers</p>
//                     </div>
//                     <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
//                         <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">15,400k</p>
//                         <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
//                             <TrendingUp size={18} />
//                             15%
//                         </span>
//                     </div>
//                 </div>
//                 <div className="card">
//                     <div className="card-header">
//                         <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
//                             <CreditCard size={26} />
//                         </div>
//                         <p className="card-title">Sales</p>
//                     </div>
//                     <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
//                         <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">12,340</p>
//                         <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
//                             <TrendingUp size={18} />
//                             19%
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
//                 <div className="card col-span-1 md:col-span-2 lg:col-span-4">
//                     <div className="card-header">
//                         <p className="card-title">Overview</p>
//                     </div>
//                     <div className="card-body p-0">
//                         <ResponsiveContainer
//                             width="100%"
//                             height={300}
//                         >
//                             <AreaChart
//                                 data={overviewData}
//                                 margin={{
//                                     top: 0,
//                                     right: 0,
//                                     left: 0,
//                                     bottom: 0,
//                                 }}
//                             >
//                                 <defs>
//                                     <linearGradient
//                                         id="colorTotal"
//                                         x1="0"
//                                         y1="0"
//                                         x2="0"
//                                         y2="1"
//                                     >
//                                         <stop
//                                             offset="5%"
//                                             stopColor="#2563eb"
//                                             stopOpacity={0.8}
//                                         />
//                                         <stop
//                                             offset="95%"
//                                             stopColor="#2563eb"
//                                             stopOpacity={0}
//                                         />
//                                     </linearGradient>
//                                 </defs>
//                                 <Tooltip
//                                     cursor={false}
//                                     formatter={(value) => `$${value}`}
//                                 />

//                                 <XAxis
//                                     dataKey="name"
//                                     strokeWidth={0}
//                                     stroke={theme === "light" ? "#475569" : "#94a3b8"}
//                                     tickMargin={6}
//                                 />
//                                 <YAxis
//                                     dataKey="total"
//                                     strokeWidth={0}
//                                     stroke={theme === "light" ? "#475569" : "#94a3b8"}
//                                     tickFormatter={(value) => `$${value}`}
//                                     tickMargin={6}
//                                 />

//                                 <Area
//                                     type="monotone"
//                                     dataKey="total"
//                                     stroke="#2563eb"
//                                     fillOpacity={1}
//                                     fill="url(#colorTotal)"
//                                 />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//                 <div className="card col-span-1 md:col-span-2 lg:col-span-3">
//                     <div className="card-header">
//                         <p className="card-title">Recent Sales</p>
//                     </div>
//                     <div className="card-body h-[300px] overflow-auto p-0">
//                         {recentSalesData.map((sale) => (
//                             <div
//                                 key={sale.id}
//                                 className="flex items-center justify-between gap-x-4 py-2 pr-2"
//                             >
//                                 <div className="flex items-center gap-x-4">
//                                     <img
//                                         src={sale.image}
//                                         alt={sale.name}
//                                         className="size-10 flex-shrink-0 rounded-full object-cover"
//                                     />
//                                     <div className="flex flex-col gap-y-2">
//                                         <p className="font-medium text-slate-900 dark:text-slate-50">{sale.name}</p>
//                                         <p className="text-sm text-slate-600 dark:text-slate-400">{sale.email}</p>
//                                     </div>
//                                 </div>
//                                 <p className="font-medium text-slate-900 dark:text-slate-50">${sale.total}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className="card">
//                 <div className="card-header">
//                     <p className="card-title">Top Orders</p>
//                 </div>
//                 <div className="card-body p-0">
//                     <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
//                         <table className="table">
//                             <thead className="table-header">
//                                 <tr className="table-row">
//                                     <th className="table-head">#</th>
//                                     <th className="table-head">Product</th>
//                                     <th className="table-head">Price</th>
//                                     <th className="table-head">Status</th>
//                                     <th className="table-head">Rating</th>
//                                     <th className="table-head">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="table-body">
//                                 {topProducts.map((product) => (
//                                     <tr
//                                         key={product.number}
//                                         className="table-row"
//                                     >
//                                         <td className="table-cell">{product.number}</td>
//                                         <td className="table-cell">
//                                             <div className="flex w-max gap-x-4">
//                                                 <img
//                                                     src={product.image}
//                                                     alt={product.name}
//                                                     className="size-14 rounded-lg object-cover"
//                                                 />
//                                                 <div className="flex flex-col">
//                                                     <p>{product.name}</p>
//                                                     <p className="font-normal text-slate-600 dark:text-slate-400">{product.description}</p>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="table-cell">${product.price}</td>
//                                         <td className="table-cell">{product.status}</td>
//                                         <td className="table-cell">
//                                             <div className="flex items-center gap-x-2">
//                                                 <Star
//                                                     size={18}
//                                                     className="fill-yellow-600 stroke-yellow-600"
//                                                 />
//                                                 {product.rating}
//                                             </div>
//                                         </td>
//                                         <td className="table-cell">
//                                             <div className="flex items-center gap-x-4">
//                                                 <button className="text-blue-500 dark:text-blue-600">
//                                                     <PencilLine size={20} />
//                                                 </button>
//                                                 <button className="text-red-500">
//                                                     <Trash size={20} />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
            
//         </div>
//     );
// };

// export default DashboardPage;

// import { useEffect, useState } from "react";
// import { Users } from "lucide-react";
// import { Footer } from "@/layouts/footer";
// import { useTheme } from "@/hooks/use-theme";

// const DashboardPage = () => {
//   const { theme } = useTheme();

//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDhmYzg3NDEzOWU5ZjU4NTQ4YmE2NCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2ODY3MTIyOSwiZXhwIjoxNzY4NzU3NjI5fQ.Ao59KJImBtcnpsJypgBN868BxzakOLMhP1NP8gpz4uU";

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8080/api/v1/users/analytics",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const json = await response.json();
//         setAnalytics(json?.data);
//       } catch (error) {
//         console.error("Error fetching analytics:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, [token]);

//   if (loading) return <p className="p-5 text-lg">Loading analytics...</p>;
//   if (!analytics) return <p className="p-5 text-lg">No analytics data found.</p>;

//   const cardData = [
//     // MAIN
//     { label: "Total App Users", value: analytics.totalAppUsers },
//     { label: "Total Users", value: analytics.totalUsers },
//     { label: "Total Children", value: analytics.totalChildren },

//     // GENDER STATS
//     { label: "Male Users", value: analytics.genderStats?.maleUsers },
//     { label: "Female Users", value: analytics.genderStats?.femaleUsers },

//     // PREGNANCY STATS
//     {
//       label: "Pregnant Women",
//       value: analytics.pregnancyStats?.pregnantWomen,
//     },
//     {
//       label: "Non Pregnant Women",
//       value: analytics.pregnancyStats?.nonPregnantWomen,
//     },

//     // PARENT STATS
//     { label: "Fathers", value: analytics.parentStats?.fathers },
//     { label: "Married Women", value: analytics.parentStats?.marriedWomen },
//     {
//       label: "Users With Children",
//       value: analytics.parentStats?.usersWithChildren,
//     },
//   ];

//   return (
//     <div className="flex flex-col gap-y-4">
//       <h1 className="title">Dashboard</h1>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {cardData.map((item, index) => (
//           <div key={index} className="card">
//             <div className="card-header">
//               <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500">
//                 <Users size={26} />
//               </div>
//               <p className="card-title">{item.label}</p>
//             </div>
//             <div className="card-body bg-slate-100 dark:bg-slate-950">
//               <p className="text-3xl font-bold">
//                 {item.value !== undefined ? item.value : "—"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default DashboardPage;




import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Baby, Activity, TrendingUp, Calendar, Clock, UserX, Mail, UserCheck, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Swal from "sweetalert2";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingNotification, setSendingNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(null);
const [sendingEmailFor, setSendingEmailFor] = useState(null);

          const token = sessionStorage.getItem("adminToken");


  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
          const token = sessionStorage.getItem("adminToken");

        const response = await fetch(
          "http://localhost:8080/api/v1/users/analytics",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
               'ngrok-skip-browser-warning': '69420'
            },
          }
        );

        const json = await response.json();
        setAnalytics(json?.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  const fetchAnalytics = async () => {
    try {
        const token = sessionStorage.getItem("adminToken");

      setLoading(true);
const response = await fetch(
      'http://localhost:8080/api/v1/users/analytics',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${token}`, // ✅ token in header
        },
      }
    );      const result = await response.json();
      
      if (result.success) {
        setAnalytics(result.data);
      } else {
        setError('Failed to fetch analytics');
      }
    } catch (err) {
      setError('Error loading analytics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendEmailNotification = async () => {
    try {
      setSendingNotification(true);
      setNotificationStatus(null);
      
      // Replace with your actual email notification endpoint
      const response = await fetch('http://localhost:8080/api/v1/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'ngrok-skip-browser-warning': '69420'
        },
        body: JSON.stringify({
          type: 'inactive_users',
          recipients: analytics.activity.inactiveUsersDetails.map(user => user.email)
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setNotificationStatus({ type: 'success', message: 'Email notifications sent successfully!' });
      } else {
        setNotificationStatus({ type: 'error', message: result.message || 'Failed to send notifications' });
      }
    } catch (err) {
      setNotificationStatus({ type: 'error', message: 'Error sending notifications' });
      console.error(err);
    } finally {
      setSendingNotification(false);
      // Clear notification status after 5 seconds
      setTimeout(() => setNotificationStatus(null), 5000);
    }
  };

  const sendEmailToUser = async (userId) => {
  try {
    setSendingEmailFor(userId);
  const token = sessionStorage.getItem("adminToken");

    const response = await fetch(
      "http://localhost:8080/api/v1/users/send-inactive-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
           'ngrok-skip-browser-warning': '69420'
        },
        body: JSON.stringify({ userId }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Email notification sent successfully.",
        confirmButtonColor: "#4F46E5",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message || "Failed to send email.",
        confirmButtonColor: "#EF4444",
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong while sending email.",
    });
  } finally {
    setSendingEmailFor(null);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-red-500 text-center">
            <Activity className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button 
              onClick={fetchAnalytics}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2 text-white shadow-md shadow-violet-200 transition hover:from-violet-700 hover:to-purple-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { total, activity, genderStats, pregnancyStats, parentStats } = analytics;

  const StatCard = ({ icon: Icon, title, value, color, gradient, subtitle }) => (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-4xl font-bold text-white mb-1">{value}</h3>
            {subtitle && <p className="text-white/70 text-xs">{subtitle}</p>}
          </div>
          <div className={`${color} bg-white/20 p-3 rounded-xl backdrop-blur-sm`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const ActivityCard = ({ icon: Icon, label, count, color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
      <div className="flex items-center gap-3">
        <div className={`${color} p-2.5 rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-slate-600 text-sm">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{count}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 p-6 shadow-lg shadow-violet-200">
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard Analytics</h1>
          <p className="text-violet-200 text-sm">Comprehensive overview of your platform metrics</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={Users}
            title="Total App Users"
            value={total.totalAppUsers}
            color="bg-violet-600"
            gradient="from-violet-600 to-violet-700"
            subtitle="All registered users"
          />
          <StatCard 
            icon={UserPlus}
            title="Adult Users"
            value={total.totalUsers}
            color="bg-purple-600"
            gradient="from-purple-600 to-purple-700"
            subtitle="Parent accounts"
          />
          <StatCard 
            icon={Baby}
            title="Children"
            value={total.totalChildren}
            color="bg-fuchsia-600"
            gradient="from-fuchsia-600 to-pink-600"
            subtitle="Child profiles"
          />
        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2.5 rounded-lg">
                <Activity className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">User Activity</h2>
            </div>
            
            {/* {activity.inactiveUsersCount > 0 && (
              <button 
                onClick={sendEmailNotification}
                disabled={sendingNotification}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-5 py-2.5 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                {sendingNotification ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="font-medium">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="font-medium">Send Notification</span>
                  </>
                )}
              </button>
            )} */}
          </div>

          {/* Notification Status Alert */}
          {notificationStatus && (
            <div className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${
              notificationStatus.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {notificationStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <p className={`font-medium ${
                notificationStatus.type === 'success' ? 'text-emerald-800' : 'text-red-800'
              }`}>
                {notificationStatus.message}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActivityCard 
              icon={Clock}
              label="Active Today"
              count={activity.activeToday}
              color="bg-teal-500"
            />
            <ActivityCard 
              icon={Calendar}
              label="Active This Week"
              count={activity.activeThisWeek}
              color="bg-violet-500"
            />
            <ActivityCard 
              icon={TrendingUp}
              label="Active This Month"
              count={activity.activeThisMonth}
              color="bg-purple-500"
            />
            <ActivityCard 
              icon={UserX}
              label="Inactive Users"
              count={activity.inactiveUsersCount}
              color="bg-amber-500"
            />
          </div>
        </div>

        {/* Demographics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gender Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-2.5 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Gender Distribution</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-slate-700">Male Users</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{genderStats.maleUsers}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="font-medium text-slate-700">Female Users</span>
                </div>
                <span className="text-2xl font-bold text-pink-600">{genderStats.femaleUsers}</span>
              </div>
            </div>
          </div>

          {/* Parent Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 p-2.5 rounded-lg">
                <UserCheck className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Parent Statistics</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                <span className="font-medium text-slate-700">Fathers</span>
                <span className="text-2xl font-bold text-indigo-600">{parentStats.fathers}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-rose-50 rounded-xl">
                <span className="font-medium text-slate-700">Married Women</span>
                <span className="text-2xl font-bold text-rose-600">{parentStats.marriedWomen}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-violet-50 rounded-xl">
                <span className="font-medium text-slate-700">Users with Children</span>
                <span className="text-2xl font-bold text-violet-600">{parentStats.usersWithChildren}</span>
              </div>
            </div>
          </div>


          {/* Child Statistics */}
<div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
  <div className="flex items-center gap-3 mb-6">
    <div className="bg-green-100 p-2.5 rounded-lg">
      <Baby className="w-6 h-6 text-green-600" />
    </div>
    <h2 className="text-xl font-bold text-slate-800">Child Statistics</h2>
  </div>

  <div className="space-y-4">
    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
      <span className="font-medium text-slate-700">Total Children</span>
      <span className="text-2xl font-bold text-emerald-600">{analytics.childStats.totalChildren}</span>
    </div>

    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
      <span className="font-medium text-slate-700">Children With Parent</span>
      <span className="text-2xl font-bold text-blue-600">{analytics.childStats.childrenWithParent}</span>
    </div>

    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
      <span className="font-medium text-slate-700">Children Without Parent</span>
      <span className="text-2xl font-bold text-orange-600">{analytics.childStats.childrenWithoutParent}</span>
    </div>

    <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
      <span className="font-medium text-slate-700">Active Children</span>
      <span className="text-2xl font-bold text-indigo-600">{analytics.childStats.activeChildren}</span>
    </div>

    <div className="flex items-center justify-between p-4 bg-rose-50 rounded-xl">
      <span className="font-medium text-slate-700">Inactive Children</span>
      <span className="text-2xl font-bold text-rose-600">{analytics.childStats.inactiveChildren}</span>
    </div>
  </div>
</div>

        </div>

        {/* Pregnancy Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-rose-100 p-2.5 rounded-lg">
              <Baby className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Pregnancy Status</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border-2 border-rose-200">
              <span className="font-medium text-slate-700">Pregnant Women</span>
              <span className="text-3xl font-bold text-rose-600">{pregnancyStats.pregnantWomen}</span>
            </div>
            
            <div className="flex items-center justify-between p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200">
              <span className="font-medium text-slate-700">Non-Pregnant</span>
              <span className="text-3xl font-bold text-slate-600">{pregnancyStats.nonPregnantWomen}</span>
            </div>
          </div>
        </div>

        {/* Inactive Users Table */}
      {/* Inactive Users Table */}
{activity.inactiveUsersDetails && activity.inactiveUsersDetails.length > 0 && (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-orange-100 p-2.5 rounded-lg">
        <UserX className="w-6 h-6 text-orange-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Inactive Users Details</h2>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">Email</th>
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">Gender</th>
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">Last Login</th>
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {activity.inactiveUsersDetails.map((user, index) => (
            <tr
              key={user._id}
              className={`border-b border-slate-100 hover:bg-slate-50 transition ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              }`}
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700 font-medium">{user.email}</span>
                </div>
              </td>

              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.gender === "Male"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {user.gender}
                </span>
              </td>

              <td className="py-4 px-4 text-slate-500">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : "Never logged in"}
              </td>

              {/* ACTION BUTTON */}
              <td className="py-4 px-4">
                <button
                  onClick={() => sendEmailToUser(user._id)}
                  disabled={sendingEmailFor === user._id}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-white shadow-sm shadow-violet-200 transition hover:from-violet-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {sendingEmailFor === user._id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

      </div>
    </div>
  );
}