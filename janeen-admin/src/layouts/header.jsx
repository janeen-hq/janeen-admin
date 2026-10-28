import { useTheme } from "@/hooks/use-theme";
import { ChevronsLeft, Search, LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Header = ({ collapsed, setCollapsed }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/login");
    };

    return (
        <header
            className="relative z-10 flex h-[64px] items-center justify-between px-4 transition-all duration-300"
            style={{
                background: "rgba(253,246,244,0.85)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderBottom: "1px solid rgba(233,30,140,0.12)",
                boxShadow: "0 2px 16px rgba(233,30,140,0.07)",
            }}
        >
            {/* ── LEFT ── */}
            <div className="flex items-center gap-x-3">
                {/* Sidebar toggle */}
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label="Toggle sidebar"
                >
                    <ChevronsLeft
                        size={20}
                        className="transition-transform duration-300"
                        style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                </button>

                {/* Search bar */}
                <div className="input">
                    <Search size={18} style={{ color: "#E91E8C", opacity: 0.6 }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent text-sm text-slate-700 outline-0 placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="flex items-center gap-x-3">
                {/* Notification bell */}
                <button
                    className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-200"
                    style={{ background: "rgba(233,30,140,0.06)" }}
                    aria-label="Notifications"
                >
                    <Bell size={18} style={{ color: "#C2185B" }} />
                    {/* unread dot */}
                    <span
                        className="absolute right-2 top-2 h-2 w-2 rounded-full"
                        style={{ background: "#E91E8C", boxShadow: "0 0 6px rgba(233,30,140,0.6)" }}
                    />
                </button>

                {/* Divider */}
                <div className="h-8 w-px" style={{ background: "rgba(233,30,140,0.15)" }} />

                {/* Admin info */}
                <div className="hidden text-right sm:block">
                    <div className="text-sm font-bold" style={{ color: "#3D2B4E" }}>
                        Admin
                    </div>
                    <div className="text-xs font-medium" style={{ color: "#E91E8C" }}>
                        Administrator
                    </div>
                </div>

                {/* Avatar */}
                <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl font-bold text-sm text-white shadow-md"
                    style={{
                        background: "linear-gradient(135deg, #E91E8C 0%, #7B1FA2 50%, #00BCD4 100%)",
                        boxShadow: "0 4px 12px rgba(233,30,140,0.3)",
                    }}
                >
                    A
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                        borderColor: "rgba(233,30,140,0.2)",
                        background: "rgba(233,30,140,0.05)",
                        color: "#C2185B",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(233,30,140,0.12)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(233,30,140,0.05)";
                    }}
                    aria-label="Logout"
                >
                    <LogOut size={15} />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
