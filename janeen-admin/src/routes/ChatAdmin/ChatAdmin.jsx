import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  Hash,
  Lock,
  Plus,
  Users,
  Trash2,
  Search,
  X,
  Loader2,
  Settings2,
  UserPlus,
  UserMinus,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8080/api/v1/chat";

const authFetch = async (url, options = {}) => {
  const token = sessionStorage.getItem("adminToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "?";

/* ------------------------------------------------------------------ */

export default function ChatAdmin() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", description: "", isPrivate: false });
  const [createMembers, setCreateMembers] = useState([]); // [{_id, username, email}]

  const [manageChannel, setManageChannel] = useState(null); // full channel doc

  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [searchingUsers, setSearchingUsers] = useState(false);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      setLoading(true);
      const data = await authFetch(`${API_BASE_URL}/channels/admin`);
      setChannels(data.data || []);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, confirmButtonColor: "#3b82f6" });
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------- user search -------------------------- */

  const runUserSearch = useCallback(async (q) => {
    try {
      setSearchingUsers(true);
      const data = await authFetch(`${API_BASE_URL}/users?q=${encodeURIComponent(q)}`);
      setUserResults(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setSearchingUsers(false);
    }
  }, []);

  useEffect(() => {
    if (!showCreate && !manageChannel) return;
    const handle = setTimeout(() => runUserSearch(userQuery), 300);
    return () => clearTimeout(handle);
  }, [userQuery, showCreate, manageChannel, runUserSearch]);

  /* -------------------------- create channel -------------------------- */

  const openCreateModal = () => {
    setCreateForm({ name: "", description: "", isPrivate: false });
    setCreateMembers([]);
    setUserQuery("");
    setUserResults([]);
    setShowCreate(true);
  };

  const toggleCreateMember = (user) => {
    setCreateMembers((prev) =>
      prev.find((m) => m._id === user._id)
        ? prev.filter((m) => m._id !== user._id)
        : [...prev, user]
    );
  };

  const submitCreateChannel = async (e) => {
    e.preventDefault();
    if (!createForm.name.trim()) {
      Swal.fire({ icon: "warning", title: "Name required", confirmButtonColor: "#3b82f6" });
      return;
    }
    try {
      setCreating(true);
      await authFetch(`${API_BASE_URL}/channels`, {
        method: "POST",
        body: JSON.stringify({
          name: createForm.name.trim(),
          description: createForm.description,
          isPrivate: createForm.isPrivate,
          memberIds: createMembers.map((m) => m._id),
        }),
      });
      Swal.fire({
        icon: "success",
        title: "Channel created!",
        timer: 1500,
        showConfirmButton: false,
        confirmButtonColor: "#3b82f6",
      });
      setShowCreate(false);
      fetchChannels();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, confirmButtonColor: "#3b82f6" });
    } finally {
      setCreating(false);
    }
  };

  /* -------------------------- manage channel -------------------------- */

  const openManageModal = async (channel) => {
    setManageChannel(channel);
    setUserQuery("");
    setUserResults([]);
  };

  const addMemberToChannel = async (user) => {
    try {
      const data = await authFetch(`${API_BASE_URL}/channels/${manageChannel._id}/members`, {
        method: "POST",
        body: JSON.stringify({ memberIds: [user._id] }),
      });
      setManageChannel(data.data);
      fetchChannels();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, confirmButtonColor: "#3b82f6" });
    }
  };

  const removeMemberFromChannel = async (memberId) => {
    try {
      const data = await authFetch(
        `${API_BASE_URL}/channels/${manageChannel._id}/members/${memberId}`,
        { method: "DELETE" }
      );
      setManageChannel(data.data);
      fetchChannels();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, confirmButtonColor: "#3b82f6" });
    }
  };

  const deleteChannel = async (channel) => {
    const result = await Swal.fire({
      title: `Delete #${channel.name}?`,
      text: "All messages in this channel will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ef4444",
    });
    if (!result.isConfirmed) return;

    try {
      await authFetch(`${API_BASE_URL}/channels/${channel._id}`, { method: "DELETE" });
      Swal.fire({ icon: "success", title: "Deleted!", timer: 1200, showConfirmButton: false });
      setManageChannel(null);
      fetchChannels();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, confirmButtonColor: "#3b82f6" });
    }
  };

  const manageMemberIds = new Set((manageChannel?.members || []).map((m) => m.user?._id || m.user));

  /* ------------------------------------------------------------------ */

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="title">Team Chat Channels</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Create channels and manage who can post in them — just like Slack.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 font-medium transition-colors"
        >
          <Plus size={18} />
          Create Channel
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={36} />
        </div>
      ) : channels.length === 0 ? (
        <div className="card items-center py-16 text-center">
          <Hash size={36} className="text-slate-400 mb-2" />
          <p className="text-slate-500 dark:text-slate-400">No channels yet. Create the first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {channels.map((c) => (
            <div key={c._id} className="card">
              <div className="card-header justify-between">
                <div className="flex items-center gap-2">
                  {c.isPrivate ? (
                    <Lock size={16} className="text-slate-500 dark:text-slate-400" />
                  ) : (
                    <Hash size={16} className="text-blue-500" />
                  )}
                  <span className="card-title">{c.name}</span>
                </div>
                <button
                  onClick={() => deleteChannel(c)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  title="Delete channel"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[2.5rem]">
                {c.description || "No description"}
              </p>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Users size={13} /> {c.members?.length || 0} members
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex -space-x-2">
                {(c.members || []).slice(0, 6).map((m) => (
                  <div
                    key={m.user?._id || m.user}
                    title={m.user?.username}
                    className="w-7 h-7 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center border-2 border-white dark:border-slate-900"
                  >
                    {initials(m.user?.username)}
                  </div>
                ))}
                {c.members?.length > 6 && (
                  <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-semibold flex items-center justify-center border-2 border-white dark:border-slate-900">
                    +{c.members.length - 6}
                  </div>
                )}
              </div>

              <button
                onClick={() => openManageModal(c)}
                className="btn-ghost justify-center border border-slate-300 dark:border-slate-700 w-full"
              >
                <Settings2 size={15} />
                Manage members
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Channel Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">Create a channel</h3>
              <button onClick={() => setShowCreate(false)}>
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={submitCreateChannel} className="p-4 flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Channel name
                </label>
                <input
                  autoFocus
                  value={createForm.name}
                  onChange={(e) => setCreateForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. announcements"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="What's this channel about?"
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={createForm.isPrivate}
                  onChange={(e) => setCreateForm((f) => ({ ...f, isPrivate: e.target.checked }))}
                />
                Make private (only added members can see it)
              </label>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Add members
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-3 py-2">
                  <Search size={14} className="text-slate-400" />
                  <input
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Search users by name or email"
                    className="flex-1 bg-transparent outline-none text-sm dark:text-slate-50"
                  />
                </div>

                {createMembers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {createMembers.map((m) => (
                      <span
                        key={m._id}
                        className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                      >
                        {m.username}
                        <button type="button" onClick={() => toggleCreateMember(m)}>
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  {searchingUsers ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="animate-spin text-blue-500" size={18} />
                    </div>
                  ) : userResults.length === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-4">
                      {userQuery ? "No matches" : "Start typing to find people"}
                    </p>
                  ) : (
                    userResults.map((u) => {
                      const selected = !!createMembers.find((m) => m._id === u._id);
                      return (
                        <button
                          type="button"
                          key={u._id}
                          onClick={() => toggleCreateMember(u)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 ${
                            selected ? "bg-blue-50 dark:bg-blue-950" : ""
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center">
                            {initials(u.username)}
                          </div>
                          <span className="flex-1 dark:text-slate-100">{u.username}</span>
                          <span className="text-xs text-slate-400">{u.email}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-2.5 font-medium transition-colors"
              >
                {creating && <Loader2 size={16} className="animate-spin" />}
                Create channel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Manage Members Modal */}
      {manageChannel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-blue-500" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                  {manageChannel.name}
                </h3>
              </div>
              <button onClick={() => setManageChannel(null)}>
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-4">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Members ({manageChannel.members?.length || 0})
              </h4>
              <div className="max-h-40 overflow-y-auto flex flex-col gap-1 mb-4">
                {(manageChannel.members || []).map((m) => (
                  <div
                    key={m.user?._id || m.user}
                    className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center">
                        {initials(m.user?.username)}
                      </div>
                      <div>
                        <p className="text-sm text-slate-800 dark:text-slate-100">{m.user?.username}</p>
                        <p className="text-xs text-slate-400">{m.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeMemberFromChannel(m.user?._id || m.user)}
                      className="text-slate-400 hover:text-red-500"
                      title="Remove from channel"
                    >
                      <UserMinus size={15} />
                    </button>
                  </div>
                ))}
              </div>

              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Add a member
              </h4>
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-3 py-2 mb-2">
                <Search size={14} className="text-slate-400" />
                <input
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Search users by name or email"
                  className="flex-1 bg-transparent outline-none text-sm dark:text-slate-50"
                />
              </div>
              <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700">
                {searchingUsers ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="animate-spin text-blue-500" size={18} />
                  </div>
                ) : userResults.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-4">
                    {userQuery ? "No matches" : "Start typing to find people"}
                  </p>
                ) : (
                  userResults
                    .filter((u) => !manageMemberIds.has(u._id))
                    .map((u) => (
                      <button
                        key={u._id}
                        onClick={() => addMemberToChannel(u)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center">
                          {initials(u.username)}
                        </div>
                        <span className="flex-1 dark:text-slate-100">{u.username}</span>
                        <UserPlus size={14} className="text-blue-500" />
                      </button>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
