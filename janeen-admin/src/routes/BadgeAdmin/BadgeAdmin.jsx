import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Eye, X, Loader2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api/v1/badges';



// utils/authFetch.js
const authFetch = async (url, options = {}) => {
  const token = sessionStorage.getItem("adminToken");

  const headers = {
    'Content-Type': 'application/json',
                   'ngrok-skip-browser-warning': '69420',

    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};



export default function BadgeAdmin() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    iconUrl: '',
    points: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    setLoading(true);
    try {
      const response = await authFetch(`${API_BASE_URL}/getAllBadges`);
      const data = await response.json();
      setBadges(data);
    } catch (err) {
      setError('Failed to fetch badges');
    } finally {
      setLoading(false);
    }
  };

  const fetchBadgeById = async (id) => {
    try {
      const response = await authFetch(`${API_BASE_URL}/getBadge/${id}`);
      const data = await response.json();
      setSelectedBadge(data);
      setModalMode('view');
    } catch (err) {
      setError('Failed to fetch badge details');
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authFetch(`${API_BASE_URL}/createBadge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setSuccess('Badge created successfully!');
      closeModal();
      fetchBadges();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create badge');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authFetch(`${API_BASE_URL}/updateBadge/${selectedBadge._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setSuccess('Badge updated successfully!');
      closeModal();
      fetchBadges();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update badge');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setFormData({ name: '', description: '', iconUrl: '', points: '' });
    setModalMode('create');
  };

  const openEditModal = (badge) => {
    setSelectedBadge(badge);
    setFormData({
      name: badge.name,
      description: badge.description,
      iconUrl: badge.iconUrl || '',
      points: badge.points || ''
    });
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedBadge(null);
    setFormData({ name: '', description: '', iconUrl: '', points: '' });
    setError('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      setError('Name and description are required');
      return;
    }
    if (modalMode === 'create') {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  return (
    <div className="" style={{ }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-violet-600 to-purple-600 p-5 rounded-2xl shadow-lg shadow-violet-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">Badge Management</h1>
          <p className="text-violet-200 text-sm">Create, update, and manage all badges</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-violet-50 border border-violet-200">
            <p className="text-violet-800 font-medium">{success}</p>
          </div>
        )}

        {/* Create Button */}
        <div className="mb-6">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90 shadow-lg shadow-violet-200 bg-gradient-to-r from-violet-600 to-purple-600"
          >
            <Plus size={20} />
            <span>Create New Badge</span>
          </button>
        </div>

        {/* Badges Grid */}
        {loading && !modalMode ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-violet-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <div
                key={badge._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{badge.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{badge.description}</p>
                </div>
                
                <div className="mb-4 p-3 rounded-lg bg-violet-50 border border-violet-100">
                  <p className="text-xs text-gray-600">Created: {formatDate(badge.createdAt)}</p>
                  <p className="text-xs text-gray-600">Updated: {formatDate(badge.updatedAt)}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => fetchBadgeById(badge._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90 bg-violet-100 text-violet-700"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => openEditModal(badge)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 bg-gradient-to-r from-violet-600 to-purple-600"
                  >
                    <Edit2 size={16} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {badges.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No badges found. Create your first badge!</p>
          </div>
        )}

        {/* Modal */}
        {modalMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  {modalMode === 'create' && 'Create New Badge'}
                  {modalMode === 'edit' && 'Edit Badge'}
                  {modalMode === 'view' && 'Badge Details'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                {modalMode === 'view' && selectedBadge ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-violet-50 border border-violet-100">
                      <p className="text-sm text-gray-600 mb-1">Badge ID</p>
                      <p className="font-mono text-sm break-all">{selectedBadge._id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Name</p>
                      <p className="text-lg font-bold">{selectedBadge.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Description</p>
                      <p className="text-gray-800">{selectedBadge.description}</p>
                    </div>
                    {selectedBadge.iconUrl && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Icon URL</p>
                        <p className="text-sm text-violet-600 break-all">{selectedBadge.iconUrl}</p>
                      </div>
                    )}
                    {selectedBadge.points && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Points</p>
                        <p className="text-lg font-semibold">{selectedBadge.points}</p>
                      </div>
                    )}
                    <div className="p-4 rounded-lg bg-violet-50 border border-violet-100">
                      <p className="text-sm text-gray-600">Created: {formatDate(selectedBadge.createdAt)}</p>
                      <p className="text-sm text-gray-600">Updated: {formatDate(selectedBadge.updatedAt)}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Badge Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          placeholder="Enter badge name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                          placeholder="Enter badge description"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Icon URL
                        </label>
                        <input
                          type="url"
                          value={formData.iconUrl}
                          onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          placeholder="https://example.com/icon.png"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Points
                        </label>
                        <input
                          type="number"
                          value={formData.points}
                          onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          placeholder="100"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={closeModal}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600"
                      >
                        {loading && <Loader2 className="animate-spin" size={20} />}
                        <span>{modalMode === 'create' ? 'Create Badge' : 'Update Badge'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}