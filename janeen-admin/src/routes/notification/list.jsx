import React, { useState, useEffect } from 'react';
import { 
  Bell,
  Calendar,
  Clock,
  Plus,
  RefreshCw,
  AlertCircle,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const AdminNotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Simulated token - replace with actual token from localStorage

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
      const token = sessionStorage.getItem("adminToken");

    try {
      const response = await fetch('http://localhost:8080/api/v1/notifications/admin/template', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
                         'ngrok-skip-browser-warning': '69420'

        },
      });

      const data = await response.json();

      if (data.success) {
        setNotifications(data.data || []);
      } else {
        setError('Failed to fetch notifications');
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('An error occurred while fetching notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotification = () => {
    // Navigate to create notification screen
    window.location.href = '/notifications/new';
    // Or if using React Router: navigate('/notifications/new');
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'daily':
        return <Clock className="w-5 h-5" />;
      case 'weekly':
        return <Calendar className="w-5 h-5" />;
      case 'monthly':
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'daily':
        return 'blue';
      case 'weekly':
        return 'green';
      case 'monthly':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || notification.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div className='bg-gradient-to-r from-violet-600 to-purple-600 p-2 rounded-lg'>
                <h1 className="text-3xl font-bold text-[white]">Notifications</h1>
                <p className="text-[white] text-sm mt-1">
                  Manage all notification templates
                </p>
              </div>
            </div>
            <button
              onClick={handleCreateNotification}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Create Notification</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-white font-medium text-gray-700"
              >
                <option value="all">All Types</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchNotifications}
              disabled={loading}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all border-2 border-gray-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
       
       )}

        {/* Loading State */}
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Notifications Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Get started by creating your first notification template'}
            </p>
            {!searchQuery && filterType === 'all' && (
              <button
                onClick={handleCreateNotification}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Create First Notification</span>
              </button>
            )}
          </div>
        ) : (
          /* Notifications Grid */
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 font-medium">
                Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredNotifications.map((notification) => {
                const typeColor = getTypeColor(notification.type);
                
                return (
                  // <div
                  //   key={notification._id}
                  //   className="bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 overflow-hidden"
                  // >
                  //   <div className="p-6">
                  //     {/* Header */}
                  //     <div className="flex items-start justify-between mb-4">
                  //       <div className="flex items-center space-x-3">
                  //         <div className={`w-12 h-12 rounded-xl  flex items-center justify-center`}>
                  //           {getTypeIcon(notification.type)}
                  //           <span className="text-white">{getTypeIcon(notification.type)}</span>
                  //         </div>
                  //         <div>
                  //           <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-${typeColor}-100 text-${typeColor}-700`}>
                  //             {notification.type}
                  //           </span>
                  //         </div>
                  //       </div>
                  //       <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  //         <MoreVertical className="w-5 h-5 text-gray-400" />
                  //       </button>
                  //     </div>

                  //     {/* Title */}
                  //     <h3 className="text-xl font-bold text-gray-900 mb-3">
                  //       {notification.title}
                  //     </h3>

                  //     {/* Message */}
                  //     <p className="text-gray-600 mb-4 line-clamp-3">
                  //       {notification.message}
                  //     </p>

                  //     {/* Footer */}
                  //     <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  //       <div className="flex items-center space-x-2 text-sm text-gray-500">
                  //         <Clock className="w-4 h-4" />
                  //         <span>{formatDate(notification.createdAt)}</span>
                  //       </div>
                  //       <div className="flex items-center space-x-2">
                  //         <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                  //           <Eye className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  //         </button>
                  //         <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                  //           <Edit className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  //         </button>
                  //         <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                  //           <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                  //         </button>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>

                  <div
  key={notification._id}
  className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 overflow-hidden"
>
  <div className="p-6">

    {/* Top Row */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
          {getTypeIcon(notification.type)}
        </div>
      </div>

      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <MoreVertical className="w-5 h-5 text-gray-400" />
      </button>
    </div>

    {/* Title */}
    {notification.title && (
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {notification.title}
      </h3>
    )}

    {/* Message */}
    {notification.message && (
      <p className="text-gray-600 mb-4 line-clamp-3">
        {notification.message}
      </p>
    )}

    {/* Tags Section */}
    <div className="flex flex-wrap items-center gap-2 mb-4">

      {/* Type Tag */}
      {notification.type && (
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full bg-${getTypeColor(
            notification.type
          )}-100 text-${getTypeColor(notification.type)}-700`}
        >
          {notification.type.toUpperCase()}
        </span>
      )}

      {/* Category */}
      {notification.category && (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
          Category: {notification.category}
        </span>
      )}

      {/* StageType */}
      {notification.stageType && (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
          Stage: {notification.stageType}
        </span>
      )}

      {/* StageValue */}
      {notification.stageValue !== undefined && notification.stageValue !== null && (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
          Value: {notification.stageValue}
        </span>
      )}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>{formatDate(notification.createdAt)}</span>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-violet-50 rounded-lg transition-colors group">
          <Eye className="w-5 h-5 text-gray-400 group-hover:text-violet-600" />
        </button>
        <button className="p-2 hover:bg-violet-50 rounded-lg transition-colors group">
          <Edit className="w-5 h-5 text-gray-400 group-hover:text-violet-600" />
        </button>
        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
          <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
        </button>
      </div>
    </div>
  </div>
</div>

                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminNotificationsList;