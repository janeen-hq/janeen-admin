

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  BookOpen, Plus, Pencil, Trash2, Upload, Eye, X,
  Clock, BarChart2, Users, ChevronLeft, ChevronRight,
  FileText, Image, Video, HelpCircle, StickyNote,
  Layers, Check, ZoomIn, AlertCircle, Save,
} from "lucide-react";
import { Award, GraduationCap, User, Mail, Phone, Calendar, Activity, Trophy, BarChart2 as BarChart } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   API SETUP
───────────────────────────────────────────────────────────── */
const BASE_URL = "http://localhost:8080/api";
const api = axios.create({ baseURL: BASE_URL });
api.interceptors.request.use((cfg) => {
  const token = sessionStorage.getItem("adminToken");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const BLOCK_TYPES = [
  { type: "note",    label: "Note",    icon: StickyNote, color: "#6fa86f", bg: "#f0fdf4", light: "#dcfce7", border: "#bbf7d0" },
  { type: "media",   label: "Video",   icon: Video,      color: "#3b82f6", bg: "#eff6ff", light: "#dbeafe", border: "#bfdbfe" },
  { type: "gallery", label: "Gallery", icon: Image,      color: "#8b5cf6", bg: "#f5f3ff", light: "#ede9fe", border: "#ddd6fe" },
  { type: "quiz",    label: "Quiz",    icon: HelpCircle, color: "#f59e0b", bg: "#fffbeb", light: "#fef9c3", border: "#fde68a" },
];
const bm = (type) => BLOCK_TYPES.find((b) => b.type === type) || BLOCK_TYPES[0];

/* ─────────────────────────────────────────────────────────────
   SMALL SHARED COMPONENTS
───────────────────────────────────────────────────────────── */
function Spinner({ size = 16, color = "#fff" }) {
  return (
    <span
      style={{
        display: "inline-block", width: size, height: size, flexShrink: 0,
        border: `2px solid ${color}40`, borderTopColor: color,
        borderRadius: "50%", animation: "spin 0.7s linear infinite",
      }}
    />
  );
}

function ModalShell({ title, accentColor = "#6fa86f", icon: Icon, onClose, children, footer }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* header */}
        <div
          className="flex items-center gap-3 px-6 py-4 border-b flex-shrink-0"
          style={{ borderTop: `4px solid ${accentColor}`, borderBottomColor: "#f3f4f6" }}
        >
          {Icon && (
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: accentColor }}>
              <Icon size={18} color="#fff" />
            </div>
          )}
          <h2 className="text-lg font-black text-gray-800 flex-1">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all"
          >
            <X size={17} />
          </button>
        </div>
        {/* scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {/* footer */}
        {footer && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

function CancelBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl border text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
      style={{ borderColor: "#e5e7eb" }}
    >
      Cancel
    </button>
  );
}
function SaveBtn({ onClick, loading, color = "#6fa86f", label = "Save", icon: Icon = Save }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-5 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
      style={{ background: color }}
    >
      {loading ? <Spinner /> : <Icon size={14} />}
      {loading ? "Saving…" : label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   INPUT HELPERS
───────────────────────────────────────────────────────────── */
function Field({ label, color = "#6fa86f", children }) {
  return (
    <div>
      <label className="block text-[11px] font-black uppercase tracking-widest mb-1.5" style={{ color }}>
        {label}
      </label>
      {children}
    </div>
  );
}
function TextInput({ value, onChange, placeholder, color = "#6fa86f", borderColor = "#e5e7eb", ...props }) {
  const ref = useRef();
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none bg-gray-50 transition-all"
      style={{ borderColor }}
      onFocus={(e) => (e.target.style.borderColor = color)}
      onBlur={(e) => (e.target.style.borderColor = borderColor)}
      {...props}
    />
  );
}
function TextArea({ value, onChange, placeholder, color = "#6fa86f", borderColor = "#e5e7eb", rows = 3, ...props }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none bg-gray-50 resize-none transition-all"
      style={{ borderColor }}
      onFocus={(e) => (e.target.style.borderColor = color)}
      onBlur={(e) => (e.target.style.borderColor = borderColor)}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   BLOCK FORMS
───────────────────────────────────────────────────────────── */

/* ── NOTE FORM ──────────────────────────────────────────────── */
function NoteForm({ initial, onSubmit, onCancel, saving }) {
  const [heading, setHeading] = useState(initial?.heading || "");
  const [notes, setNotes] = useState(() => {
    if (initial?.notes?.length) return initial.notes.map((n) => ({ heading: n.heading || "", description: n.description || "" }));
    if (initial?.description) return [{ heading: initial.heading || "", description: initial.description }];
    return [{ heading: "", description: "" }];
  });

  const add    = ()         => setNotes((n) => [...n, { heading: "", description: "" }]);
  const remove = (i)        => setNotes((n) => n.filter((_, x) => x !== i));
  const upd    = (i, f, v)  => setNotes((n) => n.map((item, x) => x === i ? { ...item, [f]: v } : item));

  return (
    <>
      <div className="space-y-4">
        <Field label="Block Heading" color="#6fa86f">
          <TextInput value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="e.g. Lesson Notes" color="#6fa86f" borderColor="#d1fae5" />
        </Field>

        <div className="space-y-3">
          {notes.map((note, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border" style={{ borderColor: "#d1fae5" }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: "#dcfce7", borderColor: "#bbf7d0" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ background: "#6fa86f", color: "#fff" }}>{i + 1}</div>
                <span className="text-xs font-bold flex-1 text-green-800">Note {i + 1}</span>
                {notes.length > 1 && (
                  <button onClick={() => remove(i)} className="p-1 rounded-lg hover:bg-red-50 transition-all" style={{ color: "#ef4444" }}>
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
              <div className="p-4 space-y-3" style={{ background: "#f0fdf4" }}>
                <TextInput value={note.heading} onChange={(e) => upd(i, "heading", e.target.value)} placeholder={`Note ${i + 1} heading…`} color="#6fa86f" borderColor="#bbf7d0" />
                <TextArea  value={note.description} onChange={(e) => upd(i, "description", e.target.value)} placeholder="Note content…" color="#6fa86f" borderColor="#bbf7d0" />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={add}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed text-sm font-bold w-full justify-center transition-all hover:opacity-80"
          style={{ borderColor: "#6fa86f", color: "#6fa86f" }}
        >
          <Plus size={15} /> Add Another Note
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
        <CancelBtn onClick={onCancel} />
        <SaveBtn onClick={() => onSubmit({ heading, notes })} loading={saving} color="#6fa86f" />
      </div>
    </>
  );
}

/* ── VIDEO FORM ─────────────────────────────────────────────── */
function VideoForm({ initial, onSubmit, onCancel, saving }) {
  const fileRef = useRef();
  const [heading, setHeading] = useState(initial?.heading || "");
  const [file, setFile] = useState(null);

  const handleSave = () => {
    const fd = new FormData();
    fd.append("heading", heading);
    if (file) fd.append("media", file);
    onSubmit(fd);
  };

  return (
    <>
      <div className="space-y-4">
        <Field label="Video Heading" color="#3b82f6">
          <TextInput value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="e.g. Introduction Video" color="#3b82f6" borderColor="#bfdbfe" />
        </Field>

        {initial?.videoUrl && !file && (
          <div className="rounded-xl overflow-hidden bg-black aspect-video">
            <video src={initial.videoUrl} controls className="w-full h-full" />
          </div>
        )}

        <div
          onClick={() => fileRef.current.click()}
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:opacity-80 transition-all"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}
        >
          <Video size={28} className="mx-auto mb-2 opacity-70" style={{ color: "#3b82f6" }} />
          {file
            ? <p className="text-sm font-semibold" style={{ color: "#3b82f6" }}>✓ {file.name}</p>
            : <p className="text-sm text-gray-400">
                <span className="font-semibold" style={{ color: "#3b82f6" }}>Click to select</span> a video file
                {initial?.videoUrl && <span className="block text-xs mt-1 text-gray-300">Upload new to replace existing</span>}
              </p>
          }
        </div>
        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
        <CancelBtn onClick={onCancel} />
        <SaveBtn onClick={handleSave} loading={saving} color="#3b82f6" />
      </div>
    </>
  );
}

/* ── GALLERY FORM ───────────────────────────────────────────── */
/**
 * ADD mode:  POST /add-gallery  → FormData: heading, images[], descriptions (JSON of arrays)
 * EDIT mode: PUT  /content/:id  → FormData: heading, images[] (new only), descriptions (JSON)
 *
 * `slides` array holds both existing (from server) and new (local file) slides.
 * Only slides with `.file != null` have a real File and get appended to FormData.
 * For EDIT, descriptions aligns with NEW file slides only (same order).
 */
function GalleryForm({ initial, onSubmit, onCancel, saving, isEdit }) {
  const fileRef = useRef();
  const [heading, setHeading] = useState(initial?.heading || "");
  const [activeIdx, setActiveIdx] = useState(0);
  const [slides, setSlides] = useState(() => {
    if (initial?.images?.length) {
      return initial.images.map((img) => ({
        key:      img._id || Math.random().toString(36).slice(2),
        file:     null,
        preview:  img.url,
        points:   Array.isArray(img.description) ? [...img.description] : (img.description ? [img.description] : [""]),
        existing: true,
      }));
    }
    return [{ key: "new0", file: null, preview: null, points: [""], existing: false }];
  });

  /* file picker */
  const onFiles = (fileList) => {
    const files = Array.from(fileList);
    if (!files.length) return;
    const newSlides = files.map((f, i) => ({
      key:      "new_" + Date.now() + i,
      file:     f,
      preview:  URL.createObjectURL(f),
      points:   [""],
      existing: false,
    }));
    setSlides((prev) => {
      const isEmpty = prev.length === 1 && !prev[0].preview;
      const base    = isEmpty ? [] : prev;
      const merged  = [...base, ...newSlides];
      setActiveIdx(isEmpty ? 0 : base.length);
      return merged;
    });
  };

  const removeSlide = (i) => {
    setSlides((s) => {
      const next = s.filter((_, x) => x !== i);
      if (next.length === 0) return [{ key: "empty", file: null, preview: null, points: [""], existing: false }];
      return next;
    });
    setActiveIdx((a) => Math.min(a, Math.max(0, slides.length - 2)));
  };

  const updPoint = (si, pi, val) =>
    setSlides((s) =>
      s.map((sl, x) => x === si ? { ...sl, points: sl.points.map((p, y) => y === pi ? val : p) } : sl)
    );
  const addPoint    = (si) => setSlides((s) => s.map((sl, x) => x === si ? { ...sl, points: [...sl.points, ""] } : sl));
  const removePoint = (si, pi) => setSlides((s) => s.map((sl, x) => x === si ? { ...sl, points: sl.points.filter((_, y) => y !== pi) } : sl));

  const handleSave = () => {
    const newSlides = slides.filter((s) => s.file);
    if (!isEdit && !newSlides.length) {
      Swal.fire({ icon: "warning", title: "No images", text: "Please upload at least one image.", confirmButtonColor: "#8b5cf6" });
      return;
    }
    const fd = new FormData();
    fd.append("heading", heading);
    newSlides.forEach((s) => fd.append("images", s.file));
    // descriptions aligns with new slides (same order)
    const descs = newSlides.map((s) => s.points.filter((p) => p.trim()));
    fd.append("descriptions", JSON.stringify(descs));
    onSubmit(fd);
  };

  const cur = slides[activeIdx] || slides[0];

  return (
    <>
      <div className="space-y-4">
        <Field label="Gallery Heading" color="#8b5cf6">
          <TextInput value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="e.g. Lesson Slides" color="#8b5cf6" borderColor="#ddd6fe" />
        </Field>

        {/* ── Slide editor ── */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#ddd6fe" }}>
          {/* Preview */}
          <div className="relative overflow-hidden" style={{ background: "#1e1b4b", minHeight: 200 }}>
            {cur?.preview ? (
              <>
                {slides.map((sl, i) => (
                  <div key={sl.key} className="absolute inset-0 transition-all duration-400"
                    style={{ opacity: i === activeIdx ? 1 : 0, zIndex: i === activeIdx ? 1 : 0 }}>
                    <img src={sl.preview} alt="" className="w-full h-full object-cover" style={{ minHeight: 200 }} />
                  </div>
                ))}
                {/* badge */}
                <div className="absolute top-3 right-3 z-10 text-xs font-black px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(0,0,0,0.65)", color: "#fff", backdropFilter: "blur(6px)" }}>
                  {activeIdx + 1} / {slides.length}
                </div>
                {/* remove slide */}
                <button onClick={() => removeSlide(activeIdx)}
                  className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                  style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}>
                  <X size={14} />
                </button>
                {/* arrows */}
                {slides.length > 1 && (
                  <>
                    <button onClick={() => setActiveIdx((i) => (i - 1 + slides.length) % slides.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                      style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}>
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => setActiveIdx((i) => (i + 1) % slides.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                      style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}>
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
                {/* progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 z-10" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div className="h-full transition-all duration-500" style={{ width: `${((activeIdx + 1) / slides.length) * 100}%`, background: "#8b5cf6" }} />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center cursor-pointer" style={{ minHeight: 200 }} onClick={() => fileRef.current.click()}>
                <Image size={36} style={{ color: "#8b5cf6", opacity: 0.6 }} />
                <p className="text-sm mt-2 font-semibold" style={{ color: "#c4b5fd" }}>Click to upload slides</p>
                <p className="text-xs mt-1 opacity-60" style={{ color: "#7c3aed" }}>Multiple images supported</p>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 p-3 overflow-x-auto border-b" style={{ background: "#f3e8ff", borderColor: "#ddd6fe" }}>
            {slides.map((sl, i) => (
              <button key={sl.key} onClick={() => setActiveIdx(i)}
                className="flex-shrink-0 rounded-xl overflow-hidden transition-all relative"
                style={{ width: 64, height: 44, background: "#1e1b4b",
                  outline: i === activeIdx ? "3px solid #8b5cf6" : "2px solid transparent",
                  opacity: i === activeIdx ? 1 : 0.5, transform: i === activeIdx ? "scale(1.05)" : "scale(1)" }}>
                {sl.preview
                  ? <img src={sl.preview} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><Image size={13} style={{ color: "#8b5cf6" }} /></div>}
                {sl.existing && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "#8b5cf6" }} />}
                {!sl.existing && sl.file && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "#22c55e" }} />}
              </button>
            ))}
            {/* add new slide btn */}
            <button onClick={() => fileRef.current.click()}
              className="flex-shrink-0 w-16 h-11 rounded-xl border-2 border-dashed flex items-center justify-center transition-all hover:opacity-80"
              style={{ borderColor: "#8b5cf6", color: "#8b5cf6" }}>
              <Plus size={18} />
            </button>
          </div>

          {/* Bullet points panel */}
          {cur?.preview && (
            <div className="p-4 space-y-2" style={{ background: "#faf5ff" }}>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[11px] font-black uppercase tracking-widest flex-1" style={{ color: "#8b5cf6" }}>
                  Slide {activeIdx + 1} — Description Points
                </p>
                {cur.existing && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: "#ede9fe", color: "#8b5cf6" }}>Saved</span>
                )}
                {!cur.existing && cur.file && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: "#dcfce7", color: "#16a34a" }}>New</span>
                )}
              </div>

              {cur.points.map((pt, pi) => (
                <div key={pi} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
                    style={{ background: "#8b5cf6", color: "#fff" }}>{pi + 1}</div>
                  <input
                    value={pt}
                    onChange={(e) => updPoint(activeIdx, pi, e.target.value)}
                    placeholder={`Point ${pi + 1}…`}
                    className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none bg-white transition-all"
                    style={{ borderColor: "#ddd6fe" }}
                    onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                    onBlur={(e)  => (e.target.style.borderColor = "#ddd6fe")}
                  />
                  {cur.points.length > 1 && (
                    <button onClick={() => removePoint(activeIdx, pi)} className="p-1 rounded-lg hover:bg-red-50 transition-all" style={{ color: "#ef4444" }}>
                      <X size={13} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => addPoint(activeIdx)}
                className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80 mt-1"
                style={{ color: "#8b5cf6", background: "#ede9fe" }}>
                <Plus size={12} /> Add Point
              </button>
            </div>
          )}
        </div>

        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />

        {isEdit && (
          <div className="flex items-start gap-2 p-3 rounded-xl text-xs"
            style={{ background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e" }}>
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>
              <strong>Existing slides</strong> (blue bar): edit bullet points above — changes saved on submit.
              <br />
              <strong>New slides</strong> (green bar): uploaded images added to gallery on submit.
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
        <CancelBtn onClick={onCancel} />
        <SaveBtn onClick={handleSave} loading={saving} color="#8b5cf6" label={isEdit ? "Update Gallery" : "Save Gallery"} />
      </div>
    </>
  );
}

/* ── QUIZ FORM ──────────────────────────────────────────────── */
function QuizForm({ initial, onSubmit, onCancel, saving }) {
  const [heading,   setHeading]   = useState(initial?.heading || "");
  const [questions, setQuestions] = useState(
    initial?.questions?.length
      ? initial.questions.map((q) => ({ question: q.question, options: q.options || ["","","",""], correctAnswer: q.correctAnswer ?? 0 }))
      : [{ question: "", options: ["","","",""], correctAnswer: 0 }]
  );

  const addQ    = ()         => setQuestions((q) => [...q, { question: "", options: ["","","",""], correctAnswer: 0 }]);
  const removeQ = (i)        => setQuestions((q) => q.filter((_, x) => x !== i));
  const updQ    = (i, f, v)  => setQuestions((q) => q.map((item, x) => x === i ? { ...item, [f]: v } : item));
  const updOpt  = (qi, oi, v) => setQuestions((q) => q.map((item, x) => x === qi ? { ...item, options: item.options.map((o, y) => y === oi ? v : o) } : item));

  return (
    <>
      <div className="space-y-4">
        <Field label="Quiz Heading" color="#f59e0b">
          <TextInput value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="e.g. Chapter 1 Quiz" color="#f59e0b" borderColor="#fde68a" />
        </Field>

        {questions.map((q, qi) => (
          <div key={qi} className="p-4 rounded-2xl space-y-3" style={{ background: "#fffbeb", border: "1.5px solid #fde68a" }}>
            <div className="flex items-start gap-2">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                style={{ background: "#f59e0b", color: "#fff" }}>{qi + 1}</span>
              <input
                value={q.question}
                onChange={(e) => updQ(qi, "question", e.target.value)}
                placeholder="Question text"
                className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none bg-white transition-all"
                style={{ borderColor: "#fde68a" }}
                onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
                onBlur={(e)  => (e.target.style.borderColor = "#fde68a")}
              />
              {questions.length > 1 && (
                <button onClick={() => removeQ(qi)} className="p-1 text-red-400 hover:text-red-600 transition-all mt-0.5"><X size={15} /></button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 ml-8">
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <button
                    onClick={() => updQ(qi, "correctAnswer", oi)}
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ borderColor: q.correctAnswer === oi ? "#6fa86f" : "#d1d5db", background: q.correctAnswer === oi ? "#6fa86f" : "transparent" }}
                  >
                    {q.correctAnswer === oi && <Check size={11} color="#fff" />}
                  </button>
                  <input
                    value={opt}
                    onChange={(e) => updOpt(qi, oi, e.target.value)}
                    placeholder={`Option ${oi + 1}`}
                    className="flex-1 border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none bg-white transition-all"
                    style={{ borderColor: "#fde68a" }}
                  />
                </div>
              ))}
            </div>
            <p className="text-[10px] ml-8" style={{ color: "#f59e0b" }}>● Filled circle = correct answer</p>
          </div>
        ))}

        <button onClick={addQ} className="flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-all" style={{ color: "#f59e0b" }}>
          <Plus size={15} /> Add Question
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
        <CancelBtn onClick={onCancel} />
        <SaveBtn onClick={() => onSubmit({ heading, questions })} loading={saving} color="#f59e0b" />
      </div>
    </>
  );
}



function EnrolledStudents({ courseId }) {
  const [students, setStudents] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/enrollment/get-course-students?courseId=${courseId}`)
      .then(r => setStudents(r.data.data || []))
      .catch(e => Swal.fire({ icon: "error", title: "Error", text: e.response?.data?.message || "Failed to load students.", confirmButtonColor: "#6fa86f" }))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6fa86f] rounded-full animate-spin" />
    </div>
  );

  if (!students.length) return (
    <div className="text-center py-20 rounded-2xl" style={{ background: "#f9fafb", border: "2px dashed #e5e7eb" }}>
      <GraduationCap size={48} className="mx-auto mb-3" style={{ color: "#d1d5db" }} />
      <p className="font-bold text-gray-400 text-lg">No enrolled students yet</p>
      <p className="text-sm text-gray-300 mt-1">Students who enroll will appear here</p>
    </div>
  );

  return (
    <div>
      {/* Summary bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "#f0f7f0" }}>
          <GraduationCap size={15} style={{ color: "#6fa86f" }} />
          <span className="text-sm font-black" style={{ color: "#6fa86f" }}>{students.length} Enrolled</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "#f0fdf4" }}>
          <Activity size={15} style={{ color: "#16a34a" }} />
          <span className="text-sm font-black" style={{ color: "#16a34a" }}>
            {students.filter(s => s.status === "active").length} Active
          </span>
        </div>
      </div>

      {/* Student cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.map((enrollment) => {
          const user = enrollment.user;
          if (!user) return null;
          const enrollDate = new Date(enrollment.enrolledAt).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric"
          });

          return (
            <div key={enrollment._id}
              className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: "#e5e7eb", borderLeft: "4px solid #6fa86f" }}>

              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3.5"
                style={{ background: "linear-gradient(to right, #f0fdf4, #fff)" }}>
                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: "#6fa86f", color: "#fff" }}>
                  {user.username?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-gray-800 truncate">{user.username || "—"}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                {/* Status badge */}
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: enrollment.status === "active" ? "#dcfce7" : "#fef3c7",
                    color:      enrollment.status === "active" ? "#16a34a" : "#92400e"
                  }}>
                  {enrollment.status || "active"}
                </span>
              </div>

              {/* Details */}
              <div className="px-4 py-3 space-y-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {/* Age */}
                  {user.age && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <User size={11} style={{ color: "#6fa86f", flexShrink: 0 }} />
                      Age: <span className="font-bold text-gray-700">{user.age}</span>
                    </div>
                  )}
                  {/* Gender */}
                  {user.gender && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <User size={11} style={{ color: "#6fa86f", flexShrink: 0 }} />
                      <span className="font-bold text-gray-700">{user.gender}</span>
                    </div>
                  )}
                  {/* Phone */}
                  {user.phone_number && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Phone size={11} style={{ color: "#6fa86f", flexShrink: 0 }} />
                      <span className="font-bold text-gray-700 truncate">{user.phone_number}</span>
                    </div>
                  )}
                  {/* Marital status */}
                  {user.maritalStatus && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Activity size={11} style={{ color: "#6fa86f", flexShrink: 0 }} />
                      <span className="font-bold text-gray-700">{user.maritalStatus}</span>
                    </div>
                  )}
                  {/* Pregnancy stage */}
                  {user.pregnancyStage && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 col-span-2">
                      <GraduationCap size={11} style={{ color: "#6fa86f", flexShrink: 0 }} />
                      <span className="font-bold text-gray-700">{user.pregnancyStage}</span>
                      {user.trimester && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold ml-1"
                          style={{ background: "#f0f7f0", color: "#6fa86f" }}>
                          {user.trimester}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span style={{ color: "#9ca3af" }}>PROGRESS</span>
                    <span style={{ color: "#6fa86f" }}>{enrollment.progress || 0}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#e5e7eb" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${enrollment.progress || 0}%`, background: "#6fa86f" }} />
                  </div>
                </div>

                {/* Enrolled date + quiz score footer */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <Calendar size={10} />
                    Enrolled {enrollDate}
                  </div>
                  {enrollment.quizScore > 0 && (
                    <div className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: "#fef3c7", color: "#92400e" }}>
                      <Award size={10} /> Quiz: {enrollment.quizScore}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COURSE QUIZ RESULTS SECTION
   API: GET /api/v1/course/:courseId/get-quiz-result-of-course
───────────────────────────────────────────────────────────── */
function CourseQuizResults({ courseId }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/v1/course/${courseId}/get-quiz-result-of-course`)
      .then(r => setResults(r.data.data || []))
      .catch(e => Swal.fire({ icon: "error", title: "Error", text: e.response?.data?.message || "Failed to load quiz results.", confirmButtonColor: "#6fa86f" }))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#f59e0b] rounded-full animate-spin" />
    </div>
  );

  if (!results.length) return (
    <div className="text-center py-20 rounded-2xl" style={{ background: "#fffbf0", border: "2px dashed #fde68a" }}>
      <Trophy size={48} className="mx-auto mb-3" style={{ color: "#fde68a" }} />
      <p className="font-bold text-amber-700 text-lg">No quiz submissions yet</p>
      <p className="text-sm text-amber-500 mt-1">Results will appear here once students submit the quiz</p>
    </div>
  );

  // Compute stats
  const avgScore     = results.reduce((s, r) => s + r.score, 0) / results.length;
  const highScore    = Math.max(...results.map(r => r.score));
  const totalQ       = results[0]?.totalQuestions || 0;
  const perfectCount = results.filter(r => r.score === r.totalQuestions).length;

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Submissions",   value: results.length,                        color: "#f59e0b", bg: "#fff8e6",  icon: Users },
          { label: "Average Score", value: `${avgScore.toFixed(1)} / ${totalQ}`,  color: "#3b82f6", bg: "#eff6ff",  icon: BarChart },
          { label: "Top Score",     value: `${highScore} / ${totalQ}`,            color: "#6fa86f", bg: "#f0f7f0",  icon: Trophy },
          { label: "Perfect Scores",value: perfectCount,                          color: "#8b5cf6", bg: "#f5f3ff",  icon: Award },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} className="rounded-2xl p-4 text-center" style={{ background: bg }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: color + "22" }}>
              <Icon size={16} style={{ color }} />
            </div>
            <p className="text-xl font-black" style={{ color }}>{value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: color + "aa" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Score distribution bar */}
      {totalQ > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#9ca3af" }}>Score Distribution</p>
          <div className="space-y-2">
            {Array.from({ length: totalQ + 1 }, (_, score) => {
              const count = results.filter(r => r.score === score).length;
              const pct   = results.length ? (count / results.length) * 100 : 0;
              return (
                <div key={score} className="flex items-center gap-3">
                  <span className="text-xs font-bold w-12 text-right flex-shrink-0" style={{ color: "#6b7280" }}>
                    {score}/{totalQ}
                  </span>
                  <div className="flex-1 h-5 rounded-lg overflow-hidden" style={{ background: "#f3f4f6" }}>
                    <div className="h-full rounded-lg flex items-center justify-end pr-2 transition-all duration-700"
                      style={{ width: `${pct}%`, minWidth: count > 0 ? 20 : 0, background: score === totalQ ? "#6fa86f" : "#f59e0b" }}>
                      {count > 0 && <span className="text-[9px] font-black text-white">{count}</span>}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold w-10 flex-shrink-0" style={{ color: "#9ca3af" }}>
                    {pct.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-50 flex items-center gap-2"
          style={{ background: "#fffbf0" }}>
          <Trophy size={16} style={{ color: "#f59e0b" }} />
          <p className="text-sm font-black text-amber-800">All Submissions</p>
          <span className="ml-auto text-[10px] font-black px-2.5 py-1 rounded-full"
            style={{ background: "#f59e0b", color: "#fff" }}>{results.length}</span>
        </div>

        <div className="divide-y divide-gray-50">
          {results
            .slice()
            .sort((a, b) => b.score - a.score) // highest score first
            .map((result, idx) => {
              const user       = result.user;
              const pct        = totalQ ? Math.round((result.score / totalQ) * 100) : 0;
              const isPerfect  = result.score === totalQ;
              const attemptDate = new Date(result.attemptedAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
              });

              return (
                <div key={result._id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-amber-50/30 transition-all">
                  {/* Rank */}
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{
                      background: idx === 0 ? "#fef3c7" : idx === 1 ? "#f3f4f6" : idx === 2 ? "#fff7ed" : "#f9fafb",
                      color:      idx === 0 ? "#92400e" : idx === 1 ? "#6b7280" : idx === 2 ? "#c2410c" : "#9ca3af"
                    }}>
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                  </div>

                  {/* User avatar + info */}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ background: "#f59e0b22", color: "#92400e" }}>
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-gray-800 truncate">{user?.username || "Unknown"}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>

                  {/* Score pill */}
                  <div className="flex-shrink-0 text-center">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ background: isPerfect ? "#dcfce7" : pct >= 70 ? "#fef3c7" : "#fef2f2",
                        color:   isPerfect ? "#16a34a" : pct >= 70 ? "#92400e" : "#dc2626" }}>
                      {isPerfect && <Award size={13} />}
                      <span className="font-black text-sm">{result.score}/{result.totalQuestions}</span>
                      <span className="text-[10px] font-bold opacity-70">({pct}%)</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex-shrink-0 text-right hidden sm:block">
                    <p className="text-[10px] text-gray-400">{attemptDate}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
/* ─────────────────────────────────────────────────────────────
   BLOCK MODAL (wrapper that handles API calls)
───────────────────────────────────────────────────────────── */
function BlockModal({ open, onClose, mode, blockType, block, courseId, onSaved }) {
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (!open) setSaving(false); }, [open]);
  if (!open) return null;

  const type = block?.type || blockType;
  const meta = bm(type);

  const submit = async (data) => {
    setSaving(true);
    try {
      let res;
      if (mode === "add") {
        const ep = { note:"add-note", media:"add-media", gallery:"add-gallery", quiz:"add-quiz" }[type];
        res = await api.post(`/v1/course/${courseId}/${ep}`, data);
      } else {
        res = await api.put(`/v1/course/${courseId}/content/${block._id}`, data);
      }
      onSaved(res.data.data);
      onClose();
      Swal.fire({ icon:"success", title: mode==="add" ? "Block Added!" : "Block Updated!", confirmButtonColor:"#6fa86f", timer:1800, showConfirmButton:false });
    } catch (e) {
      Swal.fire({ icon:"error", title:"Error", text: e.response?.data?.message || "Something went wrong.", confirmButtonColor:"#6fa86f" });
    } finally { setSaving(false); }
  };

  const title = mode === "add" ? `Add ${meta.label} Block` : `Edit ${meta.label} Block`;

  return (
    <ModalShell title={title} accentColor={meta.color} icon={meta.icon} onClose={onClose}>
      {type === "note"    && <NoteForm    initial={block} onSubmit={submit} onCancel={onClose} saving={saving} />}
      {type === "media"   && <VideoForm   initial={block} onSubmit={submit} onCancel={onClose} saving={saving} />}
      {type === "gallery" && <GalleryForm initial={block} onSubmit={submit} onCancel={onClose} saving={saving} isEdit={mode==="edit"} />}
      {type === "quiz"    && <QuizForm    initial={block} onSubmit={submit} onCancel={onClose} saving={saving} />}
    </ModalShell>
  );
}

/* ─────────────────────────────────────────────────────────────
   BLOCK CARD PREVIEWS
───────────────────────────────────────────────────────────── */

/* Note preview */
function NotePreview({ block }) {
  const notes = block.notes?.length
    ? block.notes
    : block.description ? [{ heading: block.heading, description: block.description }] : [];
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#d1fae5" }}>
      <div className="px-4 py-2.5 flex items-center gap-2 border-b" style={{ background: "#dcfce7", borderColor: "#bbf7d0" }}>
        <StickyNote size={13} style={{ color: "#6fa86f" }} />
        <span className="text-xs font-bold text-green-800">{block.heading || "Notes"}</span>
        {notes.length > 1 && <span className="ml-auto text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: "#6fa86f", color: "#fff" }}>{notes.length}</span>}
      </div>
      <div className="p-3 space-y-2" style={{ background: "#f0fdf4" }}>
        {notes.slice(0, 3).map((n, i) => (
          <div key={i} className="rounded-lg border overflow-hidden" style={{ borderColor: "#bbf7d0", background: "#fff" }}>
            {n.heading && <div className="flex items-center gap-2 px-3 py-1.5 border-b" style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black" style={{ background: "#6fa86f", color: "#fff" }}>{i+1}</div>
              <p className="text-xs font-bold text-gray-700">{n.heading}</p>
            </div>}
            <p className="text-xs text-gray-500 px-3 py-2 leading-relaxed line-clamp-2 whitespace-pre-wrap">{n.description}</p>
          </div>
        ))}
        {notes.length > 3 && <p className="text-xs text-gray-300 text-center py-1">+{notes.length - 3} more notes</p>}
      </div>
    </div>
  );
}

/* Gallery preview (PowerPoint-style) */
function GalleryPreview({ block }) {
  const [cur, setCur] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const imgs = block.images || [];
  if (!imgs.length) return <div className="flex items-center justify-center h-20 rounded-xl text-xs text-gray-300" style={{ background: "#faf5ff", border: "2px dashed #e9d5ff" }}>No slides</div>;

  const slide = imgs[cur];
  const prev  = () => setCur((i) => (i - 1 + imgs.length) % imgs.length);
  const next  = () => setCur((i) => (i + 1) % imgs.length);

  return (
    <>
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#e9d5ff" }}>
        {/* Split: image | bullets */}
        <div className="flex" style={{ minHeight: 180 }}>
          {/* image */}
          <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "52%", background: "#1e1b4b", minHeight: 180 }}>
            {imgs.map((img, i) => (
              <div key={i} className="absolute inset-0 transition-all duration-400" style={{ opacity: i===cur ? 1:0, zIndex: i===cur ? 1:0 }}>
                <img src={img.url} alt="" className="w-full h-full object-cover" style={{ minHeight: 180 }} />
              </div>
            ))}
            <div className="absolute top-2 right-2 z-10 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background:"rgba(0,0,0,0.6)", color:"#fff" }}>{cur+1}/{imgs.length}</div>
            <button onClick={()=>setLightbox(slide.url)} className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-all" style={{ background:"rgba(0,0,0,0.55)", color:"#fff" }}><ZoomIn size={11}/></button>
            {imgs.length > 1 && (<>
              <button onClick={prev} className="absolute left-1 bottom-2 z-10 w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-all" style={{ background:"rgba(0,0,0,0.5)", color:"#fff" }}><ChevronLeft size={13}/></button>
              <button onClick={next} className="absolute right-1 bottom-2 z-10 w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-all" style={{ background:"rgba(0,0,0,0.5)", color:"#fff" }}><ChevronRight size={13}/></button>
            </>)}
          </div>
          {/* bullets */}
          <div className="flex-1 p-3 flex flex-col justify-center" style={{ background:"#faf5ff" }}>
            <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color:"#8b5cf6" }}>Slide {cur+1} notes</p>
            {Array.isArray(slide.description) && slide.description.length > 0
              ? <ul className="space-y-1.5">{slide.description.slice(0,4).map((pt,pi)=>(
                  <li key={pi} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5" style={{ background:"#8b5cf6", color:"#fff" }}>{pi+1}</div>
                    <span className="line-clamp-1">{pt}</span>
                  </li>
                ))}</ul>
              : <p className="text-xs italic" style={{ color:"#c4b5fd" }}>No notes</p>
            }
          </div>
        </div>
        {/* thumb strip */}
        {imgs.length > 1 && (
          <div className="flex gap-1.5 p-2 overflow-x-auto" style={{ background:"#f3e8ff", borderTop:"1px solid #e9d5ff" }}>
            {imgs.map((img,i)=>(
              <button key={i} onClick={()=>setCur(i)} className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
                style={{ width:52, height:36, outline: i===cur ? "2.5px solid #8b5cf6":"2px solid transparent", opacity: i===cur ? 1:0.5 }}>
                <img src={img.url} alt="" className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        )}
        {/* dots */}
        {imgs.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 py-2" style={{ background:"#faf5ff" }}>
            {imgs.map((_,i)=>(
              <button key={i} onClick={()=>setCur(i)} className="rounded-full transition-all duration-300"
                style={{ width: i===cur ? 18:6, height:6, background: i===cur ? "#8b5cf6":"#ddd6fe" }}/>
            ))}
          </div>
        )}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.88)" }} onClick={()=>setLightbox(null)}>
          <img src={lightbox} alt="" className="max-w-4xl max-h-[88vh] object-contain rounded-xl shadow-2xl"/>
          <button className="absolute top-5 right-5 p-2 rounded-full hover:scale-110 transition-all" style={{ background:"rgba(255,255,255,0.12)", color:"#fff" }} onClick={()=>setLightbox(null)}><X size={22}/></button>
        </div>
      )}
    </>
  );
}

/* Video preview */
function VideoPreview({ block }) {
  if (!block.videoUrl) return <div className="h-16 rounded-xl flex items-center justify-center text-xs text-gray-300" style={{ background:"#eff6ff", border:"2px dashed #bfdbfe" }}>No video file</div>;
  return (
    <div className="rounded-xl overflow-hidden bg-black aspect-video shadow-sm">
      <video src={block.videoUrl} controls className="w-full h-full"/>
    </div>
  );
}

/* Quiz preview */
function QuizPreview({ block }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor:"#fde68a" }}>
      <div className="px-4 py-2.5 border-b" style={{ background:"#fff8e6", borderColor:"#fde68a" }}>
        <p className="text-xs font-bold text-amber-800">{block.questions?.length || 0} Question{block.questions?.length !== 1 ? "s":""}</p>
      </div>
      <div className="p-3 space-y-2" style={{ background:"#fffbeb" }}>
        {block.questions?.slice(0,2).map((q,i)=>(
          <div key={i} className="p-2.5 rounded-lg bg-white border border-amber-100">
            <p className="text-xs font-semibold text-gray-700 mb-1.5"><span style={{ color:"#f59e0b" }}>Q{i+1}.</span> {q.question}</p>
            <div className="grid grid-cols-2 gap-1">
              {q.options?.map((opt,oi)=>(
                <div key={oi} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg"
                  style={{ background: q.correctAnswer===oi ? "#f0f7f0":"#f9fafb", color: q.correctAnswer===oi ? "#6fa86f":"#6b7280", fontWeight: q.correctAnswer===oi ? 600:400 }}>
                  {q.correctAnswer===oi && <Check size={10} style={{ color:"#6fa86f" }}/>}
                  {String.fromCharCode(65+oi)}. {opt}
                </div>
              ))}
            </div>
          </div>
        ))}
        {block.questions?.length > 2 && <p className="text-[10px] text-gray-300 text-center">+{block.questions.length-2} more questions</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTENT BLOCK CARD
───────────────────────────────────────────────────────────── */
function BlockCard({ block, onEdit, onDelete }) {
  const [open, setOpen] = useState(true);
  const meta = bm(block.type);
  const Icon = meta.icon;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4 transition-all hover:shadow-md"
      style={{ borderLeft: `4px solid ${meta.color}` }}>
      {/* header row */}
      <div className="flex items-center gap-3 px-5 py-3.5 cursor-pointer select-none" onClick={()=>setOpen(o=>!o)}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: meta.bg }}>
          <Icon size={17} style={{ color: meta.color }}/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: meta.color }}>{meta.label}</p>
          <p className="text-sm font-black text-gray-800 truncate">{block.heading || "Untitled"}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={(e)=>{ e.stopPropagation(); onEdit(block); }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:opacity-80"
            style={{ background: meta.bg, color: meta.color }}
          >
            <Pencil size={12}/> Edit
          </button>
          <button
            onClick={(e)=>{ e.stopPropagation(); onDelete(block); }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:bg-red-100"
            style={{ background:"#fef2f2", color:"#ef4444" }}
          >
            <Trash2 size={12}/>
          </button>
          <span className="text-gray-300 text-xs">{open ? "▲":"▼"}</span>
        </div>
      </div>
      {/* body */}
      {open && (
        <div className="px-5 pb-5 pt-1">
          {block.type === "note"    && <NotePreview    block={block}/>}
          {block.type === "gallery" && <GalleryPreview block={block}/>}
          {block.type === "media"   && <VideoPreview   block={block}/>}
          {block.type === "quiz"    && <QuizPreview    block={block}/>}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ADD BLOCK PICKER
───────────────────────────────────────────────────────────── */
function BlockPicker({ onPick }) {
  return (
    <div className="rounded-2xl p-4 mb-5 border-2 border-dashed" style={{ background:"#f9fafb", borderColor:"#e5e7eb" }}>
      <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color:"#9ca3af" }}>Add Content Block</p>
      <div className="flex flex-wrap gap-2">
        {BLOCK_TYPES.map(({ type, label, icon: Icon, color, bg }) => (
          <button key={type} onClick={()=>onPick(type)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
            style={{ background: bg, color }}>
            <Icon size={15}/> {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COURSE CONTENT MANAGER
───────────────────────────────────────────────────────────── */
function ContentManager({ courseId }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState({ open:false, mode:"add", type:null, block:null });

  const load = async () => {
    setLoading(true);
    try { const r = await api.get(`/v1/course/${courseId}`); setContent(r.data.data?.content || []); }
    catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, [courseId]);

  const handleSaved  = (course) => setContent(course.content || []);
  const openAdd      = (type)   => setModal({ open:true, mode:"add", type, block:null });
  const openEdit     = (block)  => setModal({ open:true, mode:"edit", type:block.type, block });
  const closeModal   = ()       => setModal(m=>({ ...m, open:false }));

  const handleDelete = (block) => {
    Swal.fire({ title:"Delete block?", text:`This "${block.type}" block will be removed.`, icon:"warning",
      showCancelButton:true, confirmButtonColor:"#dc2626", cancelButtonColor:"#6b7280", confirmButtonText:"Yes, delete" })
      .then(async (r) => {
        if (!r.isConfirmed) return;
        try {
          await api.delete(`/v1/course/${courseId}/content/${block._id}`);
          await load();
          Swal.fire({ icon:"success", title:"Deleted!", timer:1500, showConfirmButton:false, confirmButtonColor:"#6fa86f" });
        } catch(e) {
          Swal.fire({ icon:"error", title:"Error", text:e.response?.data?.message||"Delete failed.", confirmButtonColor:"#6fa86f" });
        }
      });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
          <Layers size={20} style={{ color:"#6fa86f" }}/> Content Blocks
        </h3>
        <span className="text-xs font-black px-2.5 py-0.5 rounded-full text-white" style={{ background:"#6fa86f" }}>{content.length}</span>
      </div>

      <BlockPicker onPick={openAdd}/>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#6fa86f] rounded-full animate-spin"/>
        </div>
      ) : content.length === 0 ? (
        <div className="text-center py-14 rounded-2xl" style={{ background:"#f9fafb", border:"2px dashed #e5e7eb" }}>
          <Layers size={40} className="mx-auto mb-3" style={{ color:"#d1d5db" }}/>
          <p className="font-bold text-gray-400">No content blocks yet</p>
          <p className="text-sm text-gray-300 mt-1">Use the buttons above to add your first block</p>
        </div>
      ) : content.map(block => (
        <BlockCard key={block._id} block={block} onEdit={openEdit} onDelete={handleDelete}/>
      ))}

      <BlockModal
        open={modal.open} onClose={closeModal}
        mode={modal.mode} blockType={modal.type} block={modal.block}
        courseId={courseId} onSaved={handleSaved}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COURSE FORM MODAL
───────────────────────────────────────────────────────────── */
function CourseModal({ open, onClose, onSaved, editCourse }) {
  const isEdit = !!editCourse;
  const thumbRef = useRef();
  const [form, setForm] = useState({ title:"", description:"", price:"", duration:"", level:"Beginner", category:"", isPublished:false });
  const [thumb,   setThumb]   = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    if (!open) return;
    if (editCourse) {
      setForm({ title:editCourse.title||"", description:editCourse.description||"", price:editCourse.price??"",
        duration:editCourse.duration||"", level:editCourse.level||"Beginner", category:editCourse.category||"", isPublished:editCourse.isPublished||false });
      setPreview(editCourse.thumbnail||null);
    } else {
      setForm({ title:"", description:"", price:"", duration:"", level:"Beginner", category:"", isPublished:false });
      setPreview(null);
    }
    setThumb(null);
  }, [open, editCourse]);

  const submit = async () => {
    if (!form.title.trim()) { Swal.fire({ icon:"warning", title:"Required", text:"Title is required.", confirmButtonColor:"#6fa86f" }); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if (thumb) fd.append("thumbnail", thumb);
      const r = isEdit ? await api.put(`/v1/course/update/${editCourse._id}`, fd) : await api.post("/v1/course/create", fd);
      onSaved(r.data.data); onClose();
      Swal.fire({ icon:"success", title: isEdit ? "Course Updated!" : "Course Created!", confirmButtonColor:"#6fa86f", timer:2000, showConfirmButton:false });
    } catch(e) {
      Swal.fire({ icon:"error", title:"Error", text:e.response?.data?.message||"Something went wrong.", confirmButtonColor:"#6fa86f" });
    } finally { setSaving(false); }
  };

  if (!open) return null;

  const inp = "w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none bg-gray-50 transition-all";
  const brd = "#e5e7eb";
  const onF = (e) => (e.target.style.borderColor = "#6fa86f");
  const onB = (e) => (e.target.style.borderColor = brd);

  return (
    <ModalShell
      title={isEdit ? "Edit Course" : "Create New Course"}
      accentColor="#6fa86f"
      icon={BookOpen}
      onClose={onClose}
      footer={<><CancelBtn onClick={onClose}/><SaveBtn onClick={submit} loading={saving} label={isEdit ? "Update Course" : "Create Course"}/></>}
    >
      <div className="space-y-5">
        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail Image</label>
          <div onClick={()=>thumbRef.current.click()} className="border-2 border-dashed rounded-xl overflow-hidden cursor-pointer hover:border-[#6fa86f] transition-colors" style={{ borderColor:brd }}>
            {preview
              ? <img src={preview} alt="" className="w-full h-40 object-cover"/>
              : <div className="h-32 flex flex-col items-center justify-center gap-2 text-gray-400">
                  <Upload size={28} style={{ color:"#6fa86f" }}/>
                  <span className="text-sm"><span className="font-semibold" style={{ color:"#6fa86f" }}>Click to upload</span> thumbnail</span>
                </div>
            }
          </div>
          <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={(e)=>{ const f=e.target.files[0]; if(f){setThumb(f); setPreview(URL.createObjectURL(f));} }}/>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Title <span className="text-red-400">*</span></label>
          <input className={inp} style={{ borderColor:brd }} onFocus={onF} onBlur={onB} placeholder="e.g. Complete Pregnancy Guide" value={form.title} onChange={(e)=>setForm(f=>({...f,title:e.target.value}))}/>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
          <textarea rows={3} className={inp+" resize-none"} style={{ borderColor:brd }} onFocus={onF} onBlur={onB} placeholder="What will students learn?" value={form.description} onChange={(e)=>setForm(f=>({...f,description:e.target.value}))}/>
        </div>

        {/* Price + Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
            <input type="number" className={inp} style={{ borderColor:brd }} onFocus={onF} onBlur={onB} placeholder="0 = Free" value={form.price} onChange={(e)=>setForm(f=>({...f,price:e.target.value}))}/>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Duration</label>
            <input className={inp} style={{ borderColor:brd }} onFocus={onF} onBlur={onB} placeholder="e.g. 4 weeks" value={form.duration} onChange={(e)=>setForm(f=>({...f,duration:e.target.value}))}/>
          </div>
        </div>

        {/* Level + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Level</label>
            <select className={inp} style={{ borderColor:brd }} value={form.level} onChange={(e)=>setForm(f=>({...f,level:e.target.value}))}>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <input className={inp} style={{ borderColor:brd }} onFocus={onF} onBlur={onB} placeholder="e.g. Pregnancy" value={form.category} onChange={(e)=>setForm(f=>({...f,category:e.target.value}))}/>
          </div>
        </div>

        {/* Published toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={form.isPublished} onChange={(e)=>setForm(f=>({...f,isPublished:e.target.checked}))}/>
            <div className="w-11 h-6 rounded-full transition-colors" style={{ background: form.isPublished ? "#6fa86f":"#e5e7eb" }}/>
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" style={{ transform: form.isPublished ? "translateX(20px)":"translateX(0)" }}/>
          </div>
          <span className="text-sm font-bold text-gray-700">Published <span className="font-normal text-gray-400">(visible to students)</span></span>
        </label>
      </div>
    </ModalShell>
  );
}

/* ─────────────────────────────────────────────────────────────
   PDF UPLOAD MODAL
───────────────────────────────────────────────────────────── */
function PdfModal({ open, onClose, course }) {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(()=>{ if(open) setFile(null); }, [open]);

  const upload = async () => {
    if (!file) { Swal.fire({ icon:"warning", title:"No file", text:"Select a PDF first.", confirmButtonColor:"#6fa86f" }); return; }
    setSaving(true);
    try {
      const fd = new FormData(); fd.append("pdf", file);
      await api.put(`/v1/course/${course._id}/upload-pdf`, fd);
      onClose();
      Swal.fire({ icon:"success", title:"PDF Uploaded!", confirmButtonColor:"#6fa86f", timer:2000, showConfirmButton:false });
    } catch(e) {
      Swal.fire({ icon:"error", title:"Upload failed", text:e.response?.data?.message||"Error.", confirmButtonColor:"#6fa86f" });
    } finally { setSaving(false); }
  };

  if (!open) return null;
  return (
    <ModalShell
      title="Upload PDF Material"
      accentColor="#92400e"
      icon={FileText}
      onClose={onClose}
      footer={<><CancelBtn onClick={onClose}/><SaveBtn onClick={upload} loading={saving} color="#92400e" label="Upload PDF" icon={Upload}/></>}
    >
      <p className="text-sm text-gray-500 mb-4">Uploading for: <span className="font-bold text-gray-800">{course?.title}</span></p>
      <div onClick={()=>ref.current.click()} className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:opacity-80 transition-all" style={{ borderColor:"#d97706", background:"#fffbeb" }}>
        <FileText size={38} className="mx-auto mb-3" style={{ color:"#92400e", opacity:0.7 }}/>
        {file
          ? <p className="text-sm font-bold" style={{ color:"#92400e" }}>✓ {file.name}</p>
          : <p className="text-sm text-gray-400"><span className="font-bold" style={{ color:"#92400e" }}>Click to select</span> a PDF file</p>
        }
      </div>
      <input ref={ref} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e)=>setFile(e.target.files[0])}/>
    </ModalShell>
  );
}

/* ─────────────────────────────────────────────────────────────
   COURSE DETAIL VIEW (tabs: Overview | Content Blocks | PDF)
───────────────────────────────────────────────────────────── */
function CourseDetail({ courseId, onBack }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("content");

  useEffect(()=>{
    setLoading(true);
    api.get(`/v1/course/${courseId}`).then(r=>setCourse(r.data.data)).catch(console.error).finally(()=>setLoading(false));
  }, [courseId]);

  if (loading) return <div className="flex items-center justify-center py-24"><div className="w-10 h-10 border-4 border-gray-200 border-t-[#6fa86f] rounded-full animate-spin"/></div>;
  if (!course) return <div className="text-center py-24 text-gray-400">Course not found.</div>;

  const pdfUrl = course.pdfUrl || course.pdf;
const TABS = [
    { id: "overview",  label: "Overview",          icon: BookOpen       },
    { id: "content",   label: "Content Blocks",     icon: Layers         },
    { id: "pdf",       label: "PDF Material",        icon: FileText       },
    { id: "students",  label: "Enrolled Students",   icon: GraduationCap, count: null },
    { id: "quiz",      label: "Quiz Results",        icon: Trophy,        count: null },
  ];

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold mb-6 hover:opacity-70 transition-all" style={{ color:"#6fa86f" }}>
        <ChevronLeft size={18}/> Back to Courses
      </button>

      {/* Hero */}
      <div className="rounded-3xl overflow-hidden mb-6" style={{ background:"linear-gradient(135deg,#1c2b1c 0%,#2d4a2d 60%,#1a3a1a 100%)" }}>
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ background:"rgba(111,168,111,0.2)", color:"#6fa86f" }}>{course.category}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background:"rgba(255,255,255,0.08)", color:"#c8e0c8" }}>{course.level}</span>
                <span className={`text-xs font-black px-3 py-1 rounded-full ${course.isPublished ? "text-[#6fa86f]" : "text-yellow-400"}`}
                  style={{ background: course.isPublished ? "rgba(111,168,111,0.2)":"rgba(234,179,8,0.2)" }}>
                  {course.isPublished ? "● Published":"● Draft"}
                </span>
              </div>
              <h1 className="text-3xl font-black text-white mt-2 mb-3 leading-snug">{course.title}</h1>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color:"#8faa8f" }}>{course.description}</p>
              <div className="flex flex-wrap gap-3 mt-5">
                {[
                  { icon:BarChart2, label:course.level },
                  { icon:Clock,    label:course.duration||"Self-paced" },
                  { icon:Users,    label:course.instructor?.username },
                  { icon:Layers,   label:`${course.content?.length||0} blocks` },
                ].map(({ icon:Icon, label }) => label && (
                  <span key={label} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background:"rgba(255,255,255,0.08)", color:"#c8e0c8" }}>
                    <Icon size={12}/>{label}
                  </span>
                ))}
              </div>
            </div>
            {course.thumbnail
              ? <img src={course.thumbnail} alt={course.title} className="w-full md:w-52 h-40 object-cover rounded-2xl flex-shrink-0 shadow-2xl" style={{ border:"3px solid rgba(111,168,111,0.3)" }}/>
              : <div className="w-full md:w-52 h-40 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:"rgba(255,255,255,0.05)" }}><BookOpen size={48} style={{ color:"#6fa86f", opacity:0.35 }}/></div>
            }
          </div>
          <div className="mt-6 pt-5 border-t" style={{ borderColor:"rgba(255,255,255,0.08)" }}>
            <span className="text-3xl font-black" style={{ color: course.price ? "#f59e0b":"#6fa86f" }}>{course.price ? `$${course.price}`:"Free"}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl w-fit mb-6 flex-wrap" style={{ background: "#f3f4f6" }}>
    {TABS.map(({ id, label, icon: Icon }) => (
      <button key={id} onClick={() => setTab(id)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
        style={{
          background: tab === id ? "#fff" : "transparent",
          color:      tab === id ? "#6fa86f" : "#6b7280",
          boxShadow:  tab === id ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
        }}>
        <Icon size={15} />{label}
      </button>
    ))}
  </div>

      {/* Tab panels */}
      {tab === "overview" && (
        course.lessons?.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={20} style={{ color:"#6fa86f" }}/>Lessons ({course.lessons.length})</h3>
            {course.lessons.map((l,i)=>(
              <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ background:"#6fa86f", color:"#fff" }}>{i+1}</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{l.title}</p>
                  {l.duration && <p className="text-xs text-gray-400">{l.duration} min</p>}
                </div>
              </div>
            ))}
          </div>
        ) : <div className="text-center py-12 text-gray-300 rounded-2xl" style={{ background:"#f9fafb" }}>No lessons attached.</div>
      )}

      {tab === "content" && <ContentManager courseId={courseId}/>}

      {tab === "pdf" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2"><FileText size={20} style={{ color:"#92400e" }}/>Course PDF</h3>
          {pdfUrl ? (
            <>
              <a href={pdfUrl} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl font-bold text-sm no-underline mb-4 transition-all hover:scale-[1.01]"
                style={{ background:"#fff8e6", border:"1.5px solid #fde68a", color:"#92400e" }}>
                <FileText size={20}/> 📥 Open / Download PDF
              </a>
              <iframe src={pdfUrl} title="PDF" className="w-full rounded-xl" style={{ height:480, border:"1px solid #e5e7eb" }}/>
            </>
          ) : <div className="text-center py-12 text-gray-300 rounded-2xl" style={{ background:"#f9fafb" }}>No PDF uploaded yet.</div>}
        </div>
      )}

      {tab === "students" && (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-black text-gray-800 mb-5 flex items-center gap-2">
        <GraduationCap size={20} style={{ color: "#6fa86f" }} />
        Enrolled Users
      </h3>
      <EnrolledStudents courseId={courseId} />
    </div>
  )}

  {tab === "quiz" && (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-black text-gray-800 mb-5 flex items-center gap-2">
        <Trophy size={20} style={{ color: "#f59e0b" }} />
        Quiz Results
      </h3>
      <CourseQuizResults courseId={courseId} />
    </div>
  )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COURSE CARD (list view)
───────────────────────────────────────────────────────────── */
function CourseCard({ course, onEdit, onDelete, onPdf, onView }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* thumb */}
      <div className="relative h-40" style={{ background:"linear-gradient(135deg,#1c2b1c,#2d4a2d)" }}>
        {course.thumbnail
          ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover"/>
          : <div className="w-full h-full flex items-center justify-center"><BookOpen size={38} style={{ color:"#6fa86f", opacity:0.35 }}/></div>
        }
        <span className={`absolute top-2 left-2 text-[10px] font-black px-2.5 py-1 rounded-full`}
          style={{ background: course.isPublished ? "#6fa86f":"#fef3c7", color: course.isPublished ? "#fff":"#92400e" }}>
          {course.isPublished ? "Published":"Draft"}
        </span>
        <span className="absolute top-2 right-2 text-[10px] font-black px-2.5 py-1 rounded-full text-white" style={{ background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)" }}>
          {course.level}
        </span>
        {/* content type badges */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {course.content?.some(b=>b.type==="media")   && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background:"#3b82f6", color:"#fff" }}>VIDEO</span>}
          {course.content?.some(b=>b.type==="gallery") && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background:"#8b5cf6", color:"#fff" }}>SLIDES</span>}
          {course.content?.some(b=>b.type==="quiz")    && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background:"#f59e0b", color:"#fff" }}>QUIZ</span>}
        </div>
      </div>

      {/* body */}
      <div className="p-4">
        <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color:"#6fa86f" }}>{course.category||"General"}</p>
        <h3 className="font-black text-gray-800 text-base mb-1 leading-snug line-clamp-1">{course.title}</h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{course.description||"No description."}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 flex-wrap">
          <span className="flex items-center gap-1"><Clock size={11}/>{course.duration||"—"}</span>
          <span className="flex items-center gap-1"><BookOpen size={11}/>{course.lessons?.length||0} lessons</span>
          <span className="flex items-center gap-1"><Layers size={11}/>{course.content?.length||0} blocks</span>
        </div>
        <p className="text-lg font-black" style={{ color: course.price ? "#92400e":"#6fa86f" }}>
          {course.price ? `$${course.price}`:"Free"}
        </p>
      </div>

      {/* actions */}
      <div className="flex items-center gap-2 px-4 pb-4 flex-wrap">
        <button onClick={()=>onView(course._id)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all" style={{ borderColor:"#e5e7eb" }}>
          <Eye size={12}/> View
        </button>
        <button onClick={()=>onEdit(course)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-all" style={{ background:"#6fa86f" }}>
          <Pencil size={12}/> Edit
        </button>
        <button onClick={()=>onPdf(course)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-all" style={{ background:"#92400e" }}>
          <Upload size={12}/> PDF
        </button>
        <button onClick={()=>onDelete(course)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-red-100 transition-all ml-auto" style={{ background:"#fef2f2", color:"#ef4444" }}>
          <Trash2 size={12}/>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
export default function AdminCoursesPage() {
  const [courses,    setCourses]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [pdfCourse,  setPdfCourse]  = useState(null);
  const [viewId,     setViewId]     = useState(null);

  const load = async () => {
    setLoading(true);
    try { const r = await api.get("/v1/course/"); setCourses(r.data.data||[]); }
    catch(e) { Swal.fire({ icon:"error", title:"Load failed", text:e.response?.data?.message||"Could not fetch courses.", confirmButtonColor:"#6fa86f" }); }
    finally { setLoading(false); }
  };
  useEffect(()=>{ load(); }, []);

  const upsert = (course) => setCourses(prev => {
    const i = prev.findIndex(c=>c._id===course._id);
    if (i>=0) { const n=[...prev]; n[i]=course; return n; }
    return [course, ...prev];
  });

  const del = (course) => {
    Swal.fire({ title:"Delete course?", text:`"${course.title}" will be permanently deleted.`, icon:"warning",
      showCancelButton:true, confirmButtonColor:"#dc2626", cancelButtonColor:"#6b7280", confirmButtonText:"Yes, delete" })
      .then(async r => {
        if (!r.isConfirmed) return;
        try {
          await api.delete(`/v1/course/${course._id}`);
          setCourses(p=>p.filter(c=>c._id!==course._id));
          Swal.fire({ icon:"success", title:"Deleted!", timer:1800, showConfirmButton:false, confirmButtonColor:"#6fa86f" });
        } catch(e) {
          Swal.fire({ icon:"error", title:"Error", text:e.response?.data?.message||"Delete failed.", confirmButtonColor:"#6fa86f" });
        }
      });
  };

  if (viewId) return (
    <div className="">
      <CourseDetail courseId={viewId} onBack={()=>{ setViewId(null); load(); }}/>
    </div>
  );

  return (
    <div className="">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"#6fa86f" }}>
              <BookOpen size={19} color="#fff"/>
            </span>
            Courses
            <span className="text-xs font-black text-white px-2.5 py-1 rounded-full ml-1" style={{ background:"#6fa86f" }}>{courses.length}</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1 ml-11">Manage your entire course catalog</p>
        </div>
        <button onClick={()=>setCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-white rounded-xl font-bold text-sm shadow-sm transition-all hover:opacity-90 hover:shadow-md active:scale-95"
          style={{ background:"#6fa86f" }}>
          <Plus size={17}/> New Course
        </button>
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#6fa86f] rounded-full animate-spin"/>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-24">
          <BookOpen size={60} className="mx-auto mb-5" style={{ color:"#e5e7eb" }}/>
          <h2 className="text-xl font-black text-gray-400 mb-2">No courses yet</h2>
          <p className="text-sm text-gray-300 mb-6">Create your first course to get started.</p>
          <button onClick={()=>setCreateOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all"
            style={{ background:"#6fa86f" }}>
            <Plus size={16}/> Create Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.map(c=>(
            <CourseCard key={c._id} course={c}
              onEdit={setEditCourse}
              onDelete={del}
              onPdf={setPdfCourse}
              onView={setViewId}
            />
          ))}
        </div>
      )}

      {/* ── Modals ── */}
      <CourseModal open={createOpen}   onClose={()=>setCreateOpen(false)} onSaved={c=>{ upsert(c); load(); }} editCourse={null}/>
      <CourseModal open={!!editCourse} onClose={()=>setEditCourse(null)}  onSaved={c=>{ upsert(c); load(); }} editCourse={editCourse}/>
      <PdfModal   open={!!pdfCourse}  onClose={()=>setPdfCourse(null)}   course={pdfCourse}/>

      {/* spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
