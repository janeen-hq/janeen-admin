// // import { useState, useEffect, useCallback } from "react";

// // // const API_BASE = "http://localhost:8080/api/v1/content";

// // // // ─── Axios-like fetch helper ─────────────────────────────────────────────────
// // // const api = {
// // //   get: (url) => fetch(url).then((r) => r.json()),
// // //   post: (url, data) =>
// // //     fetch(url, {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify(data),
// // //     }).then((r) => r.json()),
// // //   put: (url, data) =>
// // //     fetch(url, {
// // //       method: "PUT",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify(data),
// // //     }).then((r) => r.json()),
// // //   delete: (url) => fetch(url, { method: "DELETE" }).then((r) => r.json()),
// // // };

// // const API_BASE = "http://localhost:8080/api/v1/content";

// // const getHeaders = () => {
// //   const token = sessionStorage.getItem("adminToken");

// //   return {
// //     "Content-Type": "application/json",
// //     Authorization: `Bearer ${token}`, // 👈 add token here
// //   };
// // };

// // const api = {
// //   get: (url) =>
// //     fetch(url, {
// //       headers: getHeaders(),
// //     }).then((r) => r.json()),

// //   post: (url, data) =>
// //     fetch(url, {
// //       method: "POST",
// //       headers: getHeaders(),
// //       body: JSON.stringify(data),
// //     }).then((r) => r.json()),

// //   put: (url, data) =>
// //     fetch(url, {
// //       method: "PUT",
// //       headers: getHeaders(),
// //       body: JSON.stringify(data),
// //     }).then((r) => r.json()),

// //   delete: (url) =>
// //     fetch(url, {
// //       method: "DELETE",
// //       headers: getHeaders(),
// //     }).then((r) => r.json()),
// // };

// // // ─── Toast ───────────────────────────────────────────────────────────────────
// // function Toast({ toasts, removeToast }) {
// //   return (
// //     <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
// //       {toasts.map((t) => (
// //         <div
// //           key={t.id}
// //           onClick={() => removeToast(t.id)}
// //           style={{
// //             padding: "12px 18px",
// //             borderRadius: 10,
// //             fontSize: 13,
// //             fontWeight: 500,
// //             cursor: "pointer",
// //             background: t.type === "success" ? "#1a7f5a" : t.type === "error" ? "#c0392b" : "#2d5fa3",
// //             color: "#fff",
// //             boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
// //             maxWidth: 300,
// //             animation: "slideIn 0.2s ease",
// //           }}
// //         >
// //           {t.message}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // // ─── Confirm Modal ───────────────────────────────────────────────────────────
// // function ConfirmModal({ message, onConfirm, onCancel }) {
// //   return (
// //     <div
// //       style={{
// //         position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 8000,
// //         display: "flex", alignItems: "center", justifyContent: "center",
// //       }}
// //       onClick={onCancel}
// //     >
// //       <div
// //         onClick={(e) => e.stopPropagation()}
// //         style={{
// //           background: "#fff", borderRadius: 14, padding: "28px 32px",
// //           maxWidth: 380, width: "90%", boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
// //         }}
// //       >
// //         <p style={{ fontSize: 15, color: "#1a1a2e", marginBottom: 24, lineHeight: 1.5 }}>{message}</p>
// //         <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
// //           <button onClick={onCancel} style={styles.btnSecondary}>Cancel</button>
// //           <button onClick={onConfirm} style={{ ...styles.btnPrimary, background: "#c0392b", border: "none", color: "#fff" }}>
// //             Delete
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Stage Form Modal ────────────────────────────────────────────────────────
// // function StageModal({ categoryId, stage, onClose, onSaved, showToast }) {
// //   const isEdit = !!stage;
// //   const [loading, setLoading] = useState(false);
// //   const [form, setForm] = useState({
// //     title: stage?.title || "",
// //     startMonth: stage?.startMonth ?? "",
// //     endMonth: stage?.endMonth ?? "",
// //     babySize: stage?.babySize || "",
// //     development: stage?.development || "",
// //     tips: stage?.tips || "",
// //     sections: stage?.sections?.map((s) => ({
// //       heading: s.heading,
// //       points: s.points.map((p) => p.text || p),
// //     })) || [{ heading: "", points: [""] }],
// //   });

// //   const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

// //   const addSection = () =>
// //     setForm((f) => ({ ...f, sections: [...f.sections, { heading: "", points: [""] }] }));
// //   const removeSection = (si) =>
// //     setForm((f) => ({ ...f, sections: f.sections.filter((_, i) => i !== si) }));
// //   const setSectionHeading = (si, val) =>
// //     setForm((f) => {
// //       const s = [...f.sections];
// //       s[si] = { ...s[si], heading: val };
// //       return { ...f, sections: s };
// //     });
// //   const addPoint = (si) =>
// //     setForm((f) => {
// //       const s = [...f.sections];
// //       s[si] = { ...s[si], points: [...s[si].points, ""] };
// //       return { ...f, sections: s };
// //     });
// //   const setPoint = (si, pi, val) =>
// //     setForm((f) => {
// //       const s = [...f.sections];
// //       const pts = [...s[si].points];
// //       pts[pi] = val;
// //       s[si] = { ...s[si], points: pts };
// //       return { ...f, sections: s };
// //     });
// //   const removePoint = (si, pi) =>
// //     setForm((f) => {
// //       const s = [...f.sections];
// //       s[si] = { ...s[si], points: s[si].points.filter((_, i) => i !== pi) };
// //       return { ...f, sections: s };
// //     });

// //   const handleSubmit = async () => {
// //     if (!form.title.trim()) return showToast("Title is required", "error");
// //     setLoading(true);
// //     const payload = {
// //       ...form,
// //       startMonth: Number(form.startMonth),
// //       endMonth: Number(form.endMonth),
// //       sections: form.sections.map((s) => ({
// //         heading: s.heading,
// //         points: s.points.filter((p) => p.trim()).map((p) => ({ text: p })),
// //       })),
// //     };
// //     try {
// //       const url = isEdit
// //         ? `${API_BASE}/category/${categoryId}/stage/${stage._id}`
// //         : `${API_BASE}/category/${categoryId}/stage`;
// //       const res = isEdit ? await api.put(url, payload) : await api.post(url, payload);
// //       if (res.success) {
// //         showToast(isEdit ? "Stage updated!" : "Stage created!", "success");
// //         onSaved(res.data);
// //       } else {
// //         showToast(res.message || "Something went wrong", "error");
// //       }
// //     } catch {
// //       showToast("Network error", "error");
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div
// //       style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 7000, overflowY: "auto", padding: "40px 16px" }}
// //       onClick={onClose}
// //     >
// //       <div
// //         onClick={(e) => e.stopPropagation()}
// //         style={{ background: "#fff", borderRadius: 16, maxWidth: 640, margin: "0 auto", padding: "32px 28px" }}
// //       >
// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
// //           <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
// //             {isEdit ? "Edit Stage" : "Add New Stage"}
// //           </h2>
// //           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#888" }}>×</button>
// //         </div>

// //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 16px" }}>
// //           <div style={{ gridColumn: "1/-1" }}>
// //             <label style={styles.label}>Stage Title *</label>
// //             <input style={styles.input} value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="e.g. First Trimester" />
// //           </div>
// //           <div>
// //             <label style={styles.label}>Start Month</label>
// //             <input style={styles.input} type="number" value={form.startMonth} onChange={(e) => setField("startMonth", e.target.value)} placeholder="1" />
// //           </div>
// //           <div>
// //             <label style={styles.label}>End Month</label>
// //             <input style={styles.input} type="number" value={form.endMonth} onChange={(e) => setField("endMonth", e.target.value)} placeholder="3" />
// //           </div>
// //           <div style={{ gridColumn: "1/-1" }}>
// //             <label style={styles.label}>Baby Size</label>
// //             <input style={styles.input} value={form.babySize} onChange={(e) => setField("babySize", e.target.value)} placeholder="poppy seed to peach" />
// //           </div>
// //           <div style={{ gridColumn: "1/-1" }}>
// //             <label style={styles.label}>Development</label>
// //             <textarea style={{ ...styles.input, height: 80, resize: "vertical" }} value={form.development} onChange={(e) => setField("development", e.target.value)} placeholder="Describe baby development..." />
// //           </div>
// //           <div style={{ gridColumn: "1/-1" }}>
// //             <label style={styles.label}>Tips</label>
// //             <textarea style={{ ...styles.input, height: 60, resize: "vertical" }} value={form.tips} onChange={(e) => setField("tips", e.target.value)} placeholder="Health tip for this stage..." />
// //           </div>
// //         </div>

// //         {/* Sections */}
// //         <div style={{ marginTop: 22 }}>
// //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //             <label style={{ ...styles.label, marginBottom: 0, fontWeight: 600, fontSize: 13 }}>Sections</label>
// //             <button onClick={addSection} style={styles.addBtn}>+ Add Section</button>
// //           </div>
// //           {form.sections.map((sec, si) => (
// //             <div key={si} style={{ border: "1px solid #e8eaf0", borderRadius: 10, padding: "14px 16px", marginBottom: 12, background: "#f8f9fd" }}>
// //               <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
// //                 <input
// //                   style={{ ...styles.input, flex: 1, background: "#fff" }}
// //                   value={sec.heading}
// //                   onChange={(e) => setSectionHeading(si, e.target.value)}
// //                   placeholder="Section heading (e.g. Maternal Changes)"
// //                 />
// //                 <button onClick={() => removeSection(si)} style={styles.removeBtn}>✕</button>
// //               </div>
// //               {sec.points.map((pt, pi) => (
// //                 <div key={pi} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
// //                   <input
// //                     style={{ ...styles.input, flex: 1, background: "#fff", fontSize: 13 }}
// //                     value={pt}
// //                     onChange={(e) => setPoint(si, pi, e.target.value)}
// //                     placeholder={`Point ${pi + 1}`}
// //                   />
// //                   <button onClick={() => removePoint(si, pi)} style={styles.removeBtn}>✕</button>
// //                 </div>
// //               ))}
// //               <button onClick={() => addPoint(si)} style={{ ...styles.addBtn, fontSize: 12, marginTop: 4 }}>+ Add Point</button>
// //             </div>
// //           ))}
// //         </div>

// //         <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
// //           <button onClick={onClose} style={styles.btnSecondary}>Cancel</button>
// //           <button onClick={handleSubmit} disabled={loading} style={{ ...styles.btnPrimary, opacity: loading ? 0.7 : 1 }}>
// //             {loading ? "Saving..." : isEdit ? "Update Stage" : "Create Stage"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Category Detail Panel ───────────────────────────────────────────────────
// // function CategoryDetail({ category, onBack, showToast, onCategoryUpdate }) {
// //   const [stageModal, setStageModal] = useState(null); // null | "create" | stageObj
// //   const [confirm, setConfirm] = useState(null);
// //   const [expandedStage, setExpandedStage] = useState(null);

// //   const handleStageSaved = (updatedCat) => {
// //     onCategoryUpdate(updatedCat);
// //     setStageModal(null);
// //   };

// //   const handleDeleteStage = async (stageId) => {
// //     try {
// //       const res = await api.delete(`${API_BASE}/category/${category._id}/stage/${stageId}`);
// //       if (res.success) {
// //         showToast("Stage deleted", "success");
// //         onCategoryUpdate(res.data);
// //       } else {
// //         showToast(res.message || "Delete failed", "error");
// //       }
// //     } catch {
// //       showToast("Network error", "error");
// //     }
// //     setConfirm(null);
// //   };

// //   return (
// //     <div>
// //       {stageModal !== null && (
// //         <StageModal
// //           categoryId={category._id}
// //           stage={stageModal === "create" ? null : stageModal}
// //           onClose={() => setStageModal(null)}
// //           onSaved={handleStageSaved}
// //           showToast={showToast}
// //         />
// //       )}
// //       {confirm && (
// //         <ConfirmModal
// //           message={`Delete stage "${confirm.title}"? This cannot be undone.`}
// //           onConfirm={() => handleDeleteStage(confirm._id)}
// //           onCancel={() => setConfirm(null)}
// //         />
// //       )}

