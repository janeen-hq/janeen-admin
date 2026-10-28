import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Edit2, Trash2, Eye, Calendar } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminBlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const userInfo = JSON.parse(sessionStorage.getItem("user"));
const sessionUserId = userInfo?.id;

const [noteMode, setNoteMode] = useState(false);
const [adminNote, setAdminNote] = useState('');

// ✅ NEW
const isOwner = (blog) => {
  return blog?.author?._id === sessionUserId || blog?.author === sessionUserId;
};

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Pregnancy',
    authorId: '6908fc874139e9f58548ba64'
  });



  const editorRef = useRef(null);
  const categories = ['Pregnancy', 'Parenting', 'Child Health', 'Nutrition', 'Other'];
const handleAddNote = (blog) => {
  setNoteMode(true);
  setEditMode(false);
  setCurrentBlogId(blog._id);
  setAdminNote(blog.adminnote || '');
  setShowModal(true);
};

const categoryImages = {
  Pregnancy: 'https://plus.unsplash.com/premium_photo-1661375236848-15faed2ad370?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  Parenting: 'https://www.unicef.org/parenting/sites/unicef.org.parenting/files/styles/hero_extended/public/thumbnail_AdobeStock_527959482.jpg.webp?itok=KHNxu70s',
  'Child Health': 'https://cdn.stocksnap.io/img-thumbs/960w/kids-playing_84NQDCMJNE.jpg',
};

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/blogs/',
         {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
               'ngrok-skip-browser-warning': '69420'
            },
          }
      );
      const result = await response.json();
      if (result.success) {
        setBlogs(result.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

const handleSubmit = async () => {
  setLoading(true);

  try {
    let response;

  
    if (noteMode) {
      response = await fetch(
        `http://localhost:8080/api/v1/blogs/update/${currentBlogId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminnote: adminNote }),
        }
      );
    }

    // ✏️ CREATE / EDIT BLOG
    else {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', editorRef.current.innerHTML);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('authorId', formData.authorId);
      if (thumbnail) formDataToSend.append('thumbnail', thumbnail);

      const url = editMode
        ? `http://localhost:8080/api/v1/blogs/update/${currentBlogId}`
        : `http://localhost:8080/api/v1/blogs/create`;

      response = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        body: formDataToSend,
      });
    }

    const result = await response.json();

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: noteMode ? 'Added Note Successfully' : 'Blog Saved',
        timer: 1500,
        showConfirmButton: false,
      });

      setShowModal(false);
      setNoteMode(false);
      setEditMode(false);
      fetchBlogs();
    }
  } catch (err) {
    Swal.fire('Error', 'Something went wrong', 'error');
  } finally {
    setLoading(false);
  }
};


const handleEdit = (blog) => {
  setEditMode(true);
  setNoteMode(false);
  setCurrentBlogId(blog._id);

  setFormData({
    title: blog.title,
    content: blog.content,
    category: blog.category,
    authorId: blog.author?._id || blog.author,
  });

  setThumbnailPreview(blog.thumbnail || '');
  setShowModal(true);

  setTimeout(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = blog.content;
    }
  }, 100);
};

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/v1/blogs/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        alert('Blog deleted successfully!');
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'Pregnancy',
      authorId: '6908fc874139e9f58548ba64'
    });
    setThumbnail(null);
    setThumbnailPreview('');
    setEditMode(false);
    setCurrentBlogId(null);
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  const openCreateModal = () => {
   resetForm();
  setEditMode(false);
  setNoteMode(false);
  setShowModal(true);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

 const handlePublish = async (blogId) => {
  const confirm = await Swal.fire({
    title: 'Publish Blog?',
    text: 'This blog will be visible to users.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#16A34A',
    cancelButtonColor: '#DC2626',
    confirmButtonText: 'Yes, Publish'
  });

  if (!confirm.isConfirmed) return;
  const token = sessionStorage.getItem("adminToken");

  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/blogs/publish/${blogId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    const result = await response.json();

    if (result.success) {
      await Swal.fire({
        title: 'Published!',
        text: 'Blog has been published successfully.',
        icon: 'success',
        confirmButtonColor: '#16A34A'
      });

      fetchBlogs(); // refresh list
    } else {
      Swal.fire({
        title: 'Error',
        text: result.error || 'Failed to publish blog',
        icon: 'error'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message || 'Something went wrong',
      icon: 'error'
    });
  }
};



  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Blog Management</h1>
              <p className="text-gray-600 mt-1">Create and manage your health blogs</p>
            </div>
            <button
              onClick={openCreateModal}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-200 transition-all duration-300 hover:scale-105"
            >
              <Plus size={20} />
              Create New Blog
            </button>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-[#86EFAC] to-[#BBF7D0] overflow-hidden">
                {blog.thumbnail ? (
                  <img 
                  src={blog.thumbnail}

                   alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                //   <div className="w-full h-full flex items-center justify-center text-white text-6xl">📝</div>
               <img
  src={categoryImages[blog.category] || 'https://cdn.stocksnap.io/img-thumbs/960w/kids-playing_84NQDCMJNE.jpg'}
  alt={blog.title}
  className="w-full h-full object-cover"
/>
               )}

               {/* Publish Status */}
  <div
    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold
      ${blog.isPublished ? 'bg-green-600 text-white' : 'bg-yellow-400 text-black'}`}
  >
    {blog.isPublished ? 'Published' : 'Unpublished'}
  </div>

  {/* Category */}
 
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-violet-600">
                  {blog.category}
                </div>
              </div>
             
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{stripHtml(blog.content)}</p>
                  <div className=" right-3  mb-1 rounded-full text-sm font-semibold text-violet-600 capitalize">
    Created By {blog.authorname}
  </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{blog.views} views</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                      <div className="flex gap-2 flex-wrap">
  {!blog.isPublished && (
    <button
      onClick={() => handlePublish(blog._id)}
      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all"
    >
      Publish
    </button>
  )}

<div className="flex gap-2 flex-wrap">

  {/* ✅ ADD NOTE – ALL ADMINS */}
  <button
    onClick={() => handleAddNote(blog)}
    className="flex-1 flex items-center justify-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-lg font-medium hover:bg-violet-200 transition-all"
  >
    Add Note
  </button>

  {/* ✅ EDIT / DELETE – OWNER ONLY */}
  {isOwner(blog) && (
    <>
      <button
        onClick={() => handleEdit(blog)}
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all"
      >
        <Edit2 size={16} />
        Edit
      </button>

      <button
        onClick={() => handleDelete(blog._id)}
        className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </>
  )}
</div>

</div>
              </div>
            </div>
          ))}


        </div>

        {blogs.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Blogs Yet</h3>
            <p className="text-gray-600 mb-6">Create your first blog post to get started!</p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-200 transition-all"
            >
              <Plus size={20} />
              Create New Blog
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 flex items-center justify-between z-10">
             <h2 className="text-2xl font-bold">
  {noteMode
    ? 'Add / Update Admin Note'
    : editMode
    ? 'Edit Blog'
    : 'Create New Blog'}
</h2>

              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
           


            <div className="p-6">
              <div className="space-y-5">

                {!noteMode ? 
                <>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Blog Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors"
                    placeholder="Enter blog title..."
                  />
                </div>
                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Rich Text Editor */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Content *</label>
                  
                  {/* Editor Toolbar */}
                  <div className="flex flex-wrap gap-2 mb-2 p-3 bg-gray-50 rounded-t-xl border-2 border-gray-200">
                    <button
                      type="button"
                      onClick={() => applyFormat('bold')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('italic')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('underline')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 underline"
                      title="Underline"
                    >
                      U
                    </button>
                    <div className="w-px bg-gray-300"></div>
                    <button
                      type="button"
                      onClick={() => applyFormat('formatBlock', 'h1')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold text-lg"
                      title="Heading 1"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('formatBlock', 'h2')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('formatBlock', 'h3')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-semibold text-sm"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('formatBlock', 'p')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Paragraph"
                    >
                      P
                    </button>
                    <div className="w-px bg-gray-300"></div>
                    <button
                      type="button"
                      onClick={() => applyFormat('insertUnorderedList')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Bullet List"
                    >
                      • List
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('insertOrderedList')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Numbered List"
                    >
                      1. List
                    </button>
                    <div className="w-px bg-gray-300"></div>
                    <button
                      type="button"
                      onClick={() => applyFormat('justifyLeft')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Align Left"
                    >
                      ⬅
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('justifyCenter')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Align Center"
                    >
                      ↔
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormat('justifyRight')}
                      className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
                      title="Align Right"
                    >
                      ➡
                    </button>
                  </div>

                  {/* Editor Content Area */}
                  <div
                    ref={editorRef}
                    contentEditable
                    className="w-full min-h-[400px] px-4 py-3 border-2 border-gray-200 border-t-0 rounded-b-xl focus:border-violet-500 focus:outline-none transition-colors overflow-y-auto prose max-w-none"
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    placeholder="Write your blog content here..."
                  />
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Thumbnail Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors"
                  />
                  {thumbnailPreview && (
                    <div className="mt-3 relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={thumbnailPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                </>
                : 
  <div>
    <label className="block text-gray-700 font-semibold mb-2">
      Admin Note
    </label>
    <textarea
      value={adminNote}
      onChange={(e) => setAdminNote(e.target.value)}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
      rows={4}
      placeholder="Write admin note..."
    />
  </div>
                }
                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
{loading
  ? 'Saving...'
  : noteMode
  ? 'Add / Update Note'
  : editMode
  ? 'Update Blog'
  : 'Create Blog'}
                  
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ✅ ADMIN NOTE (ONLY IN NOTE MODE) */}


    </div>
  );
};

export default AdminBlogDashboard;


// import React, { useState, useEffect, useRef } from 'react';
// import { X, Plus, Edit2, Trash2, Eye, Calendar, MessageSquare } from 'lucide-react';
// import Swal from 'sweetalert2';

// const AdminBlogDashboard = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [noteMode, setNoteMode] = useState(false); // ✅ NEW
//   const [currentBlogId, setCurrentBlogId] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState('');
//   const [adminNote, setAdminNote] = useState(''); // ✅ NEW

//   const userInfo = JSON.parse(sessionStorage.getItem("user"));
//   const userId = userInfo?.id; // ✅ SESSION USER ID

//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     category: 'Pregnancy',
//     authorId: ''
//   });

//   const editorRef = useRef(null);
//   const categories = ['Pregnancy', 'Parenting', 'Child Health', 'Nutrition', 'Other'];

//   /* ================= FETCH BLOGS ================= */
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await fetch('http://localhost:8080/api/v1/blogs/');
//       const result = await res.json();
//       if (result.success) setBlogs(result.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= HELPERS ================= */
//   const isOwner = (blog) => {
//     return blog?.author?._id === userId || blog?.author === userId;
//   };

//   /* ================= EDIT BLOG ================= */
//   const handleEdit = (blog) => {
//     setEditMode(true);
//     setNoteMode(false);
//     setCurrentBlogId(blog._id);
//     setFormData({
//       title: blog.title,
//       content: blog.content,
//       category: blog.category,
//       authorId: blog.author?._id || blog.author
//     });
//     setThumbnailPreview(blog.thumbnail);
//     setShowModal(true);

//     setTimeout(() => {
//       if (editorRef.current) {
//         editorRef.current.innerHTML = blog.content;
//       }
//     }, 100);
//   };

//   /* ================= ADD NOTE ================= */
//   const handleAddNote = (blog) => {
//     setNoteMode(true); // ✅ ONLY NOTE
//     setEditMode(false);
//     setCurrentBlogId(blog._id);
//     setAdminNote(blog.adminnote || '');
//     setShowModal(true);
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       let body;

//       if (noteMode) {
//         body = JSON.stringify({ adminnote: adminNote });
//       } else {
//         const fd = new FormData();
//         fd.append('title', formData.title);
//         fd.append('content', editorRef.current.innerHTML);
//         fd.append('category', formData.category);
//         fd.append('authorId', formData.authorId);
//         if (thumbnail) fd.append('thumbnail', thumbnail);
//         body = fd;
//       }

//       const response = await fetch(
//         `http://localhost:8080/api/v1/blogs/update/${currentBlogId}`,
//         {
//           method: 'PUT',
//           headers: noteMode ? { 'Content-Type': 'application/json' } : {},
//           body
//         }
//       );

//       const result = await response.json();

//       if (result.success) {
//         Swal.fire('Success', noteMode ? 'Note added' : 'Blog updated', 'success');
//         setShowModal(false);
//         fetchBlogs();
//       }
//     } catch (err) {
//       Swal.fire('Error', 'Something went wrong', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete blog?')) return;
//     await fetch(`http://localhost:8080/api/v1/blogs/${id}`, { method: 'DELETE' });
//     fetchBlogs();
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="max-w-7xl mx-auto">

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {blogs.map(blog => (
//           <div key={blog._id} className="bg-white rounded-xl shadow p-4">
//             <h3 className="font-bold">{blog.title}</h3>

//             <div className="flex gap-2 mt-4">

//               {/* ADD NOTE – AVAILABLE FOR ALL ADMINS */}
//               <button
//                 onClick={() => handleAddNote(blog)}
//                 className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded flex items-center justify-center gap-1"
//               >
//                 <MessageSquare size={16} />
//                 Add Note
//               </button>

//               {/* EDIT & DELETE – ONLY OWNER */}
//               {isOwner(blog) && (
//                 <>
//                   <button
//                     onClick={() => handleEdit(blog)}
//                     className="flex-1 bg-green-600 text-white px-3 py-2 rounded"
//                   >
//                     <Edit2 size={16} /> Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(blog._id)}
//                     className="flex-1 bg-red-600 text-white px-3 py-2 rounded"
//                   >
//                     <Trash2 size={16} /> Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ================= MODAL ================= */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-full max-w-xl">

//             <h2 className="text-xl font-bold mb-4">
//               {noteMode ? 'Add Admin Note' : 'Edit Blog'}
//             </h2>

//             {noteMode ? (
//               <textarea
//                 value={adminNote}
//                 onChange={(e) => setAdminNote(e.target.value)}
//                 className="w-full h-32 border rounded p-3"
//                 placeholder="Enter admin note..."
//               />
//             ) : (
//               <input
//                 value={formData.title}
//                 disabled
//                 className="w-full border p-2 rounded bg-gray-100"
//               />
//             )}

//             <div className="flex gap-3 mt-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 border rounded p-2">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="flex-1 bg-green-600 text-white rounded p-2"
//               >
//                 {loading ? 'Saving...' : 'Save'}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlogDashboard;
