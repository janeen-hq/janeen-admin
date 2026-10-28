import React, { useEffect, useState, useMemo } from "react";
import { Trophy, Brain, Search, RefreshCw, ChevronDown, ChevronUp, AlertCircle, Medal } from "lucide-react";

const BASE = "http://localhost:8080";

// ── helpers ──────────────────────────────────────────────────
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—";

const STARS = ["", "⭐", "⭐⭐", "⭐⭐⭐"];

const medal = (pct) =>
  pct >= 90 ? "🥇" : pct >= 70 ? "🥈" : pct >= 50 ? "🥉" : "💪";

// ── Recent score row ─────────────────────────────────────────
const ScoreRow = ({ s, i }) => {
  const isMemory = s.gameType === "memory-cards" || !s.gameType;
  const isQuiz   = s.gameType === "quiz";

  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-xl text-sm"
      style={{ background: i === 0 ? "#fef9ec" : "#f9fafb", border: `1px solid ${i === 0 ? "#fde68a" : "#e5e7eb"}`, marginBottom: "0.35rem" }}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold w-5 text-center text-gray-400">#{i + 1}</span>
        <span className="text-base">{isQuiz ? "🧠" : "🃏"}</span>
        <div>
          {isMemory && (
            <p className="text-xs font-semibold text-gray-800">
              {(s.score >= 1 && s.score <= 3) ? STARS[s.score] : "⭐"}{" "}
              {s.score > 0 ? `${s.score} star${s.score !== 1 ? "s" : ""}` : "—"}
            </p>
          )}
          {isQuiz && (
            <p className="text-xs font-semibold text-gray-800">
              {s.percentage ?? 0}%{s.quizTopic ? ` — ${s.quizTopic}` : ""}
            </p>
          )}
          <p className="text-xs text-gray-400">{fmtDate(s.createdAt)}</p>
        </div>
      </div>
      <div className="text-xs font-semibold">
        {isMemory && s.score > 0 && (
          <span className="px-2 py-0.5 rounded-full" style={{ background: "#fef3c7", color: "#92400e" }}>
            {s.score}/3 ⭐
          </span>
        )}
        {isQuiz && s.correctAnswers != null && (
          <span className="px-2 py-0.5 rounded-full" style={{ background: "#fce8f0", color: "#be2a6a" }}>
            {s.correctAnswers}/{s.totalQuestions} ✅
          </span>
        )}
      </div>
    </div>
  );
};