// //       {/* Header */}
// //       <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
// //         <button onClick={onBack} style={{ background: "none", border: "1px solid #dde2f0", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
// //           ← Back
// //         </button>
// //         <div>
// //           <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#1a1a2e", textTransform: "capitalize" }}>{category.category}</h2>
// //           <p style={{ margin: 0, fontSize: 12, color: "#888", marginTop: 2 }}>
// //             {category.stages.length} stage{category.stages.length !== 1 ? "s" : ""} · ID: {category._id}
// //           </p>
// //         </div>
// //         <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
// //           <span style={{
// //             padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
// //             background: category.isActive ? "#e6f9f0" : "#fdecea",
// //             color: category.isActive ? "#1a7f5a" : "#c0392b",
// //           }}>
// //             {category.isActive ? "Active" : "Inactive"}
// //           </span>
// //           <button onClick={() => setStageModal("create")} style={styles.btnPrimary}>
// //             + Add Stage
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stages */}
// //       {category.stages.length === 0 ? (
// //         <div style={styles.emptyState}>
// //           <div style={{ fontSize: 40, marginBottom: 12 }}>📖</div>
// //           <p style={{ color: "#888", fontSize: 14 }}>No stages yet. Add your first stage to get started.</p>
// //           <button onClick={() => setStageModal("create")} style={{ ...styles.btnPrimary, marginTop: 12 }}>+ Add Stage</button>
// //         </div>
// //       ) : (
// //         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
// //           {category.stages.map((stage) => (
// //             <div key={stage._id} style={styles.stageCard}>
// //               <div
// //                 style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
// //                 onClick={() => setExpandedStage(expandedStage === stage._id ? null : stage._id)}
// //               >
// //                 <div style={{ width: 48, height: 48, borderRadius: 12, background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// //                   <span style={{ fontSize: 12, fontWeight: 700, color: "#3b5bdb" }}>
// //                     M{stage.startMonth}–{stage.endMonth}
// //                   </span>
// //                 </div>
// //                 <div style={{ flex: 1 }}>
// //                   <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>{stage.title}</p>
// //                   <p style={{ margin: 0, fontSize: 12, color: "#888", marginTop: 2 }}>
// //                     Baby size: {stage.babySize} · {stage.sections.length} section{stage.sections.length !== 1 ? "s" : ""}
// //                   </p>
// //                 </div>
// //                 <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
// //                   <button onClick={(e) => { e.stopPropagation(); setStageModal(stage); }} style={styles.editBtn}>Edit</button>
// //                   <button onClick={(e) => { e.stopPropagation(); setConfirm(stage); }} style={styles.deleteBtn}>Delete</button>
// //                   <span style={{ color: "#aaa", fontSize: 18, userSelect: "none" }}>{expandedStage === stage._id ? "▲" : "▼"}</span>
// //                 </div>
// //               </div>

// //               {expandedStage === stage._id && (
// //                 <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #f0f2f8" }}>
// //                   {stage.development && (
// //                     <div style={{ marginBottom: 14 }}>
// //                       <p style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Development</p>
// //                       <p style={{ fontSize: 14, color: "#444", lineHeight: 1.6, margin: 0 }}>{stage.development}</p>
// //                     </div>
// //                   )}
// //                   {stage.tips && (
// //                     <div style={{ marginBottom: 14, background: "#fffbea", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px" }}>
// //                       <p style={{ fontSize: 12, fontWeight: 600, color: "#b7791f", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Tip</p>
// //                       <p style={{ fontSize: 13, color: "#78350f", margin: 0 }}>{stage.tips}</p>
// //                     </div>
// //                   )}
// //                   {stage.sections.length > 0 && (
// //                     <div>
// //                       <p style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Sections</p>
// //                       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
// //                         {stage.sections.map((sec) => (
// //                           <div key={sec._id} style={{ background: "#f8f9fd", borderRadius: 10, padding: "12px 14px", border: "1px solid #e8eaf0" }}>
// //                             <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 13, color: "#1a1a2e" }}>{sec.heading}</p>
// //                             <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
// //                               {sec.points.map((pt) => (
// //                                 <li key={pt._id} style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{pt.text}</li>
// //                               ))}
// //                             </ul>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // ─── Category Form ───────────────────────────────────────────────────────────
// // function CategoryFormModal({ category, onClose, onSaved, showToast }) {
// //   const isEdit = !!category;
// //   const [loading, setLoading] = useState(false);
// //   const [name, setName] = useState(category?.category || "");
// //   const [isActive, setIsActive] = useState(category?.isActive ?? true);

// //   const handleSubmit = async () => {
// //     if (!name.trim()) return showToast("Category name is required", "error");
// //     setLoading(true);
// //     try {
// //       const payload = { category: name.trim(), isActive };
// //       const res = isEdit
// //         ? await api.put(`${API_BASE}/category/${category._id}`, payload)
// //         : await api.post(`${API_BASE}/category`, payload);
// //       if (res.success) {
// //         showToast(isEdit ? "Category updated!" : "Category created!", "success");
// //         onSaved(res.data);
// //       } else {
// //         showToast(res.message || "Something went wrong", "error");
// //       }
// //     } catch {
// //       showToast("Network error", "error");
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div
// //       style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 7000, display: "flex", alignItems: "center", justifyContent: "center" }}
// //       onClick={onClose}
// //     >
// //       <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "32px 28px", maxWidth: 420, width: "90%" }}>
// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
// //           <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>{isEdit ? "Edit Category" : "New Category"}</h2>
// //           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#888" }}>×</button>
// //         </div>
// //         <div style={{ marginBottom: 16 }}>
// //           <label style={styles.label}>Category Name *</label>
// //           <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. pregnancy, newborn, toddler" />
// //         </div>
// //         <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
// //           <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer" }} />
// //           <label htmlFor="isActive" style={{ fontSize: 14, color: "#444", cursor: "pointer" }}>Active</label>
// //         </div>
// //         <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
// //           <button onClick={onClose} style={styles.btnSecondary}>Cancel</button>
// //           <button onClick={handleSubmit} disabled={loading} style={{ ...styles.btnPrimary, opacity: loading ? 0.7 : 1 }}>
// //             {loading ? "Saving..." : isEdit ? "Update" : "Create"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Main Content ────────────────────────────────────────────────────────────────
// // export default function Content() {
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [catModal, setCatModal] = useState(null);
// //   const [confirm, setConfirm] = useState(null);
// //   const [toasts, setToasts] = useState([]);
// //   const [search, setSearch] = useState("");

// //   const showToast = useCallback((message, type = "info") => {
// //     const id = Date.now();
// //     setToasts((t) => [...t, { id, message, type }]);
// //     setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
// //   }, []);
// //   const removeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

// //   const fetchCategories = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await api.get(`${API_BASE}/category`);
// //       if (res.success) setCategories(res.data || []);
// //       else showToast("Failed to load categories", "error");
// //     } catch {
// //       showToast("Could not reach the server. Showing demo data.", "error");
// //       // demo data fallback
// //       setCategories([
// //         {
// //           _id: "69b7a3169c01b1e89778c60f",
// //           category: "pregnancy",
// //           isActive: true,
// //           stages: [
// //             {
// //               _id: "69b7a7d69c01b1e89778c617",
// //               title: "First Trimester",
// //               startMonth: 1,
// //               endMonth: 3,
// //               babySize: "poppy seed to peach",
// //               development: "Baby organs forming. Heart begins beating around week 6.",
// //               tips: "Rest whenever possible",
// //               sections: [
// //                 {
// //                   _id: "sec1",
// //                   heading: "Maternal Changes",
// //                   points: [
// //                     { _id: "p1", text: "Morning sickness" },
// //                     { _id: "p2", text: "Fatigue" },
// //                     { _id: "p3", text: "Breast tenderness" },
// //                   ],
// //                 },
// //                 {
// //                   _id: "sec2",
// //                   heading: "Nutrition",
// //                   points: [
// //                     { _id: "p4", text: "Prenatal vitamins" },
// //                     { _id: "p5", text: "Hydration" },
// //                   ],
// //                 },
// //               ],
// //             },
// //           ],
// //           createdAt: "2026-03-16T06:28:38.888Z",
// //         },
// //       ]);
// //     }
// //     setLoading(false);
// //   }, [showToast]);

// //   useEffect(() => { fetchCategories(); }, [fetchCategories]);

// //   const handleDeleteCategory = async (cat) => {
// //     try {
// //       const res = await api.delete(`${API_BASE}/category/${cat._id}`);
// //       if (res.success) {
// //         showToast("Category deleted", "success");
// //         setCategories((c) => c.filter((x) => x._id !== cat._id));
// //       } else {
// //         showToast(res.message || "Delete failed", "error");
// //       }
// //     } catch {
// //       showToast("Network error", "error");
// //     }
// //     setConfirm(null);
// //   };

// //   const handleCatSaved = (updated) => {
// //     setCategories((prev) => {
// //       const exists = prev.find((c) => c._id === updated._id);
// //       return exists ? prev.map((c) => (c._id === updated._id ? updated : c)) : [...prev, updated];
// //     });
// //     setCatModal(null);
// //   };

// //   const handleCategoryUpdate = (updated) => {
// //     setSelectedCategory(updated);
// //     setCategories((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
// //   };

// //   const filtered = categories.filter((c) =>
// //     c.category.toLowerCase().includes(search.toLowerCase())
// //   );

// //   if (selectedCategory) {
// //     return (
// //       <div style={styles.page}>
// //         <Toast toasts={toasts} removeToast={removeToast} />
// //         <header style={styles.header}>
// //           <div style={styles.logo}>
// //             <span style={styles.logoIcon}>📚</span>
// //             <span>Content Admin</span>
// //           </div>
// //         </header>
// //         <main style={styles.main}>
// //           <CategoryDetail
// //             category={selectedCategory}
// //             onBack={() => setSelectedCategory(null)}
// //             showToast={showToast}
// //             onCategoryUpdate={handleCategoryUpdate}
// //           />
// //         </main>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={styles.page}>
// //       <style>{`
// //         @keyframes slideIn { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
// //         * { box-sizing: border-box; }
// //         input:focus, textarea:focus { outline: 2px solid #3b5bdb; outline-offset: -1px; }
// //         button:active { transform: scale(0.97); }
// //       `}</style>
// //       <Toast toasts={toasts} removeToast={removeToast} />
// //       {catModal !== null && (
// //         <CategoryFormModal
// //           category={catModal === "create" ? null : catModal}
// //           onClose={() => setCatModal(null)}
// //           onSaved={handleCatSaved}
// //           showToast={showToast}
// //         />
// //       )}
// //       {confirm && (
// //         <ConfirmModal
// //           message={`Delete category "${confirm.category}"? All its stages will be removed.`}
// //           onConfirm={() => handleDeleteCategory(confirm)}
// //           onCancel={() => setConfirm(null)}
// //         />
// //       )}

// //       <header style={styles.header}>
// //         <div style={styles.logo}>
// //           <span style={styles.logoIcon}>📚</span>
// //           <span>Content Admin</span>
// //         </div>
// //         <p style={{ margin: 0, fontSize: 13, color: "#888" }}>Book Content Management</p>
// //       </header>

// //       <main style={styles.main}>
// //         {/* Page Header */}
// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
// //           <div>
// //             <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>Categories</h1>
// //             <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>{categories.length} total categories</p>
// //           </div>
// //           <button onClick={() => setCatModal("create")} style={styles.btnPrimary}>
// //             + New Category
// //           </button>
// //         </div>

// //         {/* Stats */}
// //         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 28 }}>
// //           {[
// //             { label: "Total Categories", value: categories.length, color: "#e8f0fe", text: "#3b5bdb" },
// //             { label: "Active", value: categories.filter((c) => c.isActive).length, color: "#e6f9f0", text: "#1a7f5a" },
// //             { label: "Inactive", value: categories.filter((c) => !c.isActive).length, color: "#fdecea", text: "#c0392b" },
// //             { label: "Total Stages", value: categories.reduce((a, c) => a + c.stages.length, 0), color: "#fef3e6", text: "#c47b0a" },
// //           ].map((s) => (
// //             <div key={s.label} style={{ background: s.color, borderRadius: 12, padding: "16px 18px" }}>
// //               <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: s.text, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
// //               <p style={{ margin: "6px 0 0", fontSize: 28, fontWeight: 800, color: s.text }}>{s.value}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Search */}
// //         <div style={{ marginBottom: 20 }}>
// //           <input
// //             style={{ ...styles.input, maxWidth: 320 }}
// //             placeholder="Search categories..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>

// //         {/* Table */}
// //         {loading ? (
// //           <div style={styles.emptyState}><p style={{ color: "#888" }}>Loading categories...</p></div>
// //         ) : filtered.length === 0 ? (
// //           <div style={styles.emptyState}>
// //             <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
// //             <p style={{ color: "#888", fontSize: 14 }}>No categories found. Create your first one!</p>
// //           </div>
// //         ) : (
// //           <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8eaf0", overflow: "hidden" }}>
// //             <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //               <thead>
// //                 <tr style={{ background: "#f8f9fd", borderBottom: "1px solid #e8eaf0" }}>
// //                   {["Category", "Status", "Stages", "Created", "Actions"].map((h) => (
// //                     <th key={h} style={{ padding: "13px 18px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filtered.map((cat, i) => (
// //                   <tr
// //                     key={cat._id}
// //                     style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f0f2f8" : "none", transition: "background 0.15s" }}
// //                     onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbff")}
// //                     onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
// //                   >
// //                     <td style={{ padding: "14px 18px" }}>
// //                       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //                         <div style={{ width: 36, height: 36, borderRadius: 10, background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
// //                           📖
// //                         </div>
// //                         <div>
// //                           <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#1a1a2e", textTransform: "capitalize" }}>{cat.category}</p>
// //                           <p style={{ margin: 0, fontSize: 11, color: "#aaa" }}>{cat._id.slice(-8)}</p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td style={{ padding: "14px 18px" }}>
// //                       <span style={{
// //                         padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
// //                         background: cat.isActive ? "#e6f9f0" : "#fdecea",
// //                         color: cat.isActive ? "#1a7f5a" : "#c0392b",
// //                       }}>
// //                         {cat.isActive ? "Active" : "Inactive"}
// //                       </span>
// //                     </td>
// //                     <td style={{ padding: "14px 18px" }}>
// //                       <span style={{ fontSize: 14, fontWeight: 600, color: "#3b5bdb" }}>{cat.stages.length}</span>
// //                       <span style={{ fontSize: 12, color: "#aaa", marginLeft: 4 }}>stage{cat.stages.length !== 1 ? "s" : ""}</span>
// //                     </td>
// //                     <td style={{ padding: "14px 18px", fontSize: 13, color: "#888" }}>
// //                       {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
// //                     </td>
// //                     <td style={{ padding: "14px 18px" }}>
// //                       <div style={{ display: "flex", gap: 7 }}>
// //                         <button onClick={() => setSelectedCategory(cat)} style={{ ...styles.editBtn, fontSize: 12 }}>View</button>
// //                         <button onClick={() => setCatModal(cat)} style={{ ...styles.editBtn, fontSize: 12 }}>Edit</button>
// //                         <button onClick={() => setConfirm(cat)} style={{ ...styles.deleteBtn, fontSize: 12 }}>Delete</button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // // ─── Shared Styles ───────────────────────────────────────────────────────────
// // const styles = {
// //   page: {
// //     minHeight: "100vh",
// //     background: "#f5f6fa",
// //     fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
// //   },
// //   header: {
// //     background: "#1a1a2e",
// //     padding: "0 32px",
// //     height: 60,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     position: "sticky",
// //     top: 0,
// //     zIndex: 100,
// //   },
// //   logo: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 10,
// //     fontSize: 16,
// //     fontWeight: 700,
// //     color: "#fff",
// //   },
// //   logoIcon: { fontSize: 22 },
// //   main: {
// //     maxWidth: 1100,
// //     margin: "0 auto",
// //     padding: "32px 24px",
// //   },
// //   label: {
// //     display: "block",
// //     fontSize: 12,
// //     fontWeight: 600,
// //     color: "#555",
// //     marginBottom: 6,
// //     textTransform: "uppercase",
// //     letterSpacing: "0.04em",
// //   },
// //   input: {
// //     width: "100%",
// //     padding: "9px 13px",
// //     border: "1px solid #dde2f0",
// //     borderRadius: 8,
// //     fontSize: 14,
// //     color: "#1a1a2e",
// //     background: "#fff",
// //     transition: "border 0.15s",
// //   },
// //   btnPrimary: {
// //     padding: "9px 20px",
// //     background: "#3b5bdb",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: 9,
// //     fontSize: 14,
// //     fontWeight: 600,
// //     cursor: "pointer",
// //     whiteSpace: "nowrap",
// //   },
// //   btnSecondary: {
// //     padding: "9px 20px",
// //     background: "#fff",
// //     color: "#555",
// //     border: "1px solid #dde2f0",
// //     borderRadius: 9,
// //     fontSize: 14,
// //     fontWeight: 500,
// //     cursor: "pointer",
// //   },
// //   editBtn: {
// //     padding: "6px 12px",
// //     background: "#fff",
// //     border: "1px solid #dde2f0",
// //     borderRadius: 7,
// //     fontSize: 13,
// //     fontWeight: 500,
// //     cursor: "pointer",
// //     color: "#3b5bdb",
// //   },
// //   deleteBtn: {
// //     padding: "6px 12px",
// //     background: "#fff",
// //     border: "1px solid #fdc5c5",
// //     borderRadius: 7,
// //     fontSize: 13,
// //     fontWeight: 500,
// //     cursor: "pointer",
// //     color: "#c0392b",
// //   },
// //   addBtn: {
// //     padding: "5px 12px",
// //     background: "none",
// //     border: "1px dashed #aab4e8",
// //     borderRadius: 7,
// //     fontSize: 13,
// //     color: "#3b5bdb",
// //     cursor: "pointer",
// //     fontWeight: 500,
// //   },
// //   removeBtn: {
// //     padding: "6px 10px",
// //     background: "#fdecea",
// //     border: "none",
// //     borderRadius: 7,
// //     color: "#c0392b",
// //     cursor: "pointer",
// //     fontSize: 13,
// //     fontWeight: 600,
// //     flexShrink: 0,
// //   },
// //   stageCard: {
// //     background: "#fff",
// //     border: "1px solid #e8eaf0",
// //     borderRadius: 14,
// //     padding: "18px 20px",
// //     transition: "box-shadow 0.15s",
// //   },
// //   emptyState: {
// //     textAlign: "center",
// //     padding: "60px 20px",
// //     background: "#fff",
// //     borderRadius: 14,
// //     border: "1px dashed #dde2f0",
// //   },
// // };

// import { useState, useEffect, useCallback } from "react";

// // ─── CONFIG ───────────────────────────────────────────────────────────────────
// const API_BASE = "http://localhost:8080/api/v1/content";

// const getHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
// });

// const api = {
//   get: (url) => fetch(url, { headers: getHeaders() }).then((r) => r.json()),
//   post: (url, data) => fetch(url, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) }).then((r) => r.json()),
//   put: (url, data) => fetch(url, { method: "PUT", headers: getHeaders(), body: JSON.stringify(data) }).then((r) => r.json()),
//   patch: (url, data) => fetch(url, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(data || {}) }).then((r) => r.json()),
//   delete: (url) => fetch(url, { method: "DELETE", headers: getHeaders() }).then((r) => r.json()),
// };

// // ─── CONSTANTS ────────────────────────────────────────────────────────────────
// const BLOCK_TYPES = [
//   { type: "heading",    label: "Heading",     icon: "H1", desc: "Large chapter title" },
//   { type: "subheading", label: "Subheading",  icon: "H2", desc: "Section subtitle" },
//   { type: "paragraph",  label: "Paragraph",   icon: "¶",  desc: "Body text" },
//   { type: "bullets",    label: "Bullet List", icon: "•",  desc: "List of points" },
//   { type: "tip",        label: "Tip / Note",  icon: "💡", desc: "Highlighted tip box" },
//   { type: "callout",    label: "Callout",     icon: "📣", desc: "Important info box" },
//   { type: "image",      label: "Image",       icon: "🖼", desc: "Image with caption" },
//   { type: "video",      label: "Video",       icon: "▶",  desc: "Video embed URL" },
//   { type: "divider",    label: "Divider",     icon: "—",  desc: "Section separator" },
//   { type: "richtext",   label: "Rich Text",   icon: "Aa", desc: "Formatted text block" },
// ];

// const CATEGORY_SLUGS = [
//   { value: "pre-planning",  label: "Pre-Planning" },
//   { value: "pre-pregnancy", label: "Pre-Pregnancy" },
//   { value: "pregnancy",     label: "Pregnancy" },
//   { value: "infant",        label: "Infant" },
//   { value: "toddler",       label: "Toddler" },
//   { value: "postpartum",    label: "Postpartum" },
// ];

// // ─── TOAST ────────────────────────────────────────────────────────────────────
// function Toast({ toasts, remove }) {
//   return (
//     <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
//       {toasts.map((t) => (
//         <div key={t.id} onClick={() => remove(t.id)} style={{
//           padding: "11px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
//           background: t.type === "success" ? "#166534" : t.type === "error" ? "#991b1b" : "#1e40af",
//           color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", maxWidth: 320,
//           animation: "toastIn 0.22s ease",
//         }}>
//           {t.message}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── CONFIRM MODAL ────────────────────────────────────────────────────────────
// function Confirm({ msg, onOk, onCancel }) {
//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 8000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onCancel}>
//       <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, padding: "28px 32px", maxWidth: 380, width: "90%" }}>
//         <p style={{ fontSize: 15, color: "#1e293b", marginBottom: 24, lineHeight: 1.6 }}>{msg}</p>
//         <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
//           <button onClick={onCancel} style={S.btnSec}>Cancel</button>
//           <button onClick={onOk} style={S.btnDanger}>Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── BLOCK EDITOR ─────────────────────────────────────────────────────────────
// function BlockEditor({ block, index, total, onChange, onDelete, onMoveUp, onMoveDown }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const typeInfo = BLOCK_TYPES.find((t) => t.type === block.type);

//   const set = (key, val) => onChange({ ...block, [key]: val });
//   const setStyle = (key, val) => onChange({ ...block, style: { ...block.style, [key]: val } });

//   const renderFields = () => {
//     switch (block.type) {
//       case "heading":
//       case "subheading":
//       case "paragraph":
//       case "richtext":
//         return (
//           <textarea
//             value={block.content || ""}
//             onChange={(e) => set("content", e.target.value)}
//             placeholder={`Enter ${block.type} text…`}
//             style={{
//               ...S.input, resize: "vertical",
//               height: block.type === "paragraph" || block.type === "richtext" ? 100 : 52,
//               fontWeight: block.type === "heading" ? 700 : block.type === "subheading" ? 600 : 400,
//               fontSize: block.type === "heading" ? 15 : 14,
//             }}
//           />
//         );

//       case "bullets":
//         return (
//           <div>
//             {(block.items || []).map((item, i) => (
//               <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "center" }}>
//                 <span style={{ color: "#6366f1", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>•</span>
//                 <input
//                   value={item.text || ""}
//                   onChange={(e) => {
//                     const items = [...(block.items || [])];
//                     items[i] = { ...items[i], text: e.target.value };
//                     set("items", items);
//                   }}
//                   placeholder={`Bullet ${i + 1}`}
//                   style={{ ...S.input, flex: 1, fontSize: 13 }}
//                 />
//                 <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>
//                   <input type="checkbox" checked={item.bold || false} onChange={(e) => {
//                     const items = [...(block.items || [])];
//                     items[i] = { ...items[i], bold: e.target.checked };
//                     set("items", items);
//                   }} />Bold
//                 </label>
//                 <button onClick={() => set("items", (block.items || []).filter((_, j) => j !== i))} style={S.btnIconDanger}>✕</button>
//               </div>
//             ))}
//             <button onClick={() => set("items", [...(block.items || []), { text: "", bold: false }])} style={S.addBtn}>
//               + Add bullet
//             </button>
//           </div>
//         );

//       case "tip":
//       case "callout":
//         return (
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             <div style={{ display: "flex", gap: 12 }}>
//               <div style={{ flex: 1 }}>
//                 <label style={S.miniLabel}>Variant</label>
//                 <select value={block.variant || "tip"} onChange={(e) => set("variant", e.target.value)} style={S.select}>
//                   {["info", "warning", "success", "tip"].map((v) => <option key={v}>{v}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label style={S.miniLabel}>Icon</label>
//                 <input value={block.icon || ""} onChange={(e) => set("icon", e.target.value)} placeholder="💡" style={{ ...S.input, width: 64 }} />
//               </div>
//             </div>
//             <textarea
//               value={block.content || ""}
//               onChange={(e) => set("content", e.target.value)}
//               placeholder="Callout message…"
//               style={{ ...S.input, height: 72, resize: "vertical" }}
//             />
//           </div>
//         );

//       case "image":
//         return (
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             <input value={block.url || ""} onChange={(e) => set("url", e.target.value)} placeholder="Image URL (https://…)" style={S.input} />
//             <div style={{ display: "flex", gap: 10 }}>
//               <input value={block.alt || ""} onChange={(e) => set("alt", e.target.value)} placeholder="Alt text" style={{ ...S.input, flex: 1 }} />
//               <input value={block.caption || ""} onChange={(e) => set("caption", e.target.value)} placeholder="Caption" style={{ ...S.input, flex: 1 }} />
//             </div>
//             {block.url && (
//               <img src={block.url} alt="preview" style={{ maxHeight: 110, borderRadius: 8, objectFit: "cover", border: "1px solid #e2e8f0" }}
//                 onError={(e) => (e.target.style.display = "none")} />
//             )}
//           </div>
//         );

//       case "video":
//         return (
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             <input value={block.url || ""} onChange={(e) => set("url", e.target.value)} placeholder="YouTube / Vimeo embed URL" style={S.input} />
//             <input value={block.caption || ""} onChange={(e) => set("caption", e.target.value)} placeholder="Caption (optional)" style={S.input} />
//           </div>
//         );

//       case "divider":
//         return (
//           <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 12, letterSpacing: "0.2em", padding: "4px 0" }}>
//             ─── SECTION BREAK ───
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
//       {/* Header */}
//       <div
//         onClick={() => setCollapsed((c) => !c)}
//         style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#f8fafc", borderBottom: collapsed ? "none" : "1px solid #e2e8f0", cursor: "pointer", userSelect: "none" }}
//       >
//         <span style={{ width: 32, height: 32, background: "#e0e7ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#4f46e5", flexShrink: 0 }}>
//           {typeInfo?.icon}
//         </span>
//         <div style={{ flex: 1 }}>
//           <span style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{typeInfo?.label}</span>
//           {collapsed && block.content && (
//             <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 10 }}>
//               {block.content.slice(0, 55)}{block.content.length > 55 ? "…" : ""}
//             </span>
//           )}
//         </div>
//         <div style={{ display: "flex", gap: 4, alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
//           <button disabled={index === 0} onClick={onMoveUp} title="Move up"
//             style={{ ...S.btnIcon, opacity: index === 0 ? 0.3 : 1 }}>↑</button>
//           <button disabled={index === total - 1} onClick={onMoveDown} title="Move down"
//             style={{ ...S.btnIcon, opacity: index === total - 1 ? 0.3 : 1 }}>↓</button>
//           <button onClick={onDelete} title="Delete" style={{ ...S.btnIcon, color: "#ef4444" }}>🗑</button>
//           <span style={{ color: "#94a3b8", fontSize: 14, padding: "0 4px" }}>{collapsed ? "▶" : "▼"}</span>
//         </div>
//       </div>

