import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "@/constants";
import { cn } from "@/utils/cn";
import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full flex-col overflow-x-hidden [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1)]",
                "w-[240px] border-r",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
            style={{
                background: "linear-gradient(180deg, #FDF6F4 0%, #FCE4EC 40%, #E0F7FA 100%)",
                borderColor: "rgba(233,30,140,0.15)",
                boxShadow: "2px 0 20px rgba(233,30,140,0.08)",
            }}
        >
            {/* ── LOGO AREA ── */}
            <div
                className="flex items-center gap-x-3 border-b p-4"
                style={{ borderColor: "rgba(233,30,140,0.12)" }}
            >
                {!collapsed ? (
                    /* Full logo */
                    <div className="flex items-center gap-x-3 min-w-0">
                        <div className="relative flex-shrink-0">
                            <img
                                src="https://res.cloudinary.com/dkle20hdb/image/upload/v1792224030/janeenLogo_tqhqtv.png"
                                alt="Janeen Logo"
                                className="h-10 w-10 rounded-xl object-cover shadow-md"
                                style={{ boxShadow: "0 4px 12px rgba(233,30,140,0.3)" }}
                            />
                            {/* pulse ring */}
                            <span
                                className="absolute inset-0 rounded-xl animate-ping"
                                style={{ background: "rgba(233,30,140,0.15)", animationDuration: "2.5s" }}
                            />
                        </div>
                        <div className="min-w-0">
                            <p
                                className="text-lg font-extrabold leading-tight tracking-wide truncate"
                                style={{
                                    background: "linear-gradient(135deg, #C2185B 0%, #7B1FA2 50%, #0097A7 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                JANEEN
                            </p>
                            <p className="text-[10px] font-medium tracking-widest" style={{ color: "#E91E8C", opacity: 0.7 }}>
                                ADMIN PANEL
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Collapsed – icon only */
                    <div className="relative flex-shrink-0">
                        <img
                            src="https://res.cloudinary.com/dkle20hdb/image/upload/v1792224030/janeenLogo_tqhqtv.png"
                            alt="Janeen Logo"
                            className="h-9 w-9 rounded-xl object-cover shadow-md"
                            style={{ boxShadow: "0 4px 12px rgba(233,30,140,0.3)" }}
                        />
                    </div>
                )}
            </div>

            {/* ── NAV LINKS ── */}
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]"
                style={{ scrollbarColor: "rgba(233,30,140,0.3) transparent" }}
            >
                {navbarLinks.map((navbarLink) => (
                    <nav
                        key={navbarLink.title}
                        className={cn("sidebar-group", collapsed && "md:items-center")}
                    >
                        {!collapsed && (
                            <p className="sidebar-group-title px-1">{navbarLink.title}</p>
                        )}
                        {navbarLink.links.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.path}
                                end={link.end}
                                className={({ isActive }) =>
                                    cn(
                                        "sidebar-item",
                                        collapsed && "md:w-[45px] md:justify-center",
                                        isActive && "active",
                                    )
                                }
                                title={collapsed ? link.label : undefined}
                            >
                                <link.icon size={20} className="flex-shrink-0" />
                                {!collapsed && (
                                    <p className="whitespace-nowrap text-sm">{link.label}</p>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>

            {/* ── BOTTOM BRAND STRIP ── */}
            {!collapsed && (
                <div
                    className="mt-auto border-t p-4"
                    style={{ borderColor: "rgba(233,30,140,0.12)" }}
                >
                    <div
                        className="flex items-center gap-2 rounded-xl px-3 py-2"
                        style={{ background: "linear-gradient(135deg, rgba(233,30,140,0.08) 0%, rgba(0,188,212,0.08) 100%)" }}
                    >
                        <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#E91E8C" }} />
                        <span className="text-xs font-medium" style={{ color: "#9C27B0" }}>
                            Wellness Platform
                        </span>
                    </div>
                </div>
            )}
        </aside>
    );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};
