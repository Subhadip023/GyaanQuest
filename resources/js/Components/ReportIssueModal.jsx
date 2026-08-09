import React, { useState, useRef } from 'react';
import FormModal from './FormModal';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const QUILL_MODULES = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'clean']
    ]
};

const QUILL_FORMATS = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet',
    'link'
];

export default function ReportIssueModal({ show, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        addFiles(files);
    };

    const addFiles = (files) => {
        const validImages = files.filter(file => file.type.startsWith('image/'));
        
        if (validImages.length < files.length) {
            toast.warning("Some non-image files were skipped.");
        }

        const newEntries = validImages.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            preview: URL.createObjectURL(file)
        }));

        setImages(prev => [...prev, ...newEntries]);
    };

    const removeImage = (id) => {
        setImages(prev => {
            const imageToRemove = prev.find(img => img.id === id);
            if (imageToRemove?.preview) {
                URL.revokeObjectURL(imageToRemove.preview);
            }
            return prev.filter(img => img.id !== id);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Please enter an issue title.");
            return;
        }

        const textContent = description.replace(/<[^>]*>/g, '').trim();
        if (!textContent) {
            toast.error("Please enter a detailed description of the issue.");
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('type', '2');     // Bug
            formData.append('priority', '3'); // High
            formData.append('status', '1');   // To Do

            images.forEach((imgObj) => {
                if (imgObj.file) {
                    formData.append('images[]', imgObj.file);
                }
            });

            const res = await axios.post(route('issues.store'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success(res.data?.message || "Issue report submitted successfully!");
            
            // Reset form
            setTitle('');
            setDescription('');
            setImages([]);
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to submit issue report. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormModal
            show={show}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Submit Issue or Feedback"
            description="Provide details, screenshots, or code snippets to help us resolve this issue."
            submitText="Submit Issue Report"
            processing={isSubmitting}
            maxWidth="3xl"
        >
            <style>{`
                .ql-toolbar.ql-snow {
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                    background-color: #f8fafc;
                    border-color: #e2e8f0 !important;
                }
                .dark .ql-toolbar.ql-snow {
                    background-color: #1e293b;
                    border-color: #334155 !important;
                }
                .dark .ql-toolbar .ql-stroke {
                    stroke: #cbd5e1 !important;
                }
                .dark .ql-toolbar .ql-fill {
                    fill: #cbd5e1 !important;
                }
                .dark .ql-toolbar .ql-picker {
                    color: #cbd5e1 !important;
                }
                .dark .ql-toolbar .ql-picker-options {
                    background-color: #1e293b !important;
                    border-color: #334155 !important;
                    color: #cbd5e1 !important;
                }
                .ql-container.ql-snow {
                    border-bottom-left-radius: 0.75rem;
                    border-bottom-right-radius: 0.75rem;
                    border-color: #e2e8f0 !important;
                    min-height: 180px;
                    font-size: 0.95rem;
                }
                .dark .ql-container.ql-snow {
                    background-color: #0f172a;
                    border-color: #334155 !important;
                    color: #f8fafc !important;
                }
                .ql-editor.ql-blank::before {
                    color: #94a3b8 !important;
                    font-style: normal;
                }
            `}</style>

            <div className="space-y-5">
                {/* Issue Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                        Issue Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Quiz timer freeze on question submit"
                        className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none text-gray-900 dark:text-white transition"
                    />
                </div>

                {/* HTML Description via Quill */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                        Detailed Description (HTML Supported) <span className="text-rose-500">*</span>
                    </label>
                    <div className="rounded-xl overflow-hidden shadow-sm">
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={QUILL_MODULES}
                            formats={QUILL_FORMATS}
                            placeholder="Describe what happened, expected behavior, or steps to reproduce..."
                        />
                    </div>
                </div>

                {/* Screenshot & Image Attachments */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300">
                            Attach Screenshots / Images (Optional)
                        </label>
                        <span className="text-xs text-gray-400 dark:text-slate-400">PNG, JPG, WEBP up to 5MB</span>
                    </div>

                    {/* Upload Drop Area */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-500 rounded-2xl p-4 text-center cursor-pointer bg-gray-50 dark:bg-slate-800/40 transition flex flex-col items-center justify-center gap-2 group"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 dark:text-slate-200">
                            Click to upload screenshots <span className="text-gray-400 font-normal">or drag & drop</span>
                        </p>
                    </div>

                    {/* Image Preview Grid */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                            {images.map((img) => (
                                <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-slate-900 aspect-video flex items-center justify-center">
                                    <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-xs">
                                        <p className="truncate font-medium">{img.name}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] opacity-75">{img.size}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                                                className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
                                                title="Remove image"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </FormModal>
    );
}