//       {/* Body */}
//       {!collapsed && (
//         <div style={{ padding: "14px 16px" }}>
//           {renderFields()}

//           {/* Style controls (not for divider) */}
//           {block.type !== "divider" && (
//             <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
//               <div>
//                 <label style={S.miniLabel}>Align</label>
//                 <select value={block.style?.align || "left"} onChange={(e) => setStyle("align", e.target.value)} style={{ ...S.select, width: 100 }}>
//                   {["left", "center", "right"].map((v) => <option key={v}>{v}</option>)}
//                 </select>
//               </div>
//               {["heading", "subheading"].includes(block.type) && (
//                 <div>
//                   <label style={S.miniLabel}>Size</label>
//                   <select value={block.style?.size || "md"} onChange={(e) => setStyle("size", e.target.value)} style={{ ...S.select, width: 84 }}>
//                     {["sm", "md", "lg", "xl"].map((v) => <option key={v}>{v}</option>)}
//                   </select>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── BLOCK PICKER MODAL ───────────────────────────────────────────────────────
// function BlockPicker({ onAdd, onClose }) {
//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 8500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
//       <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", maxWidth: 500, width: "92%" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
//           <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}>Add Content Block</h3>
//           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8" }}>×</button>
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//           {BLOCK_TYPES.map((bt) => (
//             <button
//               key={bt.type}
//               onClick={() => { onAdd(bt.type); onClose(); }}
//               style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, background: "#fafafa", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
//               onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "#eef2ff"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fafafa"; }}
//             >
//               <span style={{ width: 34, height: 34, background: "#e0e7ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#4f46e5", flexShrink: 0 }}>
//                 {bt.icon}
//               </span>
//               <div>
//                 <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{bt.label}</div>
//                 <div style={{ fontSize: 11, color: "#94a3b8" }}>{bt.desc}</div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── STAGE EDITOR (block builder) ────────────────────────────────────────────
// function StageEditor({ categoryId, stage, onClose, onSaved, showToast }) {
//   const isNew = !stage?._id;
//   const [tab, setTab] = useState("content");
//   const [saving, setSaving] = useState(false);
//   const [showPicker, setShowPicker] = useState(false);

//   const [meta, setMeta] = useState({
//     title: stage?.title || "",
//     description: stage?.description || "",
//     startMonth: stage?.startMonth ?? "",
//     endMonth: stage?.endMonth ?? "",
//     startWeek: stage?.startWeek ?? "",
//     endWeek: stage?.endWeek ?? "",
//     trimester: stage?.trimester ?? "",
//     babySize: stage?.babySize || "",
//     babyWeight: stage?.babyWeight || "",
//     order: stage?.order ?? 0,
//   });

//   const [blocks, setBlocks] = useState(
//     [...(stage?.blocks || [])].sort((a, b) => a.order - b.order)
//   );

//   const setM = (k, v) => setMeta((m) => ({ ...m, [k]: v }));

//   const addBlock = (type) => {
//     setBlocks((b) => [...b, {
//       _id: `tmp_${Date.now()}`,
//       type, order: b.length,
//       content: "",
//       items: type === "bullets" ? [{ text: "", bold: false }] : undefined,
//       style: { align: "left", size: "md" },
//     }]);
//   };

//   const moveBlock = (idx, dir) => {
//     setBlocks((b) => {
//       const arr = [...b];
//       const t = idx + dir;
//       if (t < 0 || t >= arr.length) return arr;
//       [arr[idx], arr[t]] = [arr[t], arr[idx]];
//       return arr;
//     });
//   };

//   const handleSave = async () => {
//     if (!meta.title.trim()) return showToast("Stage title is required", "error");
//     setSaving(true);

//     try {
//       let stageId = stage?._id;

//       if (isNew) {
//         const res = await api.post(`${API_BASE}/categories/${categoryId}/stages`, meta);
//         if (!res.success) { showToast(res.message || "Failed to create stage", "error"); setSaving(false); return; }
//         stageId = res.data._id;
//       } else {
//         const res = await api.put(`${API_BASE}/categories/${categoryId}/stages/${stageId}`, meta);
//         if (!res.success) { showToast(res.message || "Failed to update stage", "error"); setSaving(false); return; }
//       }

//       const blocksRes = await api.put(
//         `${API_BASE}/categories/${categoryId}/stages/${stageId}/blocks`,
//         { blocks: blocks.map((b, i) => ({ ...b, order: i })) }
//       );

//       if (blocksRes.success) {
//         showToast(isNew ? "Stage created!" : "Stage saved!", "success");
//         onSaved(blocksRes.data);
//       } else {
//         showToast(blocksRes.message || "Block save failed", "error");
//       }
//     } catch {
//       showToast("Network error", "error");
//     }
//     setSaving(false);
//   };

//   return (
//     <div
//       style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 7000, overflowY: "auto", padding: "24px 12px" }}
//       onClick={onClose}
//     >
//       {showPicker && <BlockPicker onAdd={addBlock} onClose={() => setShowPicker(false)} />}

//       <div onClick={(e) => e.stopPropagation()} style={{ background: "#f8fafc", borderRadius: 18, maxWidth: 780, margin: "0 auto", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
//         {/* Header */}
//         <div style={{ background: "#1e293b", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <div>
//             <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff" }}>{isNew ? "New Stage" : "Edit Stage"}</h2>
//             <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>{meta.title || "Untitled"}</p>
//           </div>
//           <div style={{ display: "flex", gap: 10 }}>
//             <button onClick={onClose} style={S.btnSec}>Cancel</button>
//             <button onClick={handleSave} disabled={saving} style={{ ...S.btn, opacity: saving ? 0.7 : 1 }}>
//               {saving ? "Saving…" : "💾 Save Stage"}
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div style={{ display: "flex", background: "#fff", borderBottom: "2px solid #e2e8f0" }}>
//           {[["meta", "📋 Metadata"], ["content", "📝 Content Blocks"]].map(([key, label]) => (
//             <button key={key} onClick={() => setTab(key)} style={{
//               padding: "12px 24px", background: "none", border: "none", cursor: "pointer",
//               fontSize: 13, fontWeight: 600,
//               color: tab === key ? "#4f46e5" : "#64748b",
//               borderBottom: tab === key ? "3px solid #4f46e5" : "3px solid transparent",
//               marginBottom: -2,
//             }}>{label}</button>
//           ))}
//           <div style={{ marginLeft: "auto", padding: "0 18px", display: "flex", alignItems: "center" }}>
//             <span style={{ fontSize: 12, color: "#94a3b8" }}>{blocks.length} block{blocks.length !== 1 ? "s" : ""}</span>
//           </div>
//         </div>

//         <div style={{ padding: 24 }}>
//           {/* METADATA TAB */}
//           {tab === "meta" && (
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//               <div style={{ gridColumn: "1/-1" }}>
//                 <label style={S.label}>Stage Title *</label>
//                 <input style={S.input} value={meta.title} onChange={(e) => setM("title", e.target.value)} placeholder="e.g. First Trimester" />
//               </div>
//               <div style={{ gridColumn: "1/-1" }}>
//                 <label style={S.label}>Description</label>
//                 <textarea style={{ ...S.input, height: 70, resize: "vertical" }} value={meta.description} onChange={(e) => setM("description", e.target.value)} placeholder="Brief summary shown in table of contents…" />
//               </div>
//               <div>
//                 <label style={S.label}>Start Month</label>
//                 <input style={S.input} type="number" value={meta.startMonth} onChange={(e) => setM("startMonth", e.target.value)} placeholder="1" />
//               </div>
//               <div>
//                 <label style={S.label}>End Month</label>
//                 <input style={S.input} type="number" value={meta.endMonth} onChange={(e) => setM("endMonth", e.target.value)} placeholder="3" />
//               </div>
//               <div>
//                 <label style={S.label}>Start Week</label>
//                 <input style={S.input} type="number" value={meta.startWeek} onChange={(e) => setM("startWeek", e.target.value)} placeholder="1" />
//               </div>
//               <div>
//                 <label style={S.label}>End Week</label>
//                 <input style={S.input} type="number" value={meta.endWeek} onChange={(e) => setM("endWeek", e.target.value)} placeholder="12" />
//               </div>
//               <div>
//                 <label style={S.label}>Trimester</label>
//                 <select style={S.select} value={meta.trimester} onChange={(e) => setM("trimester", e.target.value)}>
//                   <option value="">— None —</option>
//                   <option value={1}>1st Trimester</option>
//                   <option value={2}>2nd Trimester</option>
//                   <option value={3}>3rd Trimester</option>
//                 </select>
//               </div>
//               <div>
//                 <label style={S.label}>Display Order</label>
//                 <input style={S.input} type="number" value={meta.order} onChange={(e) => setM("order", e.target.value)} />
//               </div>
//               <div>
//                 <label style={S.label}>Baby Size</label>
//                 <input style={S.input} value={meta.babySize} onChange={(e) => setM("babySize", e.target.value)} placeholder="e.g. poppy seed to peach" />
//               </div>
//               <div>
//                 <label style={S.label}>Baby Weight</label>
//                 <input style={S.input} value={meta.babyWeight} onChange={(e) => setM("babyWeight", e.target.value)} placeholder="e.g. ~14g" />
//               </div>
//             </div>
//           )}

//           {/* CONTENT BLOCKS TAB */}
//           {tab === "content" && (
//             <div>
//               {blocks.length === 0 && (
//                 <div style={{ textAlign: "center", padding: "48px 20px", background: "#fff", borderRadius: 12, border: "2px dashed #e2e8f0", marginBottom: 14 }}>
//                   <div style={{ fontSize: 36, marginBottom: 10 }}>📝</div>
//                   <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 16px" }}>
//                     No content blocks yet. Start building this stage's content.
//                   </p>
//                   <button onClick={() => setShowPicker(true)} style={S.btn}>+ Add First Block</button>
//                 </div>
//               )}

//               {blocks.map((block, idx) => (
//                 <BlockEditor
//                   key={block._id || idx}
//                   block={block}
//                   index={idx}
//                   total={blocks.length}
//                   onChange={(updated) => setBlocks((b) => b.map((bl, i) => (i === idx ? updated : bl)))}
//                   onDelete={() => setBlocks((b) => b.filter((_, i) => i !== idx))}
//                   onMoveUp={() => moveBlock(idx, -1)}
//                   onMoveDown={() => moveBlock(idx, 1)}
//                 />
//               ))}

//               {blocks.length > 0 && (
//                 <button onClick={() => setShowPicker(true)} style={{ ...S.addBtn, width: "100%", justifyContent: "center", padding: 14, marginTop: 4 }}>
//                   + Add Content Block
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── STAGE LIST ───────────────────────────────────────────────────────────────
// function StageList({ category, onBack, showToast }) {
//   const [stages, setStages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editor, setEditor] = useState(null); // null | "new" | stageObj
//   const [confirm, setConfirm] = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get(`${API_BASE}/categories/${category._id}/stages`);
//         if (res.success) setStages(res.data || []);
//         else showToast("Failed to load stages", "error");
//       } catch { showToast("Network error", "error"); }
//       setLoading(false);
//     };
//     load();
//   }, [category._id]);

//   const handleSaved = (updated) => {
//     setStages((prev) => {
//       const exists = prev.find((s) => s._id === updated._id);
//       return exists
//         ? prev.map((s) => (s._id === updated._id ? { ...s, ...updated } : s))
//         : [...prev, updated];
//     });
//     setEditor(null);
//   };

//   const handleDelete = async (stage) => {
//     try {
//       const res = await api.delete(`${API_BASE}/categories/${category._id}/stages/${stage._id}`);
//       if (res.success) { showToast("Stage deleted", "success"); setStages((p) => p.filter((s) => s._id !== stage._id)); }
//       else showToast(res.message || "Delete failed", "error");
//     } catch { showToast("Network error", "error"); }
//     setConfirm(null);
//   };

//   const handleTogglePublish = async (stage) => {
//     try {
//       const res = await api.patch(`${API_BASE}/categories/${category._id}/stages/${stage._id}/publish`);
//       if (res.success) {
//         showToast(res.data.isPublished ? "Stage published!" : "Stage unpublished", "success");
//         setStages((p) => p.map((s) => (s._id === stage._id ? { ...s, ...res.data } : s)));
//       }
//     } catch { showToast("Network error", "error"); }
//   };

//   const handleEditStage = async (stage) => {
//     // fetch full stage (with blocks) before opening editor
//     try {
//       const res = await api.get(`${API_BASE}/categories/${category._id}/stages/${stage._id}`);
//       if (res.success) setEditor(res.data);
//       else setEditor(stage);
//     } catch { setEditor(stage); }
//   };

