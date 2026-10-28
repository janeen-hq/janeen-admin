// import React, { useState } from 'react';
// import { 
//   Bell,
//   Calendar,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Send,
//   RefreshCw,
//   FileText,
//   MessageSquare,
//   Tag,
//   X
// } from 'lucide-react';

// const AdminCreateNotification = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     message: '',
//     type: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [errors, setErrors] = useState({});

//   const notificationTypes = [
//     {
//       value: 'daily',
//       label: 'Daily',
//       icon: Clock,
//       color: 'blue',
//       description: 'Daily health tips and reminders'
//     },
//     {
//       value: 'weekly',
//       label: 'Weekly',
//       icon: Calendar,
//       color: 'caribbeangreen',
//       description: 'Weekly progress and updates'
//     },
//     {
//       value: 'monthly',
//       label: 'Monthly',
//       icon: Bell,
//       color: 'brown',
//       description: 'Monthly health reports'
//     }
//   ];

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     } else if (formData.title.length < 5) {
//       newErrors.title = 'Title must be at least 5 characters';
//     }
    
//     if (!formData.message.trim()) {
//       newErrors.message = 'Message is required';
//     } else if (formData.message.length < 10) {
//       newErrors.message = 'Message must be at least 10 characters';
//     }
    
//     if (!formData.type) {
//       newErrors.type = 'Please select a notification type';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDhmYzg3NDEzOWU5ZjU4NTQ4YmE2NCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MzM5OTY1NywiZXhwIjoxNzYzNDg2MDU3fQ.BVMJTvMXnOPdmaFjnR72Sb6f4b8pUii7D2nTyS162C4';
//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       setMessage({ type: 'error', text: 'Please fix the errors before submitting' });
//       return;
//     }

//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//     const response = await fetch('http://localhost:8080/api/v1/notifications/admin/template', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json', // ✅ Add this back
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify(formData), // ✅ Proper JSON format
// });


//       const data = await response.json();

//       if (data.success) {
//         setMessage({ 
//           type: 'success', 
//           text: `${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} notification template created successfully!` 
//         });
//         setFormData({ title: '', message: '', type: '' });
//         setErrors({});
//       } else {
//         setMessage({ type: 'error', text: data.message || 'Failed to create notification' });
//       }
//     } catch (error) {
//       console.error('Error creating notification:', error);
//       setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({ title: '', message: '', type: '' });
//     setErrors({});
//     setMessage({ type: '', text: '' });
//   };

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   return (
//     <div className="min-h-screen  ">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <Bell className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="title">Create Notification</h1>
//               <p className="text-gray-600 text-sm mt-1">
//                 Create notification templates to be sent to users based on their preferences
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Message Display */}
//         {message.text && (
//           <div className={`mb-6 p-4 rounded-xl flex items-center justify-between shadow-md ${
//             message.type === 'success' 
//               ? 'bg-green-50 border-2 border-green-500 text-green-800' 
//               : 'bg-red-50 border-2 border-red-500 text-red-800'
//           }`}>
//             <div className="flex items-center space-x-3">
//               {message.type === 'success' ? (
//                 <CheckCircle className="w-6 h-6 flex-shrink-0" />
//               ) : (
//                 <AlertCircle className="w-6 h-6 flex-shrink-0" />
//               )}
//               <span className="font-semibold">{message.text}</span>
//             </div>
//             <button 
//               onClick={() => setMessage({ type: '', text: '' })}
//               className="text-current hover:opacity-70 transition-opacity"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         )}

//         {/* Main Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
//           <div className="p-6 sm:p-8">
//             {/* Notification Type Selection */}
//             <div className="mb-8">
//               <label className="block text-base font-bold text-gray-900 mb-4 flex items-center">
//                 <Tag className="w-5 h-5 mr-2 text-blue-600" />
//                 Notification Type
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {notificationTypes.map((type) => {
//                   const Icon = type.icon;
//                   const isSelected = formData.type === type.value;
                  
//                   return (
//                     <button
//                       key={type.value}
//                       type="button"
//                       onClick={() => handleChange('type', type.value)}
//                       className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${
//                         isSelected
//                           ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
//                           : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-start space-x-3">
//                         <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
//                           <Icon className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-bold text-gray-900 mb-1 text-lg">{type.label}</h3>
//                           <p className="text-sm text-gray-600">{type.description}</p>
//                         </div>
//                       </div>
//                       {isSelected && (
//                         <div className="absolute top-4 right-4">
//                           <CheckCircle className="w-6 h-6 text-blue-600" />
//                         </div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//               {errors.type && (
//                 <p className="mt-3 text-sm text-red-600 font-semibold flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {errors.type}
//                 </p>
//               )}
//             </div>

//             {/* Title Input */}
//             <div className="mb-6">
//               <label className="block text-base font-bold text-gray-900 mb-3 flex items-center">
//                 <FileText className="w-5 h-5 mr-2 text-blue-600" />
//                 Notification Title
//               </label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => handleChange('title', e.target.value)}
//                 placeholder="e.g., Weekly Health Reminder"
//                 className={`w-full px-4 py-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 transition-all ${
//                   errors.title
//                     ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
//                     : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
//                 }`}
//               />
//               {errors.title && (
//                 <p className="mt-2 text-sm text-red-600 font-semibold flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {errors.title}
//                 </p>
//               )}
//             </div>

//             {/* Message Input */}
//             <div className="mb-8">
//               <label className="block text-base font-bold text-gray-900 mb-3 flex items-center">
//                 <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
//                 Notification Message
//               </label>
//               <textarea
//                 value={formData.message}
//                 onChange={(e) => handleChange('message', e.target.value)}
//                 placeholder="Enter the notification message that will be sent to users..."
//                 rows={6}
//                 className={`w-full px-4 py-4 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 transition-all resize-none ${
//                   errors.message
//                     ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
//                     : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
//                 }`}
//               />
//               <div className="flex items-center justify-between mt-3">
//                 {errors.message ? (
//                   <p className="text-sm text-red-600 font-semibold flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {errors.message}
//                   </p>
//                 ) : (
//                   <p className="text-sm text-gray-600 font-medium">
//                     {formData.message.length} characters
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl text-base"
//               >
//                 {loading ? (
//                   <>
//                     <RefreshCw className="w-5 h-5 animate-spin" />
//                     <span>Creating...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5" />
//                     <span>Create Notification</span>
//                   </>
//                 )}
//               </button>

//               <button
//                 type="button"
//                 onClick={handleReset}
//                 disabled={loading}
//                 className="sm:w-auto px-8 py-4 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 border-gray-300 text-base"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Info Card */}
//         <div className="mt-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200 shadow-md">
//           <div className="flex items-start space-x-4">
//             <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
//             <div>
//               <h4 className="font-bold text-blue-900 mb-3 text-lg">Template Information</h4>
//               <ul className="text-sm text-blue-800 space-y-2 font-medium">
//                 <li>• Templates are stored and sent based on user notification preferences</li>
//                 <li>• Daily notifications are sent once per day at scheduled time</li>
//                 <li>• Weekly notifications are sent every 7 days</li>
//                 <li>• Monthly notifications are sent once per month</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminCreateNotification;



// import React, { useState } from 'react';
// import { 
//   Bell, Calendar, Clock, CheckCircle, AlertCircle,
//   Send, RefreshCw, FileText, MessageSquare, Tag, X
// } from 'lucide-react';

// const AdminCreateNotification = () => {

//   // --------------------------
//   // UPDATED FORM FIELDS
//   // --------------------------
//   const [formData, setFormData] = useState({
//     title: "",
//     message: "",
//     type: "",
//     category: "",
//     stageType: "",
//     stageValue: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [messageBox, setMessageBox] = useState({ type: "", text: "" });
//   const [errors, setErrors] = useState({});

//   // fixed token

//   // notification types
//   const notificationTypes = [
//     { value: "daily", label: "Daily", icon: Clock, description: "Daily health tips" },
//     { value: "weekly", label: "Weekly", icon: Calendar, description: "Weekly update" },
//     { value: "monthly", label: "Monthly", icon: Bell, description: "Monthly summary" },
//   ];

//   const categories = ["baby", "pregnancy", "men"];
//   const stageTypes = ["year", "month", "trimester", "general"];

//   // -------------------------
//   // VALIDATION UPDATED
//   // -------------------------
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (!formData.message.trim()) newErrors.message = "Message is required";
//     if (!formData.type) newErrors.type = "Notification type required";
//     if (!formData.category) newErrors.category = "Category is required";
//     if (!formData.stageType) newErrors.stageType = "Stage type required";

//     if (!formData.stageValue) {
//       newErrors.stageValue = "Stage value is required";
//     } else if (isNaN(formData.stageValue)) {
//       newErrors.stageValue = "Stage value must be a number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//   // -------------------------
//   // SUBMIT API REQUEST
//   // -------------------------
//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       setMessageBox({ type: "error", text: "Please fix the errors" });
//       return;
//     }

//     setLoading(true);
//     setMessageBox({ type: "", text: "" });
//   const token = sessionStorage.getItem("adminToken");

//     try {
//       const res = await fetch(
//         "http://localhost:8080/api/v1/notifications/admin/template",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//                            'ngrok-skip-browser-warning': '69420'

//           },
//           body: JSON.stringify(formData)
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         setMessageBox({
//           type: "success",
//           text: "Notification template saved successfully!"
//         });

//         // RESET FORM
//         setFormData({
//           title: "",
//           message: "",
//           type: "",
//           category: "",
//           stageType: "",
//           stageValue: ""
//         });

//         setErrors({});
//       } else {
//         setMessageBox({
//           type: "error",
//           text: data.message || "Failed to save template"
//         });
//       }
//     } catch (err) {
//       setMessageBox({ type: "error", text: "Network error occurred" });
//     }
//     setLoading(false);
//   };

//   // UPDATE INPUT FIELDS
//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));

//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: "" }));
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-5xl mx-auto">

//         {/* SUCCESS / ERROR BOX */}
//         {messageBox.text && (
//           <div
//             className={`p-4 rounded-xl my-4 flex justify-between ${
//               messageBox.type === "success"
//                 ? "bg-green-100 border border-green-600"
//                 : "bg-red-100 border border-red-600"
//             }`}
//           >
//             <span>{messageBox.text}</span>
//             <X onClick={() => setMessageBox({ type: "", text: "" })} />
//           </div>
//         )}
        

//         {/* ------------------------
//             NOTIFICATION TYPE SELECT
//         ------------------------- */}
//         <label className="font-bold mb-2 block">Notification Type</label>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           {notificationTypes.map((t) => {
//             const Icon = t.icon;
//             const isSelected = formData.type === t.value;
//             return (
//               <button
//                 key={t.value}
//                 type="button"
//                 onClick={() => handleChange("type", t.value)}
//                 className={`p-4 rounded-xl border ${
//                   isSelected ? "bg-blue-200 border-blue-600" : "border-gray-300"
//                 }`}
//               >
//                 <Icon className="w-6 h-6 mb-2" />
//                 <div className="font-bold">{t.label}</div>
//                 <div className="text-sm text-gray-600">{t.description}</div>
//               </button>
//             );
//           })}
//         </div>
//         {errors.type && <p className="text-red-600">{errors.type}</p>}

//         {/* ------------------------
//             TITLE INPUT
//         ------------------------- */}
//         <label className="font-bold block mt-4">Title</label>
//         <input
//           type="text"
//           className="w-full p-3 border rounded-xl mb-2"
//           value={formData.title}
//           onChange={(e) => handleChange("title", e.target.value)}
//         />
//         {errors.title && <p className="text-red-600">{errors.title}</p>}

//         {/* ------------------------
//             MESSAGE INPUT
//         ------------------------- */}
//         <label className="font-bold block mt-4">Message</label>
//         <textarea
//           className="w-full p-3 border rounded-xl"
//           rows={5}
//           value={formData.message}
//           onChange={(e) => handleChange("message", e.target.value)}
//         ></textarea>
//         {errors.message && <p className="text-red-600">{errors.message}</p>}

//         {/* ------------------------
//             CATEGORY DROPDOWN
//         ------------------------- */}
//         <label className="font-bold block mt-6">Category</label>
//         <select
//           className="w-full p-3 border rounded-xl"
//           value={formData.category}
//           onChange={(e) => handleChange("category", e.target.value)}
//         >
//           <option value="">Select Category</option>
//           {categories.map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>
//         {errors.category && <p className="text-red-600">{errors.category}</p>}

//         {/* ------------------------
//             STAGE TYPE DROPDOWN
//         ------------------------- */}

//         <label className="font-bold block mt-6">Stage Type</label>
//         <select
//           className="w-full p-3 border rounded-xl"
//           value={formData.stageType}
//           onChange={(e) => handleChange("stageType", e.target.value)}
//         >
//           <option value="">Select Stage Type</option>
//           {stageTypes.map((s) => (
//             <option key={s} value={s}>{s}</option>
//           ))}
//         </select>
//         {errors.stageType && <p className="text-red-600">{errors.stageType}</p>}

//         {/* ------------------------
//             STAGE VALUE INPUT
//         ------------------------- */}

//         <label className="font-bold block mt-6">Stage Value (Number)</label>
//         <input
//           type="number"
//           className="w-full p-3 border rounded-xl"
//           value={formData.stageValue}
//           onChange={(e) => handleChange("stageValue", e.target.value)}
//         />
//         {errors.stageValue && <p className="text-red-600">{errors.stageValue}</p>}

//         {/* ------------------------
//             SUBMIT BUTTON
//         ------------------------- */}
//         <button
//           type="button"
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full mt-8 p-4 bg-blue-600 text-white font-bold rounded-xl"
//         >
//           {loading ? "Saving..." : "Save Template"}
//         </button>

//       </div>
//     </div>
//   );
// };

// export default AdminCreateNotification;


import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  X,
} from "lucide-react";

const AdminCreateNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "",
    category: "",
    stageType: "",
    stageValue: "",
  });

  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  const notificationTypes = [
    { value: "daily", label: "Daily", icon: Clock, description: "Daily health tips" },
    { value: "weekly", label: "Weekly", icon: Calendar, description: "Weekly update" },
    { value: "monthly", label: "Monthly", icon: Bell, description: "Monthly summary" },
  ];

  const categories = ["baby", "pregnancy", "men"];
  const stageTypes = ["year", "month", "trimester", "general"];

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.type) newErrors.type = "Notification type required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.stageType) newErrors.stageType = "Stage type required";

    if (!formData.stageValue) {
      newErrors.stageValue = "Stage value is required";
    } else if (isNaN(formData.stageValue)) {
      newErrors.stageValue = "Stage value must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!validateForm()) {
      setMessageBox({ type: "error", text: "Please fix the errors" });
      return;
    }

    setLoading(true);
    setMessageBox({ type: "", text: "" });

    const token = sessionStorage.getItem("adminToken");

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/notifications/admin/template",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessageBox({
          type: "success",
          text: "Notification template saved successfully!",
        });

        setFormData({
          title: "",
          message: "",
          type: "",
          category: "",
          stageType: "",
          stageValue: "",
        });
        setErrors({});
      } else {
        setMessageBox({
          type: "error",
          text: data.message || "Failed to save template",
        });
      }
    } catch {
      setMessageBox({ type: "error", text: "Network error occurred" });
    }

    setLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass =
    "w-full p-3 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500";

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 text-gray-900 ">
      <div className=" mx-auto bg-white p-6 rounded-2xl shadow">

        {/* MESSAGE BOX */}
        {messageBox.text && (
          <div
            className={`p-4 rounded-xl mb-6 flex justify-between items-center border
              ${messageBox.type === "success"
                ? "bg-green-100 border-green-600 text-green-800"
                : "bg-red-100 border-red-600 text-red-800"
              }`}
          >
            <span>{messageBox.text}</span>
            <X
              className="cursor-pointer"
              onClick={() => setMessageBox({ type: "", text: "" })}
            />
          </div>
        )}

        {/* NOTIFICATION TYPE */}
        <label className="font-bold mb-2 block">Notification Type</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          {notificationTypes.map((t) => {
            const Icon = t.icon;
            const isSelected = formData.type === t.value;

            return (
              <button
                key={t.value}
                type="button"
                onClick={() => handleChange("type", t.value)}
                className={`p-4 rounded-xl border text-left transition
                  ${isSelected
                    ? "bg-violet-100 border-violet-600 text-violet-900"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-6 h-6 mb-2 text-current" />
                <div className="font-bold">{t.label}</div>
                <div className="text-sm opacity-70">{t.description}</div>
              </button>
            );
          })}
        </div>
        {errors.type && <p className="text-red-600 text-sm">{errors.type}</p>}

        {/* TITLE */}
        <label className="font-bold block mt-6">Title</label>
        <input
          type="text"
          className={inputClass}
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

        {/* MESSAGE */}
        <label className="font-bold block mt-6">Message</label>
        <textarea
          rows={5}
          className={inputClass}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
        />
        {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}

        {/* CATEGORY */}
        <label className="font-bold block mt-6">Category</label>
        <select
          className={inputClass}
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}

        {/* STAGE TYPE */}
        <label className="font-bold block mt-6">Stage Type</label>
        <select
          className={inputClass}
          value={formData.stageType}
          onChange={(e) => handleChange("stageType", e.target.value)}
        >
          <option value="">Select Stage Type</option>
          {stageTypes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.stageType && <p className="text-red-600 text-sm">{errors.stageType}</p>}

        {/* STAGE VALUE */}
        <label className="font-bold block mt-6">Stage Value (Number)</label>
        <input
          type="number"
          className={inputClass}
          value={formData.stageValue}
          onChange={(e) => handleChange("stageValue", e.target.value)}
        />
        {errors.stageValue && (
          <p className="text-red-600 text-sm">{errors.stageValue}</p>
        )}

        {/* SUBMIT */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-8 p-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Template"}
        </button>
      </div>
    </div>
  );
};

export default AdminCreateNotification;
