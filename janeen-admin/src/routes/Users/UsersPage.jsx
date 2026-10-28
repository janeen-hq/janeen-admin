import React, { useEffect, useState, useMemo } from "react";
import {
  Users, User, Baby, Search, RefreshCw, ChevronDown, ChevronUp,
  Clock, Trophy, Zap, Mail, Phone, Calendar, Shield, UserCheck,
  AlertCircle,
} from "lucide-react";

const BASE = "http://localhost:8080";

// ── helpers ──────────────────────────────────────────────────
const fmtDuration = (sec) => {
  if (!sec) return "—";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};
const fmtTime = (sec) => {
  if (!sec && sec !== 0) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—";
const STARS = ["", "⭐", "⭐⭐", "⭐⭐⭐"];

const TABS = [
  { id: "all",      label: "All Users",  icon: Users },
  { id: "male",     label: "Male",       icon: User  },
  { id: "female",   label: "Female",     icon: User  },
  { id: "children", label: "Children",   icon: Baby  },
];

// ── stat pill ────────────────────────────────────────────────
const Pill = ({ color, children }) => (
  <span
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
    style={{ background: `${color}18`, color }}
  >
    {children}
  </span>
);

// ── expandable row detail ────────────────────────────────────
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between py-1 border-b border-gray-50 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800 text-right max-w-[60%] break-words">{value || "—"}</span>
  </div>
);