//   const sorted = [...stages].sort((a, b) => a.order - b.order);

//   return (
//     <div>
//       {editor !== null && (
//         <StageEditor
//           categoryId={category._id}
//           stage={editor === "new" ? null : editor}
//           onClose={() => setEditor(null)}
//           onSaved={handleSaved}
//           showToast={showToast}
//         />
//       )}
//       {confirm && (
//         <Confirm
//           msg={`Delete stage "${confirm.title}"? This cannot be undone.`}
//           onOk={() => handleDelete(confirm)}
//           onCancel={() => setConfirm(null)}
//         />
//       )}

//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
//         <button onClick={onBack} style={S.btnBack}>← Back</button>
//         <div style={{ flex: 1 }}>
//           <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1e293b" }}>
//             {category.icon} {category.label}
//           </h2>
//           <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{stages.length} stage{stages.length !== 1 ? "s" : ""}</p>
//         </div>
//         <button onClick={() => setEditor("new")} style={S.btn}>+ New Stage</button>
//       </div>

//       {loading ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>Loading stages…</div>
//       ) : sorted.length === 0 ? (
//         <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 14, border: "2px dashed #e2e8f0" }}>
//           <div style={{ fontSize: 36, marginBottom: 10 }}>📄</div>
//           <p style={{ color: "#94a3b8", marginBottom: 16 }}>No stages yet.</p>
//           <button onClick={() => setEditor("new")} style={S.btn}>+ New Stage</button>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {sorted.map((stage) => (
//             <div key={stage._id} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
//               <div style={{ width: 52, height: 52, borderRadius: 12, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                 <span style={{ fontSize: 10, fontWeight: 700, color: "#4f46e5", textAlign: "center", lineHeight: 1.3 }}>
//                   M{stage.startMonth}<br />–{stage.endMonth}
//                 </span>
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
//                   <span style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{stage.title}</span>
//                   <span style={{
//                     fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
//                     background: stage.isPublished ? "#dcfce7" : "#f1f5f9",
//                     color: stage.isPublished ? "#166534" : "#64748b",
//                   }}>
//                     {stage.isPublished ? "Published" : "Draft"}
//                   </span>
//                   {stage.trimester && (
//                     <span style={{ fontSize: 11, color: "#94a3b8" }}>T{stage.trimester}</span>
//                   )}
//                 </div>
//                 <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
//                   {stage.blockCount !== undefined ? `${stage.blockCount} blocks` : ""}{stage.babySize ? ` · 🍓 ${stage.babySize}` : ""}
//                 </p>
//               </div>
//               <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
//                 <button
//                   onClick={() => handleTogglePublish(stage)}
//                   style={{ ...S.btnSec, fontSize: 12, padding: "6px 12px", color: stage.isPublished ? "#dc2626" : "#166534", borderColor: stage.isPublished ? "#fecaca" : "#bbf7d0" }}
//                 >
//                   {stage.isPublished ? "Unpublish" : "Publish"}
//                 </button>
//                 <button onClick={() => handleEditStage(stage)} style={{ ...S.btnSec, fontSize: 12, padding: "6px 12px" }}>Edit</button>
//                 <button onClick={() => setConfirm(stage)} style={{ ...S.btnSec, fontSize: 12, padding: "6px 12px", color: "#ef4444", borderColor: "#fecaca" }}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── CATEGORY FORM MODAL ──────────────────────────────────────────────────────
// function CategoryModal({ category, onClose, onSaved, showToast }) {
//   const isEdit = !!category;
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     slug: category?.slug || "",
//     label: category?.label || "",
//     description: category?.description || "",
//     icon: category?.icon || "📖",
//     isActive: category?.isActive ?? true,
//     order: category?.order ?? 0,
//   });
//   const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   const handleSubmit = async () => {
//     if (!form.slug || !form.label) return showToast("Slug and label are required", "error");
//     setLoading(true);
//     try {
//       const url = isEdit
//         ? `${API_BASE}/categories/${category._id}`
//         : `${API_BASE}/categories`;
//       const res = isEdit ? await api.put(url, form) : await api.post(url, form);
//       if (res.success) { showToast(isEdit ? "Category updated!" : "Category created!", "success"); onSaved(res.data); }
//       else showToast(res.message || "Error", "error");
//     } catch { showToast("Network error", "error"); }
//     setLoading(false);
//   };

//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 7000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
//       <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "30px 28px", maxWidth: 460, width: "92%" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
//           <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1e293b" }}>{isEdit ? "Edit Category" : "New Category"}</h2>
//           <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8" }}>×</button>
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//           <div>
//             <label style={S.label}>Icon (emoji)</label>
//             <input style={{ ...S.input, width: 70 }} value={form.icon} onChange={(e) => setF("icon", e.target.value)} />
//           </div>
//           <div>
//             <label style={S.label}>Display Order</label>
//             <input style={S.input} type="number" value={form.order} onChange={(e) => setF("order", e.target.value)} />
//           </div>
//           <div style={{ gridColumn: "1/-1" }}>
//             <label style={S.label}>Slug *</label>
//             <select style={S.select} value={form.slug} onChange={(e) => setF("slug", e.target.value)} disabled={isEdit}>
//               <option value="">— Select —</option>
//               {CATEGORY_SLUGS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
//             </select>
//             {isEdit && <p style={{ fontSize: 11, color: "#94a3b8", margin: "4px 0 0" }}>Slug cannot be changed after creation</p>}
//           </div>
//           <div style={{ gridColumn: "1/-1" }}>
//             <label style={S.label}>Label *</label>
//             <input style={S.input} value={form.label} onChange={(e) => setF("label", e.target.value)} placeholder="e.g. Pregnancy Guide" />
//           </div>
//           <div style={{ gridColumn: "1/-1" }}>
//             <label style={S.label}>Description</label>
//             <textarea style={{ ...S.input, height: 64, resize: "vertical" }} value={form.description} onChange={(e) => setF("description", e.target.value)} placeholder="Short description of this category…" />
//           </div>
//           <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: 10 }}>
//             <input type="checkbox" id="catActive" checked={form.isActive} onChange={(e) => setF("isActive", e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer" }} />
//             <label htmlFor="catActive" style={{ fontSize: 14, color: "#475569", cursor: "pointer" }}>Active</label>
//           </div>
//         </div>
//         <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 22 }}>
//           <button onClick={onClose} style={S.btnSec}>Cancel</button>
//           <button onClick={handleSubmit} disabled={loading} style={{ ...S.btn, opacity: loading ? 0.7 : 1 }}>
//             {loading ? "Saving…" : isEdit ? "Update" : "Create"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── MAIN ADMIN PANEL ─────────────────────────────────────────────────────────
// export default function ContentAdmin() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCat, setSelectedCat] = useState(null);
//   const [catModal, setCatModal] = useState(null); // null | "new" | catObj
//   const [confirm, setConfirm] = useState(null);
//   const [toasts, setToasts] = useState([]);

//   const showToast = useCallback((message, type = "info") => {
//     const id = Date.now();
//     setToasts((t) => [...t, { id, message, type }]);
//     setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
//   }, []);
//   const removeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

//   const fetchCategories = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await api.get(`${API_BASE}/categories`);
//       if (res.success) setCategories(res.data || []);
//       else showToast("Failed to load categories", "error");
//     } catch {
//       showToast("Could not reach server — showing demo data", "error");
//       setCategories([
//         { _id: "c1", slug: "pregnancy", label: "Pregnancy Guide", icon: "🤰", isActive: true, stages: [], order: 0, createdAt: new Date().toISOString() },
//         { _id: "c2", slug: "infant", label: "Infant Care", icon: "👶", isActive: true, stages: [], order: 1, createdAt: new Date().toISOString() },
//         { _id: "c3", slug: "toddler", label: "Toddler Development", icon: "🧒", isActive: false, stages: [], order: 2, createdAt: new Date().toISOString() },
//       ]);
//     }
//     setLoading(false);
//   }, [showToast]);

//   useEffect(() => { fetchCategories(); }, [fetchCategories]);

//   const handleDeleteCat = async (cat) => {
//     try {
//       const res = await api.delete(`${API_BASE}/categories/${cat._id}`);
//       if (res.success) { showToast("Category deleted", "success"); setCategories((c) => c.filter((x) => x._id !== cat._id)); }
//       else showToast(res.message || "Delete failed", "error");
//     } catch { showToast("Network error", "error"); }
//     setConfirm(null);
//   };

//   const handleCatSaved = (updated) => {
//     setCategories((prev) => {
//       const exists = prev.find((c) => c._id === updated._id);
//       return exists
//         ? prev.map((c) => (c._id === updated._id ? { ...c, ...updated } : c))
//         : [...prev, updated];
//     });
//     setCatModal(null);
//   };

//   const sorted = [...categories].sort((a, b) => a.order - b.order);
//   const totalStages = categories.reduce((a, c) => a + (c.stages?.length || 0), 0);

//   if (selectedCat) {
//     return (
//       <div style={S.page}>
//         <style>{CSS}</style>
//         <Toast toasts={toasts} remove={removeToast} />
//         <Header />
//         <main style={S.main}>
//           <StageList
//             category={selectedCat}
//             onBack={() => setSelectedCat(null)}
//             showToast={showToast}
//           />
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div style={S.page}>
//       <style>{CSS}</style>
//       <Toast toasts={toasts} remove={removeToast} />

//       {catModal !== null && (
//         <CategoryModal
//           category={catModal === "new" ? null : catModal}
//           onClose={() => setCatModal(null)}
//           onSaved={handleCatSaved}
//           showToast={showToast}
//         />
//       )}
//       {confirm && (
//         <Confirm
//           msg={`Delete category "${confirm.label}"? All its stages and content will be permanently removed.`}
//           onOk={() => handleDeleteCat(confirm)}
//           onCancel={() => setConfirm(null)}
//         />
//       )}

//       <Header />
//       <main style={S.main}>
//         {/* Page title row */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
//           <div>
//             <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1e293b" }}>Content Management</h1>
//             <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 14 }}>Manage categories and their stage content</p>
//           </div>
//           <button onClick={() => setCatModal("new")} style={S.btn}>+ New Category</button>
//         </div>

//         {/* Stats */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 28 }}>
//           {[
//             { label: "Categories", value: categories.length, bg: "#eef2ff", color: "#4f46e5" },
//             { label: "Active", value: categories.filter((c) => c.isActive).length, bg: "#f0fdf4", color: "#16a34a" },
//             { label: "Inactive", value: categories.filter((c) => !c.isActive).length, bg: "#fef2f2", color: "#dc2626" },
//             { label: "Total Stages", value: totalStages, bg: "#fff7ed", color: "#ea580c" },
//           ].map((s) => (
//             <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "16px 18px" }}>
//               <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
//               <p style={{ margin: "6px 0 0", fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Category grid */}
//         {loading ? (
//           <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>Loading…</div>
//         ) : sorted.length === 0 ? (
//           <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 14, border: "2px dashed #e2e8f0" }}>
//             <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
//             <p style={{ color: "#94a3b8", marginBottom: 16 }}>No categories yet. Create your first one!</p>
//             <button onClick={() => setCatModal("new")} style={S.btn}>+ New Category</button>
//           </div>
//         ) : (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
//             {sorted.map((cat) => (
//               <div key={cat._id} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, overflow: "hidden", transition: "box-shadow 0.2s" }}
//                 onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.12)")}
//                 onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
//               >
//                 <div style={{ padding: "20px 20px 14px" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
//                     <div style={{ width: 48, height: 48, background: "#eef2ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
//                       {cat.icon}
//                     </div>
//                     <span style={{
//                       fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, height: "fit-content",
//                       background: cat.isActive ? "#f0fdf4" : "#f1f5f9",
//                       color: cat.isActive ? "#16a34a" : "#64748b",
//                     }}>
//                       {cat.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </div>
//                   <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{cat.label}</h3>
//                   <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
//                     {cat.stages?.length || 0} stage{cat.stages?.length !== 1 ? "s" : ""} · <code style={{ fontSize: 11 }}>{cat.slug}</code>
//                   </p>
//                   {cat.description && (
//                     <p style={{ margin: "8px 0 0", fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{cat.description}</p>
//                   )}
//                 </div>
//                 <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8 }}>
//                   <button onClick={() => setSelectedCat(cat)} style={{ ...S.btn, flex: 1, fontSize: 13, padding: 9 }}>
//                     Manage Stages
//                   </button>
//                   <button onClick={() => setCatModal(cat)} style={{ ...S.btnSec, fontSize: 13, padding: "9px 14px" }}>Edit</button>
//                   <button onClick={() => setConfirm(cat)} style={{ ...S.btnSec, fontSize: 13, padding: "9px 12px", color: "#ef4444", borderColor: "#fecaca" }}>🗑</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// function Header() {
//   return (
//     <header style={{ background: "#1e293b", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 700, color: "#fff" }}>
//         <span style={{ fontSize: 20 }}>📚</span> Janeen CMS
//       </div>
//       <span style={{ fontSize: 12, color: "#475569" }}>Content Management</span>
//     </header>
//   );
// }