// ── Child expanded row ───────────────────────────────────────
const ChildScoreRow = ({ entry, index }) => {
  const [open, setOpen] = useState(false);

  const memBest  = entry.bestMemoryScore;
  const quizBest = entry.bestQuizPct;

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-violet-50/40 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}>
        <td className="py-3 px-4 text-sm text-gray-500">{index + 1}</td>

        {/* Child name */}
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #a97ff5, #7c3aed)" }}>
              {entry.child?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{entry.child?.name || "—"}</p>
              <p className="text-xs text-gray-400">{entry.child?.category || "—"}</p>
            </div>
          </div>
        </td>

        {/* Total games */}
        <td className="py-3 px-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: "#f5f3ff", color: "#7c3aed" }}>
            {entry.totalGames} game{entry.totalGames !== 1 ? "s" : ""}
          </span>
        </td>

        {/* Memory best */}
        <td className="py-3 px-4">
          {entry.memoryGames > 0 ? (
            <div>
              <span className="text-sm">{STARS[memBest] || "⭐"}</span>
              <span className="text-xs text-gray-500 ml-1">{entry.memoryGames} played</span>
            </div>
          ) : <span className="text-xs text-gray-400">—</span>}
        </td>

        {/* Quiz best */}
        <td className="py-3 px-4">
          {entry.quizGames > 0 ? (
            <div className="flex items-center gap-1">
              <span className="text-base">{medal(quizBest)}</span>
              <span className="text-sm font-bold" style={{ color: "#be2a6a" }}>{quizBest}%</span>
              <span className="text-xs text-gray-500">({entry.quizGames} played)</span>
            </div>
          ) : <span className="text-xs text-gray-400">—</span>}
        </td>

        {/* Expand */}
        <td className="py-3 px-4 text-gray-400">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>

      {/* ── Expanded: recent scores ── */}
      {open && (
        <tr className="bg-violet-50/20">
          <td colSpan={6} className="px-6 pb-5 pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Memory Match */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-violet-700 mb-3 flex items-center gap-1.5 text-sm">
                  🃏 Memory Match
                </h4>
                {entry.memoryGames > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { label: "Played", value: entry.memoryGames },
                        { label: "Best",   value: STARS[memBest] || "⭐" },
                        { label: "Avg Moves", value: entry.avgMoves > 0 ? entry.avgMoves : "—" },
                      ].map(({ label, value }) => (
                        <div key={label} className="rounded-lg p-2 text-center" style={{ background: "#f5f3ff" }}>
                          <div className="text-sm font-bold text-violet-700">{value}</div>
                          <div className="text-xs text-gray-500">{label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Recent</p>
                    {entry.raw?.filter(s => s.gameType === "memory-cards" || !s.gameType).slice(0, 4).map((s, i) => (
                      <ScoreRow key={s._id} s={s} i={i} />
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-400">No memory games played.</p>
                )}
              </div>

              {/* Health Quiz */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-pink-700 mb-3 flex items-center gap-1.5 text-sm">
                  🧠 Health Quiz
                </h4>
                {entry.quizGames > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { label: "Played",   value: entry.quizGames },
                        { label: "Best",     value: `${quizBest}%` },
                        { label: "Avg",      value: `${entry.avgQuizPct || 0}%` },
                      ].map(({ label, value }) => (
                        <div key={label} className="rounded-lg p-2 text-center" style={{ background: "#fce8f0" }}>
                          <div className="text-sm font-bold text-pink-700">{value}</div>
                          <div className="text-xs text-gray-500">{label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Recent</p>
                    {entry.raw?.filter(s => s.gameType === "quiz").slice(0, 4).map((s, i) => (
                      <ScoreRow key={s._id} s={s} i={i} />
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-400">No quizzes played.</p>
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
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function GameScoresPage() {
  const [data,    setData]    = useState([]);   // processed entries
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [search,  setSearch]  = useState("");
  const [tab,     setTab]     = useState("all"); // "all" | "memory" | "quiz"

  const token = sessionStorage.getItem("adminToken");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/api/v1/games/admin/all-scores`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const json = await res.json();
      if (!json.success) { setError(json.message || "Failed to load"); return; }

      // Build a per-child map with raw scores attached
      const summaryMap = {};
      (json.data || []).forEach(entry => {
        const id = String(entry.child?._id);
        summaryMap[id] = {
          ...entry,
          totalGames: (entry.memoryGames || 0) + (entry.quizGames || 0),
          avgMoves:   entry.avgMoves || 0,
          avgQuizPct: entry.avgQuizPct || 0,
          raw: [],
        };
      });

      // Attach raw scores
      (json.raw || []).forEach(s => {
        const id = String(s.childId?._id || s.childId);
        if (summaryMap[id]) summaryMap[id].raw.push(s);
      });

      setData(Object.values(summaryMap).sort((a, b) => b.totalGames - a.totalGames));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── filter ────────────────────────────────────────────────
  const q = search.toLowerCase().trim();
  const filtered = useMemo(() => {
    let list = data;
    if (tab === "memory") list = list.filter(e => e.memoryGames > 0);
    if (tab === "quiz")   list = list.filter(e => e.quizGames > 0);
    if (!q) return list;
    return list.filter(e =>
      e.child?.name?.toLowerCase().includes(q) ||
      e.child?.email?.toLowerCase().includes(q) ||
      e.child?.category?.toLowerCase().includes(q)
    );
  }, [data, tab, q]);

  // ── summary counts ────────────────────────────────────────
  const totalGames  = data.reduce((a, e) => a + e.totalGames, 0);
  const memPlayers  = data.filter(e => e.memoryGames > 0).length;
  const quizPlayers = data.filter(e => e.quizGames  > 0).length;

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-violet-600">
      <div className="w-6 h-6 border-3 border-violet-600 border-t-transparent rounded-full animate-spin" />
      <span className="font-medium">Loading game scores…</span>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center h-64 flex-col gap-3">
      <AlertCircle size={40} className="text-red-400" />
      <p className="text-red-500 font-medium">{error}</p>
      <button onClick={fetchData} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700">
        Retry
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-6">

      {/* ── Header ── */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Game Scores
            </h1>
            <p className="text-gray-500 mt-1 text-sm">All children's Memory Match and Health Quiz scores</p>
          </div>
          <button onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-50 text-violet-700 rounded-xl text-sm font-semibold hover:bg-violet-100 transition-colors">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {/* Summary stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {[
            { label: "Total Games",     value: totalGames,        color: "#7c3aed", emoji: "🎮" },
            { label: "Children Active", value: data.length,       color: "#22c55e", emoji: "👦" },
            { label: "Memory Players",  value: memPlayers,        color: "#a97ff5", emoji: "🃏" },
            { label: "Quiz Players",    value: quizPlayers,       color: "#e0508e", emoji: "🧠" },
          ].map(({ label, value, color, emoji }) => (
            <div key={label} className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: `${color}10`, border: `1px solid ${color}25` }}>
              <span className="text-2xl">{emoji}</span>
              <div>
                <p className="text-2xl font-bold" style={{ color }}>{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs + Search ── */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
            {[
              { id: "all",    label: "All Games", emoji: "🎮" },
              { id: "memory", label: "Memory",    emoji: "🃏" },
              { id: "quiz",   label: "Quiz",      emoji: "🧠" },
            ].map(({ id, label, emoji }) => (
              <button key={id} onClick={() => { setTab(id); setSearch(""); }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                style={tab === id
                  ? { background: "white", color: "#7c3aed", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                  : { color: "#6b7280" }}>
                {emoji} {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, category…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300 bg-gray-50" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <span className="text-4xl block mb-3">🎮</span>
            <p>No game scores found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-violet-50 to-purple-50 text-xs uppercase text-violet-600 tracking-wide">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Child</th>
                  <th className="py-3 px-4">Total Games</th>
                  <th className="py-3 px-4">🃏 Best Memory</th>
                  <th className="py-3 px-4">🧠 Best Quiz</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry, i) => (
                  <ChildScoreRow key={String(entry.child?._id)} entry={entry} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