// ─────────────────────────────────────────────────────────────
//  ADULT ROW
// ─────────────────────────────────────────────────────────────
const AdultRow = ({ user, index }) => {
  const [open, setOpen] = useState(false);

  const genderColor = user.gender === "Male" ? "#3b82f6" : "#e0508e";
  const genderBg   = user.gender === "Male" ? "#eff6ff" : "#fce8f0";

  return (
    <>
      <tr
        className="border-b border-gray-100 hover:bg-violet-50/40 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <td className="py-3 px-4 text-sm text-gray-500">{index + 1}</td>

        {/* Avatar + name */}
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${genderColor}, ${genderColor}99)` }}
            >
              {user.username?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{user.username || "—"}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
        </td>

        {/* Gender badge */}
        <td className="py-3 px-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: genderBg, color: genderColor }}>
            {user.gender || "—"}
          </span>
        </td>

        {/* Phone */}
        <td className="py-3 px-4 text-sm text-gray-600">{user.phone_number || "—"}</td>

        {/* Children count */}
        <td className="py-3 px-4">
          {user.children?.length > 0 ? (
            <Pill color="#7c3aed">{user.children.length} child{user.children.length > 1 ? "ren" : ""}</Pill>
          ) : (
            <span className="text-xs text-gray-400">None</span>
          )}
        </td>

        {/* Joined */}
        <td className="py-3 px-4 text-xs text-gray-500">{fmtDate(user.createdAt)}</td>

        {/* Expand */}
        <td className="py-3 px-4 text-gray-400">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>

      {/* ── Expanded detail ── */}
      {open && (
        <tr className="bg-violet-50/30">
          <td colSpan={7} className="px-6 pb-5 pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Profile details */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-violet-700 mb-3 flex items-center gap-1.5">
                  <UserCheck size={15} /> Profile Details
                </h4>
                <DetailRow label="Age"            value={user.age} />
                <DetailRow label="Marital Status" value={user.maritalStatus} />
                <DetailRow label="Pregnancy Stage" value={user.pregnancyStage} />
                <DetailRow label="Father Status"  value={user.fatherStatus} />
                <DetailRow label="Last Login"     value={fmtDate(user.lastLogin)} />
                <DetailRow label="Points"         value={user.points} />
                <DetailRow label="Role"           value={user.role} />
              </div>

              {/* Children list */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-violet-700 mb-3 flex items-center gap-1.5">
                  <Baby size={15} /> Children ({user.children?.length || 0})
                </h4>
                {user.children?.length === 0 || !user.children ? (
                  <p className="text-sm text-gray-400">No children linked.</p>
                ) : (
                  <div className="space-y-2">
                    {user.children.map((c) => (
                      <div key={c._id} className="flex items-center justify-between p-2.5 rounded-lg bg-violet-50">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-violet-200 flex items-center justify-center text-violet-700 font-bold text-xs">
                            {c.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{c.name}</p>
                            <p className="text-xs text-gray-400">{c.category}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{fmtDate(c.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// ─────────────────────────────────────────────────────────────
//  CHILD ROW
// ─────────────────────────────────────────────────────────────
const ChildRow = ({ child, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr
        className="border-b border-gray-100 hover:bg-amber-50/40 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <td className="py-3 px-4 text-sm text-gray-500">{index + 1}</td>

        {/* Avatar + name */}
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #a97ff5, #7c3aed)" }}>
              {child.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{child.name}</p>
              <p className="text-xs text-gray-400">{child.email}</p>
            </div>
          </div>
        </td>

        {/* Category badge */}
        <td className="py-3 px-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700">
            {child.category || "—"}
          </span>
        </td>

        {/* Parent */}
        <td className="py-3 px-4">
          {child.parent ? (
            <div>
              <p className="text-xs font-semibold text-gray-700">{child.parent.username || child.parent.email}</p>
              <p className="text-xs text-gray-400">{child.parent.gender}</p>
            </div>
          ) : (
            <span className="text-xs text-gray-400 italic">No parent</span>
          )}
        </td>

        {/* Screen time */}
        <td className="py-3 px-4">
          {child.screenTime ? (
            <Pill color="#7c3aed">
              <Clock size={11} /> {fmtDuration(child.screenTime.totalSeconds)}
            </Pill>
          ) : (
            <span className="text-xs text-gray-400">—</span>
          )}
        </td>

        {/* Game stats */}
        <td className="py-3 px-4">
          {child.gameStats ? (
            <Pill color="#f59e0b">
              🏆 {child.gameStats.totalGames} games · {STARS[child.gameStats.bestScore] || "⭐"}
            </Pill>
          ) : (
            <span className="text-xs text-gray-400">—</span>
          )}
        </td>

        {/* Joined */}
        <td className="py-3 px-4 text-xs text-gray-500">{fmtDate(child.createdAt)}</td>

        {/* Expand */}
        <td className="py-3 px-4 text-gray-400">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>

      {/* ── Expanded detail ── */}
      {open && (
        <tr className="bg-amber-50/20">
          <td colSpan={8} className="px-6 pb-5 pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Profile */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-violet-700 mb-3 flex items-center gap-1.5">
                  <Baby size={15} /> Child Details
                </h4>
                <DetailRow label="Gender"     value={child.gender} />
                <DetailRow label="Birth Date" value={fmtDate(child.birthDate)} />
                <DetailRow label="Age Group"  value={child.category} />
                <DetailRow label="Last Login" value={fmtDate(child.lastLogin)} />
              </div>

              {/* Screen Time */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-violet-700 mb-3 flex items-center gap-1.5">
                  <Clock size={15} /> Screen Time (7 days)
                </h4>
                {child.screenTime ? (
                  <>
                    <DetailRow label="Total Time"   value={fmtDuration(child.screenTime.totalSeconds)} />
                    <DetailRow label="Sessions"     value={child.screenTime.sessionCount} />
                    <DetailRow label="Last Seen"    value={fmtDate(child.screenTime.lastSeen)} />
                  </>
                ) : (
                  <p className="text-sm text-gray-400">No screen time recorded.</p>
                )}
              </div>

              {/* Game Stats */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-violet-700 mb-3 flex items-center gap-1.5">
                  <Trophy size={15} /> Game Stats
                </h4>
                {child.gameStats ? (
                  <>
                    <DetailRow label="Total Games" value={child.gameStats.totalGames} />
                    <DetailRow label="Best Score"  value={`${STARS[child.gameStats.bestScore] || "⭐"} (${child.gameStats.bestScore} stars)`} />
                    <DetailRow label="Avg Moves"   value={child.gameStats.avgMoves} />
                    <DetailRow label="Avg Time"    value={fmtTime(child.gameStats.avgTime)} />
                  </>
                ) : (
                  <p className="text-sm text-gray-400">No games played yet.</p>
                )}
              </div>
            </div>

            {/* Parent info */}
            {child.parent && (
              <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-violet-700 mb-3 flex items-center gap-1.5">
                  <Shield size={15} /> Parent Information
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    ["Name",   child.parent.username],
                    ["Email",  child.parent.email],
                    ["Gender", child.parent.gender],
                    ["Phone",  child.parent.phone_number],
                  ].map(([label, val]) => (
                    <div key={label} className="rounded-lg p-2.5 bg-violet-50">
                      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                      <p className="text-xs font-semibold text-gray-800 break-all">{val || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
};

// ─────────────────────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [tab, setTab]         = useState("all");
  const [search, setSearch]   = useState("");

  const token = sessionStorage.getItem("adminToken");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/v1/users/admin/all-members`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const json = await res.json();
      if (json.success) setData(json.data);
      else setError(json.message || "Failed to load data");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── filtered lists ────────────────────────────────────────
  const q = search.toLowerCase().trim();

  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];
    let list = data.users;
    if (tab === "male")   list = list.filter((u) => u.gender === "Male");
    if (tab === "female") list = list.filter((u) => u.gender === "Female");
    if (!q) return list;
    return list.filter(
      (u) =>
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone_number?.includes(q)
    );
  }, [data, tab, q]);

  const filteredChildren = useMemo(() => {
    if (!data?.children) return [];
    if (!q) return data.children;
    return data.children.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.parent?.username?.toLowerCase().includes(q) ||
        c.parent?.email?.toLowerCase().includes(q)
    );
  }, [data, q]);

  const showUsers    = tab !== "children";
  const showChildren = tab === "children" || tab === "all";

  const counts = data?.counts;

  // ── render ────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-violet-600">
      <div className="w-6 h-6 border-3 border-violet-600 border-t-transparent rounded-full animate-spin" />
      <span className="font-medium">Loading members…</span>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64 flex-col gap-3">
      <AlertCircle size={40} className="text-red-400" />
      <p className="text-red-500 font-medium">{error}</p>
      <button onClick={fetchData}
        className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">
        Retry
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-6">

      {/* ── Page Header ── */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Members
            </h1>
            <p className="text-gray-500 mt-1 text-sm">All registered users and children on the platform</p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-50 text-violet-700 rounded-xl text-sm font-semibold hover:bg-violet-100 transition-colors"
          >
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {/* Summary stat cards */}
        {counts && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { label: "Total Adults",   value: counts.totalUsers,    color: "#7c3aed", icon: Users },
              { label: "Male",           value: counts.male,          color: "#3b82f6", icon: User  },
              { label: "Female",         value: counts.female,        color: "#e0508e", icon: User  },
              { label: "Children",       value: counts.totalChildren, color: "#f59e0b", icon: Baby  },
            ].map(({ label, value, color, icon: Icon }) => (
              <div key={label} className="rounded-xl p-4 flex items-center gap-3"
                style={{ background: `${color}10`, border: `1px solid ${color}25` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}20` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color }}>{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Tabs + Search ── */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl flex-wrap">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setTab(id); setSearch(""); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                style={tab === id
                  ? { background: "white", color: "#7c3aed", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                  : { color: "#6b7280" }}
              >
                <Icon size={14} />
                {label}
                <span className="ml-0.5 text-xs px-1.5 py-0.5 rounded-full"
                  style={tab === id
                    ? { background: "#7c3aed18", color: "#7c3aed" }
                    : { background: "#e5e7eb", color: "#6b7280" }}>
                  {id === "all"      ? (counts?.totalUsers ?? 0) + (counts?.totalChildren ?? 0)
                   : id === "male"   ? counts?.male ?? 0
                   : id === "female" ? counts?.female ?? 0
                   :                   counts?.totalChildren ?? 0}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300 bg-gray-50"
            />
          </div>
        </div>

        {/* ── ADULT TABLE (All / Male / Female) ── */}
        {showUsers && filteredUsers.length > 0 && (
          <div className="mb-8">
            {tab === "all" && (
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <User size={16} className="text-violet-500" /> Adult Users
              </h3>
            )}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-violet-50 to-purple-50 text-xs uppercase text-violet-600 tracking-wide">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Gender</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Children</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <AdultRow key={u._id} user={u} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showUsers && filteredUsers.length === 0 && !showChildren && (
          <div className="text-center py-12 text-gray-400">
            <Users size={40} className="mx-auto mb-3 opacity-40" />
            <p>No users found.</p>
          </div>
        )}

        {/* ── CHILDREN TABLE ── */}
        {showChildren && filteredChildren.length > 0 && (
          <div>
            {tab === "all" && (
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Baby size={16} className="text-amber-500" /> Children
              </h3>
            )}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-50 to-yellow-50 text-xs uppercase text-amber-600 tracking-wide">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Age Group</th>
                    <th className="py-3 px-4">Parent</th>
                    <th className="py-3 px-4">Screen Time</th>
                    <th className="py-3 px-4">Game Scores</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChildren.map((c, i) => (
                    <ChildRow key={c._id} child={c} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showChildren && filteredChildren.length === 0 && tab === "children" && (
          <div className="text-center py-12 text-gray-400">
            <Baby size={40} className="mx-auto mb-3 opacity-40" />
            <p>No children found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