// // ─── STYLES ───────────────────────────────────────────────────────────────────
// const S = {
//   page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif" },
//   main: { maxWidth: 1100, margin: "0 auto", padding: "32px 24px" },
//   label: { display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" },
//   miniLabel: { display: "block", fontSize: 11, fontWeight: 600, color: "#94a3b8", marginBottom: 4 },
//   input: { width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#1e293b", background: "#fff", fontFamily: "inherit", boxSizing: "border-box" },
//   select: { width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#1e293b", background: "#fff", cursor: "pointer" },
//   btn: { padding: "9px 20px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
//   btnSec: { padding: "9px 20px", background: "#fff", color: "#475569", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: 14, fontWeight: 500, cursor: "pointer" },
//   btnDanger: { padding: "9px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer" },
//   btnBack: { padding: "7px 16px", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "#475569" },
//   btnIcon: { padding: "5px 9px", background: "#f1f5f9", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, color: "#475569" },
//   btnIconDanger: { padding: "5px 9px", background: "#fef2f2", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, color: "#ef4444" },
//   addBtn: { display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "none", border: "1.5px dashed #c7d2fe", borderRadius: 8, color: "#4f46e5", fontSize: 13, fontWeight: 600, cursor: "pointer" },
// };

// const CSS = `
//   @keyframes toastIn { from { transform: translateX(20px); opacity: 0 } to { transform: none; opacity: 1 } }
//   * { box-sizing: border-box; }
//   input:focus, textarea:focus, select:focus { outline: 2px solid #6366f1; outline-offset: -1px; border-color: #6366f1 !important; }
//   button:active { transform: scale(0.97); }
//   input[type="checkbox"] { accent-color: #4f46e5; }
// `;
import { useState, useEffect, useCallback } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:8080/api/v1/content";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
});

const api = {
  get: (url) => fetch(url, { headers: getHeaders() }).then((r) => r.json()),
  post: (url, data) => fetch(url, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) }).then((r) => r.json()),
  put: (url, data) => fetch(url, { method: "PUT", headers: getHeaders(), body: JSON.stringify(data) }).then((r) => r.json()),
  patch: (url, data) => fetch(url, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(data || {}) }).then((r) => r.json()),
  delete: (url) => fetch(url, { method: "DELETE", headers: getHeaders() }).then((r) => r.json()),
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const BLOCK_TYPES = [
  { type: "heading",    label: "Heading",     icon: "H1", desc: "Large chapter title" },
  { type: "subheading", label: "Subheading",  icon: "H2", desc: "Section subtitle" },
  { type: "paragraph",  label: "Paragraph",   icon: "¶",  desc: "Body text" },
  { type: "bullets",    label: "Bullet List", icon: "•",  desc: "List of points" },
  { type: "tip",        label: "Tip / Note",  icon: "💡", desc: "Highlighted tip box" },
  { type: "callout",    label: "Callout",     icon: "📣", desc: "Important info box" },
  { type: "image",      label: "Image",       icon: "🖼", desc: "Image with caption" },
  { type: "video",      label: "Video",       icon: "▶",  desc: "Video embed URL" },
  { type: "divider",    label: "Divider",     icon: "—",  desc: "Section separator" },
  { type: "richtext",   label: "Rich Text",   icon: "Aa", desc: "Formatted text block" },
];

