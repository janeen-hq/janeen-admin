export const Footer = () => {
    return (
        <footer
            className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-5 py-3"
            style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderColor: "rgba(233,30,140,0.12)",
            }}
        >
            {/* Brand */}
            <div className="flex items-center gap-2">
                <img
                    src="https://res.cloudinary.com/dkle20hdb/image/upload/v1792224030/janeenLogo_tqhqtv.png"
                    alt="Janeen"
                    className="h-6 w-6 rounded-lg object-cover"
                />
                <p className="text-sm font-semibold" style={{ color: "#5D4E6D" }}>
                    © 2025{" "}
                    <span
                        style={{
                            background: "linear-gradient(135deg, #C2185B 0%, #7B1FA2 50%, #0097A7 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Janeen
                    </span>{" "}
                    — All Rights Reserved
                </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-x-4">
                <a href="#" className="link">Privacy Policy</a>
                <a href="#" className="link">Terms of Service</a>
            </div>
        </footer>
    );
};
