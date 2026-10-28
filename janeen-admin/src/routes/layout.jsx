import { Outlet } from "react-router-dom";

import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";

import { Sidebar } from "@/layouts/sidebar";
import { Header } from "@/layouts/header";

import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

/* ── Animated floating bubbles ── */
const BubblesBackground = () => (
    <div className="bubbles-container" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="bubble" />
        ))}
    </div>
);

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    return (
        <div
            className="relative min-h-screen overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #FDF6F4 0%, #FCE4EC 30%, #EDE7F6 60%, #E0F7FA 100%)",
            }}
        >
            {/* Animated background bubbles (behind everything) */}
            <BubblesBackground />

            {/* Mobile overlay */}
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 z-[90] bg-black opacity-0 transition-opacity duration-300",
                    !collapsed && "max-md:pointer-events-auto max-md:opacity-30",
                )}
            />

            {/* Sidebar */}
            <Sidebar ref={sidebarRef} collapsed={collapsed} />

            {/* Main content area */}
            <div
                className={cn(
                    "relative z-10 transition-[margin] duration-300",
                    collapsed ? "md:ml-[70px]" : "md:ml-[240px]",
                )}
            >
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />

                {/* Page content */}
                <main className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