const CATEGORY_SLUGS = [
  { value: "pre-pregnancy",          label: "🌸 Pre-Pregnancy" },
  { value: "non-pregnant",           label: "🌿 Non-Pregnant (Family Planning)" },
  { value: "pregnancy",             label: "🤰 Pregnancy (All Trimesters)" },
  { value: "post-pregnancy",         label: "💛 Post-Pregnancy (Postpartum)" },
  { value: "planning-to-be-father",  label: "👨 Planning to be a Father" },
  { value: "father",                 label: "👨‍👧 Father — Partner Support" },
  { value: "newborn-infant",         label: "👶 Newborn & Infant (0–12 months)" },
  { value: "toddler",                label: "🧒 Toddler (1–3 years)" },
  { value: "preschool",              label: "🎨 Preschool (3–5 years)" },
  { value: "school-age",             label: "🎒 School-Age (6–12 years)" },
  { value: "teen",                   label: "🧑‍🎓 Teen (13–17 years)" },
  { value: "young-adult",            label: "🎓 Young Adult (18–21 years)" },
];

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ toasts, remove }) {
  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map((t) => (
        <div key={t.id} onClick={() => remove(t.id)} style={{
          padding: "11px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
          background: t.type === "success" ? "#166534" : t.type === "error" ? "#991b1b" : "#1e40af",
          color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", maxWidth: 320,
          animation: "toastIn 0.22s ease",
        }}>
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── CONFIRM MODAL ────────────────────────────────────────────────────────────
function Confirm({ msg, onOk, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 8000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, padding: "28px 32px", maxWidth: 380, width: "90%" }}>
        <p style={{ fontSize: 15, color: "#1e293b", marginBottom: 24, lineHeight: 1.6 }}>{msg}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={S.btnSec}>Cancel</button>
          <button onClick={onOk} style={S.btnDanger}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── BLOCK EDITOR ─────────────────────────────────────────────────────────────
function BlockEditor({ block, index, total, onChange, onDelete, onMoveUp, onMoveDown }) {
  const [collapsed, setCollapsed] = useState(false);
  const typeInfo = BLOCK_TYPES.find((t) => t.type === block.type);

  const set = (key, val) => onChange({ ...block, [key]: val });
  const setStyle = (key, val) => onChange({ ...block, style: { ...block.style, [key]: val } });

  const renderFields = () => {
    switch (block.type) {
      case "heading":
      case "subheading":
      case "paragraph":
      case "richtext":
        return (
          <textarea
            value={block.content || ""}
            onChange={(e) => set("content", e.target.value)}
            placeholder={`Enter ${block.type} text…`}
            style={{
              ...S.input, resize: "vertical",
              height: block.type === "paragraph" || block.type === "richtext" ? 100 : 52,
              fontWeight: block.type === "heading" ? 700 : block.type === "subheading" ? 600 : 400,
              fontSize: block.type === "heading" ? 15 : 14,
            }}
          />
        );

      case "bullets":
        return (
          <div>
            {(block.items || []).map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "center" }}>
                <span style={{ color: "#6366f1", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>•</span>
                <input
                  value={item.text || ""}
                  onChange={(e) => {
                    const items = [...(block.items || [])];
                    items[i] = { ...items[i], text: e.target.value };
                    set("items", items);
                  }}
                  placeholder={`Bullet ${i + 1}`}
                  style={{ ...S.input, flex: 1, fontSize: 13 }}
                />
                <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>
                  <input type="checkbox" checked={item.bold || false} onChange={(e) => {
                    const items = [...(block.items || [])];
                    items[i] = { ...items[i], bold: e.target.checked };
                    set("items", items);
                  }} />Bold
                </label>
                <button onClick={() => set("items", (block.items || []).filter((_, j) => j !== i))} style={S.btnIconDanger}>✕</button>
              </div>
            ))}
            <button onClick={() => set("items", [...(block.items || []), { text: "", bold: false }])} style={S.addBtn}>
              + Add bullet
            </button>
          </div>
        );

      case "tip":
      case "callout":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={S.miniLabel}>Variant</label>
                <select value={block.variant || "tip"} onChange={(e) => set("variant", e.target.value)} style={S.select}>
                  {["info", "warning", "success", "tip"].map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={S.miniLabel}>Icon</label>
                <input value={block.icon || ""} onChange={(e) => set("icon", e.target.value)} placeholder="💡" style={{ ...S.input, width: 64 }} />
              </div>
            </div>
            <textarea
              value={block.content || ""}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Callout message…"
              style={{ ...S.input, height: 72, resize: "vertical" }}
            />
          </div>
        );

      case "image":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input value={block.url || ""} onChange={(e) => set("url", e.target.value)} placeholder="Image URL (https://…)" style={S.input} />
            <div style={{ display: "flex", gap: 10 }}>
              <input value={block.alt || ""} onChange={(e) => set("alt", e.target.value)} placeholder="Alt text" style={{ ...S.input, flex: 1 }} />
              <input value={block.caption || ""} onChange={(e) => set("caption", e.target.value)} placeholder="Caption" style={{ ...S.input, flex: 1 }} />
            </div>
            {block.url && (

              <img src={block.url} alt="preview" style={{ maxHeight: 110, borderRadius: 8, objectFit: "cover", border: "1px solid #e2e8f0" }}
                onError={(e) => (e.target.style.display = "none")} />
            )}
          </div>
        );

      case "video":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input value={block.url || ""} onChange={(e) => set("url", e.target.value)} placeholder="YouTube / Vimeo embed URL" style={S.input} />
            <input value={block.caption || ""} onChange={(e) => set("caption", e.target.value)} placeholder="Caption (optional)" style={S.input} />
          </div>
        );

      case "divider":
        return (
          <div style={{ textAlign: "center", color: "#94a3b8", fontSize: 12, letterSpacing: "0.2em", padding: "4px 0" }}>
            ─── SECTION BREAK ───
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
      {/* Header */}
      <div
        onClick={() => setCollapsed((c) => !c)}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#f8fafc", borderBottom: collapsed ? "none" : "1px solid #e2e8f0", cursor: "pointer", userSelect: "none" }}
      >
        <span style={{ width: 32, height: 32, background: "#e0e7ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#4f46e5", flexShrink: 0 }}>
          {typeInfo?.icon}
        </span>
        <div style={{ flex: 1 }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{typeInfo?.label}</span>
          {collapsed && block.content && (
            <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 10 }}>
              {block.content.slice(0, 55)}{block.content.length > 55 ? "…" : ""}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
          <button disabled={index === 0} onClick={onMoveUp} title="Move up"
            style={{ ...S.btnIcon, opacity: index === 0 ? 0.3 : 1 }}>↑</button>
          <button disabled={index === total - 1} onClick={onMoveDown} title="Move down"
            style={{ ...S.btnIcon, opacity: index === total - 1 ? 0.3 : 1 }}>↓</button>
          <button onClick={onDelete} title="Delete" style={{ ...S.btnIcon, color: "#ef4444" }}>🗑</button>
          <span style={{ color: "#94a3b8", fontSize: 14, padding: "0 4px" }}>{collapsed ? "▶" : "▼"}</span>
        </div>
      </div>

      {/* Body */}
      {!collapsed && (
        <div style={{ padding: "14px 16px" }}>
          {renderFields()}

          {/* Style controls (not for divider) */}
          {block.type !== "divider" && (
            <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
              <div>
                <label style={S.miniLabel}>Align</label>
                <select value={block.style?.align || "left"} onChange={(e) => setStyle("align", e.target.value)} style={{ ...S.select, width: 100 }}>
                  {["left", "center", "right"].map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
              {["heading", "subheading"].includes(block.type) && (
                <div>
                  <label style={S.miniLabel}>Size</label>
                  <select value={block.style?.size || "md"} onChange={(e) => setStyle("size", e.target.value)} style={{ ...S.select, width: 84 }}>
                    {["sm", "md", "lg", "xl"].map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── BLOCK PICKER MODAL ───────────────────────────────────────────────────────
function BlockPicker({ onAdd, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 8500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", maxWidth: 500, width: "92%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}>Add Content Block</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8" }}>×</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {BLOCK_TYPES.map((bt) => (
            <button
              key={bt.type}
              onClick={() => { onAdd(bt.type); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, background: "#fafafa", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "#eef2ff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fafafa"; }}
            >
              <span style={{ width: 34, height: 34, background: "#e0e7ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#4f46e5", flexShrink: 0 }}>
                {bt.icon}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{bt.label}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{bt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STAGE EDITOR (block builder) ────────────────────────────────────────────
function StageEditor({ categoryId, stage, onClose, onSaved, showToast }) {
  const isNew = !stage?._id;
  const [tab, setTab] = useState("content");
  const [saving, setSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [meta, setMeta] = useState({
    title: stage?.title || "",
    description: stage?.description || "",
    startMonth: stage?.startMonth ?? "",
    endMonth: stage?.endMonth ?? "",
    startWeek: stage?.startWeek ?? "",
    endWeek: stage?.endWeek ?? "",
    trimester: stage?.trimester ?? "",
    babySize: stage?.babySize || "",
    babyWeight: stage?.babyWeight || "",
    order: stage?.order ?? 0,
  });

  const [blocks, setBlocks] = useState(
    [...(stage?.blocks || [])].sort((a, b) => a.order - b.order)
  );

  const setM = (k, v) => setMeta((m) => ({ ...m, [k]: v }));

  const addBlock = (type) => {
    setBlocks((b) => [...b, {
      _id: `tmp_${Date.now()}`,
      type, order: b.length,
      content: "",
      items: type === "bullets" ? [{ text: "", bold: false }] : undefined,
      style: { align: "left", size: "md" },
    }]);
  };

  const moveBlock = (idx, dir) => {
    setBlocks((b) => {
      const arr = [...b];
      const t = idx + dir;
      if (t < 0 || t >= arr.length) return arr;
      [arr[idx], arr[t]] = [arr[t], arr[idx]];
      return arr;
    });
  };

  const handleSave = async () => {
    if (!meta.title.trim()) return showToast("Stage title is required", "error");
    setSaving(true);

    try {
      let stageId = stage?._id;

      if (isNew) {
        const res = await api.post(`${API_BASE}/categories/${categoryId}/stages`, meta);
        if (!res.success) { showToast(res.message || "Failed to create stage", "error"); setSaving(false); return; }
        stageId = res.data._id;
      } else {
        const res = await api.put(`${API_BASE}/categories/${categoryId}/stages/${stageId}`, meta);
        if (!res.success) { showToast(res.message || "Failed to update stage", "error"); setSaving(false); return; }
      }

      const blocksRes = await api.put(
        `${API_BASE}/categories/${categoryId}/stages/${stageId}/blocks`,
        { blocks: blocks.map((b, i) => ({ ...b, order: i })) }
      );

      if (blocksRes.success) {
        showToast(isNew ? "Stage created!" : "Stage saved!", "success");
        onSaved(blocksRes.data);
      } else {
        showToast(blocksRes.message || "Block save failed", "error");
      }
    } catch {
      showToast("Network error", "error");
    }
    setSaving(false);
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 7000, overflowY: "auto", padding: "24px 12px" }}
      onClick={onClose}
    >
      {showPicker && <BlockPicker onAdd={addBlock} onClose={() => setShowPicker(false)} />}

      <div onClick={(e) => e.stopPropagation()} style={{ background: "#f8fafc", borderRadius: 18, maxWidth: 780, margin: "0 auto", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
        {/* Header */}
        <div style={{ background: "#1e293b", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff" }}>{isNew ? "New Stage" : "Edit Stage"}</h2>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>{meta.title || "Untitled"}</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={S.btnSec}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={{ ...S.btn, opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving…" : "💾 Save Stage"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "#fff", borderBottom: "2px solid #e2e8f0" }}>
          {[["meta", "📋 Stage Month"], ["content", "📝 Content Blocks"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "12px 24px", background: "none", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
              color: tab === key ? "#4f46e5" : "#64748b",
              borderBottom: tab === key ? "3px solid #4f46e5" : "3px solid transparent",
              marginBottom: -2,
            }}>{label}</button>
          ))}
          <div style={{ marginLeft: "auto", padding: "0 18px", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{blocks.length} block{blocks.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          {/* METADATA TAB */}
          {tab === "meta" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Stage Title *</label>
                <input style={S.input} value={meta.title} onChange={(e) => setM("title", e.target.value)} placeholder="e.g. First Trimester" />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={S.label}>Description</label>
                <textarea style={{ ...S.input, height: 70, resize: "vertical" }} value={meta.description} onChange={(e) => setM("description", e.target.value)} placeholder="Brief summary shown in table of contents…" />
              </div>
              <div>
                <label style={S.label}>Start Month</label>
                <input style={S.input} type="number" value={meta.startMonth} onChange={(e) => setM("startMonth", e.target.value)} placeholder="1" />
              </div>
              <div>
                <label style={S.label}>End Month</label>
                <input style={S.input} type="number" value={meta.endMonth} onChange={(e) => setM("endMonth", e.target.value)} placeholder="3" />
              </div>
              <div>
                <label style={S.label}>Start Week</label>
                <input style={S.input} type="number" value={meta.startWeek} onChange={(e) => setM("startWeek", e.target.value)} placeholder="1" />
              </div>
              <div>
                <label style={S.label}>End Week</label>
                <input style={S.input} type="number" value={meta.endWeek} onChange={(e) => setM("endWeek", e.target.value)} placeholder="12" />
              </div>
              <div>
                <label style={S.label}>Trimester</label>
                <select style={S.select} value={meta.trimester} onChange={(e) => setM("trimester", e.target.value)}>
                  <option value="">— None —</option>
                  <option value={1}>1st Trimester</option>
                  <option value={2}>2nd Trimester</option>
                  <option value={3}>3rd Trimester</option>
                </select>
              </div>
              <div>
                <label style={S.label}>Display Order</label>
                <input style={S.input} type="number" value={meta.order} onChange={(e) => setM("order", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Baby Size</label>
                <input style={S.input} value={meta.babySize} onChange={(e) => setM("babySize", e.target.value)} placeholder="e.g. poppy seed to peach" />
              </div>
              <div>
                <label style={S.label}>Baby Weight</label>
                <input style={S.input} value={meta.babyWeight} onChange={(e) => setM("babyWeight", e.target.value)} placeholder="e.g. ~14g" />
              </div>
            </div>
          )}

          {/* CONTENT BLOCKS TAB */}
          {tab === "content" && (
            <div>
              {blocks.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px 20px", background: "#fff", borderRadius: 12, border: "2px dashed #e2e8f0", marginBottom: 14 }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📝</div>
                  <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 16px" }}>
                    No content blocks yet. Start building this stage's content.
                  </p>
                  <button onClick={() => setShowPicker(true)} style={S.btn}>+ Add First Block</button>
                </div>
              )}

              {blocks.map((block, idx) => (
                <BlockEditor
                  key={block._id || idx}
                  block={block}
                  index={idx}
                  total={blocks.length}
                  onChange={(updated) => setBlocks((b) => b.map((bl, i) => (i === idx ? updated : bl)))}
                  onDelete={() => setBlocks((b) => b.filter((_, i) => i !== idx))}
                  onMoveUp={() => moveBlock(idx, -1)}
                  onMoveDown={() => moveBlock(idx, 1)}
                />
              ))}

              {blocks.length > 0 && (
                <button onClick={() => setShowPicker(true)} style={{ ...S.addBtn, width: "100%", justifyContent: "center", padding: 14, marginTop: 4 }}>
                  + Add Content Block
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── VIEW ALL CONTENT MODAL ───────────────────────────────────────────────────
function ViewAllModal({ category, stages, onClose }) {
  // Fetch full stage data (with blocks) for all stages
  const [fullStages, setFullStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          stages.map((s) =>
            api.get(`${API_BASE}/categories/${category._id}/stages/${s._id}`)
              .then((r) => r.success ? r.data : s)
              .catch(() => s)
          )
        );
        // Sort by order
        setFullStages([...results].sort((a, b) => a.order - b.order));
      } catch {
        setFullStages([...stages].sort((a, b) => a.order - b.order));
      }
      setLoading(false);
    };
    loadAll();
  }, []);

  const BLOCK_ICONS = {
    heading: "H1", subheading: "H2", paragraph: "¶", bullets: "•",
    tip: "💡", callout: "📣", image: "🖼", video: "▶", divider: "—", richtext: "Aa",
  };

  const variantColors = {
    info:    { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af" },
    warning: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
    success: { bg: "#f0fdf4", border: "#86efac", text: "#14532d" },
    tip:     { bg: "#fdf4ff", border: "#d8b4fe", text: "#581c87" },
  };

  const renderBlockPreview = (block) => {
    switch (block.type) {
      case "heading":
        return (
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1a1a2e", margin: "2rem 0 0.6rem", lineHeight: 1.25, fontFamily: "Georgia, serif", borderBottom: "2px solid #e8eaf0", paddingBottom: "0.4rem", textAlign: block.style?.align || "left" }}>
            {block.content}
          </h2>
        );
      case "subheading":
        return (
          <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#2d3748", margin: "1.6rem 0 0.4rem", lineHeight: 1.3, fontFamily: "Georgia, serif", textAlign: block.style?.align || "left" }}>
            {block.content}
          </h3>
        );
      case "paragraph":
      case "richtext":
        return (
          <p style={{ fontSize: "0.97rem", lineHeight: 1.85, color: "#374151", margin: "0 0 1.1rem", fontFamily: "Georgia, serif", textAlign: block.style?.align || "left" }}>
            {block.content}
          </p>
        );
      case "bullets":
        return (
          <ul style={{ margin: "0 0 1.2rem", padding: 0, listStyle: "none" }}>
            {(block.items || []).map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 10, marginBottom: "0.5rem", alignItems: "flex-start" }}>
                <span style={{ color: "#6366f1", fontWeight: 900, flexShrink: 0, marginTop: 2 }}>▸</span>
                <span style={{ fontSize: "0.95rem", color: "#374151", lineHeight: 1.7, fontWeight: item.bold ? 700 : 400, fontFamily: "Georgia, serif" }}>{item.text}</span>
              </li>
            ))}
          </ul>
        );
      case "tip":
      case "callout": {
        const v = variantColors[block.variant || "tip"];
        return (
          <div style={{ background: v.bg, borderLeft: `4px solid ${v.border}`, borderRadius: "0 10px 10px 0", padding: "13px 16px", margin: "1.2rem 0", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{block.icon || "💡"}</span>
            <p style={{ margin: 0, fontSize: "0.93rem", color: v.text, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{block.content}</p>
          </div>
        );
      }
      case "image":
        return (
          <figure style={{ margin: "1.5rem 0", textAlign: block.style?.align || "left" }}>
                      <div style={{ display: "flex", justifyContent: 'center',alignItems:'center'}}>
    {block.url && <img src={block.url} alt={block.alt || ""} style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 10, objectFit: "cover", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }} onError={(e) => (e.target.style.display = "none")} />}
          </div>
            {block.caption && <figcaption style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 6, fontStyle: "italic" }}>{block.caption}</figcaption>}
          </figure>
        );
      case "divider":
        return (
          <div style={{ margin: "2rem 0", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ color: "#cbd5e1", fontSize: 18 }}>❧</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 8000, overflowY: "auto", padding: "24px 16px" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#f8fafc", borderRadius: 18, maxWidth: 820, margin: "0 auto", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
      >
        {/* Modal header */}
        <div style={{ background: "#489b53", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff" }}>
              {category.icon} {category.label} — All Content
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>
              {stages.length} stage{stages.length !== 1 ? "s" : ""} · preview of all published content
            </p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            ✕ Close
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
              <p>Loading all stages…</p>
            </div>
          ) : fullStages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>No stages found.</div>
          ) : (
            fullStages.map((stage, si) => (
              <div key={stage._id} style={{ marginBottom: si < fullStages.length - 1 ? 40 : 0 }}>
                {/* Stage header */}
                <div style={{
                  background: "linear-gradient(135deg, #4ba762 0%, #9bda98 100%)",
                  borderRadius: 12, padding: "20px 24px", marginBottom: 20, color: "#fff",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    {stage.startMonth && (
                      <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>
                        Month {stage.startMonth}–{stage.endMonth}
                      </span>
                    )}
                    {stage.trimester && (
                      <span style={{ background: "rgba(255,255,255,0.14)", borderRadius: 20, padding: "3px 12px", fontSize: 11 }}>
                        Trimester {stage.trimester}
                      </span>
                    )}
                    <span style={{
                      marginLeft: "auto", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                      background: stage.isPublished ? "rgba(134,239,172,0.3)" : "rgba(255,255,255,0.1)",
                      color: stage.isPublished ? "#bbf7d0" : "rgba(255,255,255,0.6)",
                    }}>
                      {stage.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "1.2rem", fontWeight: 800, fontFamily: "Georgia, serif" }}>
                    {stage.title}
                  </h3>
                  {stage.description && (
                    <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8, fontFamily: "Georgia, serif" }}>
                      {stage.description}
                    </p>
                  )}
                  {(stage.babySize || stage.babyWeight) && (
                    <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                      {stage.babySize && (
                        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "7px 12px" }}>
                          <div style={{ fontSize: 9, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.08em" }}>Baby Size</div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{stage.babySize}</div>
                        </div>
                      )}
                      {stage.babyWeight && (
                        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "7px 12px" }}>
                          <div style={{ fontSize: 9, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.08em" }}>Weight</div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{stage.babyWeight}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Blocks */}
                <div style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  {(!stage.blocks || stage.blocks.length === 0) ? (
                    <p style={{ color: "#94a3b8", fontStyle: "italic", textAlign: "center", padding: "20px 0", margin: 0, fontSize: 13 }}>
                      No content blocks yet for this stage.
                    </p>
                  ) : (
                    [...stage.blocks]
                      .sort((a, b) => a.order - b.order)
                      .map((block) => (
                        <div key={block._id}>
                          {renderBlockPreview(block)}
                        </div>
                      ))
                  )}
                </div>

                {/* Stage divider */}
                {si < fullStages.length - 1 && (
                  <div style={{ margin: "32px 0 0", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ flex: 1, height: 2, background: "linear-gradient(to right, #e2e8f0, transparent)" }} />
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, whiteSpace: "nowrap" }}>
                      Next Stage ↓
                    </span>
                    <div style={{ flex: 1, height: 2, background: "linear-gradient(to left, #e2e8f0, transparent)" }} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── STAGE LIST ───────────────────────────────────────────────────────────────
function StageList({ category, onBack, showToast }) {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(null); // null | "new" | stageObj
  const [confirm, setConfirm] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`${API_BASE}/categories/${category._id}/stages`);
        if (res.success) setStages(res.data || []);
        else showToast("Failed to load stages", "error");
      } catch { showToast("Network error", "error"); }
      setLoading(false);
    };
    load();
  }, [category._id]);

  const handleSaved = (updated) => {
    setStages((prev) => {
      const exists = prev.find((s) => s._id === updated._id);
      return exists
        ? prev.map((s) => (s._id === updated._id ? { ...s, ...updated } : s))
        : [...prev, updated];
    });
    setEditor(null);
  };

  const handleDelete = async (stage) => {
    try {
      const res = await api.delete(`${API_BASE}/categories/${category._id}/stages/${stage._id}`);
      if (res.success) { showToast("Stage deleted", "success"); setStages((p) => p.filter((s) => s._id !== stage._id)); }
      else showToast(res.message || "Delete failed", "error");
    } catch { showToast("Network error", "error"); }
    setConfirm(null);
  };

  const handleTogglePublish = async (stage) => {
    try {
      const res = await api.patch(`${API_BASE}/categories/${category._id}/stages/${stage._id}/publish`);
      if (res.success) {
        showToast(res.data.isPublished ? "Stage published!" : "Stage unpublished", "success");
        setStages((p) => p.map((s) => (s._id === stage._id ? { ...s, ...res.data } : s)));
      }
    } catch { showToast("Network error", "error"); }
  };

  const handleEditStage = async (stage) => {
    // fetch full stage (with blocks) before opening editor
    try {
      const res = await api.get(`${API_BASE}/categories/${category._id}/stages/${stage._id}`);
      if (res.success) setEditor(res.data);
      else setEditor(stage);
    } catch { setEditor(stage); }
  };

  const sorted = [...stages].sort((a, b) => a.order - b.order);

  return (
    <div>
      {editor !== null && (
        <StageEditor
          categoryId={category._id}
          stage={editor === "new" ? null : editor}
          onClose={() => setEditor(null)}
          onSaved={handleSaved}
          showToast={showToast}
        />
      )}
      {confirm && (
        <Confirm
          msg={`Delete stage "${confirm.title}"? This cannot be undone.`}
          onOk={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}
      {viewAll && (
        <ViewAllModal
          category={category}
          stages={sorted}
          onClose={() => setViewAll(false)}
        />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
        <button onClick={onBack} style={S.btnBack}>← Back</button>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1e293b" }}>
            {category.icon} {category.label}
          </h2>
          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{stages.length} stage{stages.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setViewAll(true)}
          disabled={stages.length === 0}
          style={{ ...S.btnSec, fontSize: 13, padding: "8px 16px", opacity: stages.length === 0 ? 0.4 : 1 }}
        >
          👁 View All Content
        </button>
        <button onClick={() => setEditor("new")} style={S.btn}>+ New Stage</button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>Loading stages…</div>
      ) : sorted.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 14, border: "2px dashed #e2e8f0" }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>📄</div>
          <p style={{ color: "#94a3b8", marginBottom: 16 }}>No stages yet.</p>
          <button onClick={() => setEditor("new")} style={S.btn}>+ New Stage</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sorted.map((stage) => (
            <div key={stage._id} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#4f46e5", textAlign: "center", lineHeight: 1.3 }}>
                  M{stage.startMonth}<br />–{stage.endMonth}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{stage.title}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                    background: stage.isPublished ? "#dcfce7" : "#f1f5f9",
                    color: stage.isPublished ? "#166534" : "#64748b",
                  }}>
                    {stage.isPublished ? "Published" : "Draft"}
                  </span>
                  {stage.trimester && (
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>T{stage.trimester}</span>
                  )}
                </div>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
                  {stage.blockCount !== undefined ? `${stage.blockCount} blocks` : ""}{stage.babySize ? ` · 🍓 ${stage.babySize}` : ""}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => handleTogglePublish(stage)}
                  style={{ ...S.btnSec, fontSize: 12, padding: "6px 12px", color: stage.isPublished ? "#dc2626" : "#166534", borderColor: stage.isPublished ? "#fecaca" : "#bbf7d0" }}
                >
                  {stage.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => handleEditStage(stage)} style={{ ...S.btnSec, fontSize: 12, padding: "6px 12px" }}>Edit</button>
                <button onClick={() => setConfirm(stage)} style={{ ...S.btnSec, fontSize: 12, padding: "6px 12px", color: "#ef4444", borderColor: "#fecaca" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 

// ─── CATEGORY FORM MODAL ──────────────────────────────────────────────────────
function CategoryModal({ category, onClose, onSaved, showToast }) {
  const isEdit = !!category;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    slug: category?.slug || "",
    label: category?.label || "",
    description: category?.description || "",
    icon: category?.icon || "📖",
    isActive: category?.isActive ?? true,
    order: category?.order ?? 0,
  });
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.slug || !form.label) return showToast("Slug and label are required", "error");
    setLoading(true);
    try {
      const url = isEdit
        ? `${API_BASE}/categories/${category._id}`
        : `${API_BASE}/categories`;
      const res = isEdit ? await api.put(url, form) : await api.post(url, form);
      if (res.success) { showToast(isEdit ? "Category updated!" : "Category created!", "success"); onSaved(res.data); }
      else showToast(res.message || "Error", "error");
    } catch { showToast("Network error", "error"); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 7000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "30px 28px", maxWidth: 460, width: "92%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1e293b" }}>{isEdit ? "Edit Category" : "New Category"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8" }}>×</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label style={S.label}>Icon (emoji)</label>
            <input style={{ ...S.input, width: 70 }} value={form.icon} onChange={(e) => setF("icon", e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Display Order</label>
            <input style={S.input} type="number" value={form.order} onChange={(e) => setF("order", e.target.value)} />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={S.label}>Slug *</label>
            <select style={S.select} value={form.slug} onChange={(e) => setF("slug", e.target.value)} disabled={isEdit}>
              <option value="">— Select —</option>
              {CATEGORY_SLUGS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {isEdit && <p style={{ fontSize: 11, color: "#94a3b8", margin: "4px 0 0" }}>Slug cannot be changed after creation</p>}
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={S.label}>Label *</label>
            <input style={S.input} value={form.label} onChange={(e) => setF("label", e.target.value)} placeholder="e.g. Pregnancy Guide" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={S.label}>Description</label>
            <textarea style={{ ...S.input, height: 64, resize: "vertical" }} value={form.description} onChange={(e) => setF("description", e.target.value)} placeholder="Short description of this category…" />
          </div>
          <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: 10 }}>
            <input type="checkbox" id="catActive" checked={form.isActive} onChange={(e) => setF("isActive", e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer" }} />
            <label htmlFor="catActive" style={{ fontSize: 14, color: "#475569", cursor: "pointer" }}>Active</label>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 22 }}>
          <button onClick={onClose} style={S.btnSec}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{ ...S.btn, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Saving…" : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PANEL ─────────────────────────────────────────────────────────
export default function ContentAdmin() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(null);
  const [catModal, setCatModal] = useState(null); // null | "new" | catObj
  const [confirm, setConfirm] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  const removeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`${API_BASE}/categories`);
      if (res.success) setCategories(res.data || []);
      else showToast("Failed to load categories", "error");
    } catch {
      showToast("Could not reach server — showing demo data", "error");
      setCategories([
        { _id: "c1", slug: "pregnancy", label: "Pregnancy Guide", icon: "🤰", isActive: true, stages: [], order: 0, createdAt: new Date().toISOString() },
        { _id: "c2", slug: "infant", label: "Infant Care", icon: "👶", isActive: true, stages: [], order: 1, createdAt: new Date().toISOString() },
        { _id: "c3", slug: "toddler", label: "Toddler Development", icon: "🧒", isActive: false, stages: [], order: 2, createdAt: new Date().toISOString() },
      ]);
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleDeleteCat = async (cat) => {
    try {
      const res = await api.delete(`${API_BASE}/categories/${cat._id}`);
      if (res.success) { showToast("Category deleted", "success"); setCategories((c) => c.filter((x) => x._id !== cat._id)); }
      else showToast(res.message || "Delete failed", "error");
    } catch { showToast("Network error", "error"); }
    setConfirm(null);
  };

  const handleCatSaved = (updated) => {
    setCategories((prev) => {
      const exists = prev.find((c) => c._id === updated._id);
      return exists
        ? prev.map((c) => (c._id === updated._id ? { ...c, ...updated } : c))
        : [...prev, updated];
    });
    setCatModal(null);
  };

  const sorted = [...categories].sort((a, b) => a.order - b.order);
  const totalStages = categories.reduce((a, c) => a + (c.stages?.length || 0), 0);

  if (selectedCat) {
    return (
      <div style={S.page}>
        <style>{CSS}</style>
        <Toast toasts={toasts} remove={removeToast} />
        <Header />
        <main style={S.main}>
          <StageList
            category={selectedCat}
            onBack={() => setSelectedCat(null)}
            showToast={showToast}
          />
        </main>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <style>{CSS}</style>
      <Toast toasts={toasts} remove={removeToast} />

      {catModal !== null && (
        <CategoryModal
          category={catModal === "new" ? null : catModal}
          onClose={() => setCatModal(null)}
          onSaved={handleCatSaved}
          showToast={showToast}
        />
      )}
      {confirm && (
        <Confirm
          msg={`Delete category "${confirm.label}"? All its stages and content will be permanently removed.`}
          onOk={() => handleDeleteCat(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <Header />
      <main style={S.main}>
        {/* Page title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1e293b" }}>Content Management</h1>
            <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 14 }}>Manage categories and their stage content</p>
          </div>
          <button onClick={() => setCatModal("new")} style={S.btn}>+ New Category</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Categories", value: categories.length, bg: "#eef2ff", color: "#4f46e5" },
            { label: "Active", value: categories.filter((c) => c.isActive).length, bg: "#f0fdf4", color: "#16a34a" },
            { label: "Inactive", value: categories.filter((c) => !c.isActive).length, bg: "#fef2f2", color: "#dc2626" },
            { label: "Total Stages", value: totalStages, bg: "#fff7ed", color: "#ea580c" },
          ].map((s) => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "16px 18px" }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
              <p style={{ margin: "6px 0 0", fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Category grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>Loading…</div>
        ) : sorted.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 14, border: "2px dashed #e2e8f0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
            <p style={{ color: "#94a3b8", marginBottom: 16 }}>No categories yet. Create your first one!</p>
            <button onClick={() => setCatModal("new")} style={S.btn}>+ New Category</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {sorted.map((cat) => (
              <div key={cat._id} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 14, overflow: "hidden", transition: "box-shadow 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ padding: "20px 20px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ width: 48, height: 48, background: "#eef2ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                      {cat.icon}
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, height: "fit-content",
                      background: cat.isActive ? "#f0fdf4" : "#f1f5f9",
                      color: cat.isActive ? "#16a34a" : "#64748b",
                    }}>
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{cat.label}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
                    {cat.stages?.length || 0} stage{cat.stages?.length !== 1 ? "s" : ""} · <code style={{ fontSize: 11 }}>{cat.slug}</code>
                  </p>
                  {cat.description && (
                    <p style={{ margin: "8px 0 0", fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{cat.description}</p>
                  )}
                </div>
                <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8 }}>
                  <button onClick={() => setSelectedCat(cat)} style={{ ...S.btn, flex: 1, fontSize: 13, padding: 9 }}>
                    Manage Stages
                  </button>
                  <button onClick={() => setCatModal(cat)} style={{ ...S.btnSec, fontSize: 13, padding: "9px 14px" }}>Edit</button>
                  <button onClick={() => setConfirm(cat)} style={{ ...S.btnSec, fontSize: 13, padding: "9px 12px", color: "#ef4444", borderColor: "#fecaca" }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Header() {
  return (
    <header style={{ background: "#1e293b", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 700, color: "#fff" }}>
        <span style={{ fontSize: 20 }}>📚</span> Janeen CMS
      </div>
      <span style={{ fontSize: 12, color: "#ffff" }}>Content Management</span>
    </header>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  main: { maxWidth: 1100, margin: "0 auto", padding: "32px 24px" },
  label: { display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" },
  miniLabel: { display: "block", fontSize: 11, fontWeight: 600, color: "#94a3b8", marginBottom: 4 },
  input: { width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#1e293b", background: "#fff", fontFamily: "inherit", boxSizing: "border-box" },
  select: { width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#1e293b", background: "#fff", cursor: "pointer" },
  btn: { padding: "9px 20px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
  btnSec: { padding: "9px 20px", background: "#fff", color: "#475569", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnDanger: { padding: "9px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  btnBack: { padding: "7px 16px", background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "#475569" },
  btnIcon: { padding: "5px 9px", background: "#f1f5f9", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, color: "#475569" },
  btnIconDanger: { padding: "5px 9px", background: "#fef2f2", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, color: "#ef4444" },
  addBtn: { display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "none", border: "1.5px dashed #c7d2fe", borderRadius: 8, color: "#4f46e5", fontSize: 13, fontWeight: 600, cursor: "pointer" },
};

const CSS = `
  @keyframes toastIn { from { transform: translateX(20px); opacity: 0 } to { transform: none; opacity: 1 } }
  * { box-sizing: border-box; }
  input:focus, textarea:focus, select:focus { outline: 2px solid #6366f1; outline-offset: -1px; border-color: #6366f1 !important; }
  button:active { transform: scale(0.97); }
  input[type="checkbox"] { accent-color: #4f46e5; }
`;