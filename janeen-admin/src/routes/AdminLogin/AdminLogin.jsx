import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Floating bubbles – same style as the main layout */
const LoginBubbles = () => (
    <div className="bubbles-container" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="bubble" />
        ))}
    </div>
);

const AdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState("");
    const [showPw, setShowPw]     = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:8080/api/v1/users/adult/loginUser",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Invalid email or password");

            sessionStorage.setItem("adminToken", data.data.token);
            sessionStorage.setItem("user", JSON.stringify(data.data.user));

            navigate("/");
        } catch (err) {
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen overflow-hidden flex items-center justify-center px-4"
            style={{
                background: "linear-gradient(135deg, #FDF6F4 0%, #FCE4EC 30%, #EDE7F6 60%, #E0F7FA 100%)",
            }}
        >
            {/* Animated bubbles */}
            <LoginBubbles />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md">

                {/* ── Brand header ── */}
                <div className="mb-8 text-center">
                    <div className="relative mx-auto mb-4 inline-flex">
                        <img
                            src="https://res.cloudinary.com/dkle20hdb/image/upload/v1792224030/janeenLogo_tqhqtv.png"
                            alt="Janeen Logo"
                            className="h-20 w-20 rounded-2xl object-cover"
                            style={{ boxShadow: "0 8px 32px rgba(233,30,140,0.35)" }}
                        />
                        {/* glow ring */}
                        <span
                            className="absolute inset-0 rounded-2xl animate-ping"
                            style={{ background: "rgba(233,30,140,0.15)", animationDuration: "2.5s" }}
                        />
                    </div>

                    <h1
                        className="text-4xl font-extrabold tracking-wide"
                        style={{
                            background: "linear-gradient(135deg, #C2185B 0%, #7B1FA2 50%, #0097A7 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        JANEEN
                    </h1>
                    <p className="mt-1 text-sm font-medium" style={{ color: "#9C7CAF" }}>
                        Admin Dashboard · Sign in to continue
                    </p>
                </div>

                {/* ── Form card ── */}
                <div
                    className="rounded-3xl p-8 shadow-2xl"
                    style={{
                        background: "rgba(255,255,255,0.80)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(233,30,140,0.15)",
                        boxShadow: "0 20px 60px rgba(233,30,140,0.12), 0 4px 16px rgba(0,188,212,0.08)",
                    }}
                >
                    {/* top gradient line */}
                    <div
                        className="mb-6 h-1 rounded-full"
                        style={{ background: "linear-gradient(90deg, #E91E8C 0%, #9C27B0 50%, #00BCD4 100%)" }}
                    />

                    {error && (
                        <div
                            className="mb-5 flex items-start gap-2 rounded-xl p-3 text-sm"
                            style={{
                                background: "rgba(233,30,140,0.06)",
                                border: "1px solid rgba(233,30,140,0.2)",
                                color: "#C2185B",
                            }}
                        >
                            <span className="mt-0.5 flex-shrink-0">⚠</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-semibold"
                                style={{ color: "#5D4E6D" }}
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@example.com"
                                className="w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200"
                                style={{
                                    borderColor: "rgba(233,30,140,0.2)",
                                    background: "rgba(253,246,244,0.8)",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#E91E8C";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(233,30,140,0.12)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "rgba(233,30,140,0.2)";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-semibold"
                                style={{ color: "#5D4E6D" }}
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPw ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition-all duration-200"
                                    style={{
                                        borderColor: "rgba(233,30,140,0.2)",
                                        background: "rgba(253,246,244,0.8)",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#E91E8C";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(233,30,140,0.12)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "rgba(233,30,140,0.2)";
                                        e.target.style.boxShadow = "none";
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium select-none"
                                    style={{ color: "#E91E8C" }}
                                    tabIndex={-1}
                                >
                                    {showPw ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full overflow-hidden rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                                background: "linear-gradient(135deg, #E91E8C 0%, #9C27B0 50%, #00BCD4 100%)",
                                boxShadow: "0 8px 24px rgba(233,30,140,0.35)",
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer note */}
                <div
                    className="mt-6 text-center text-xs"
                    style={{ color: "#9C7CAF" }}
                >
                    © {new Date().getFullYear()} Janeen Admin Panel · All rights reserved
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
