
import React, { useState } from 'react';
import { BookPlus, Loader2, Save, Undo2, Image as ImageIcon } from 'lucide-react';
import { createBook } from '../../api/books';


export default function AddBookManual() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        description: '',
        coverImageUrl: '',
        totalCopies: 1,
        publishedYear: new Date().getFullYear(),
        authorFirstName: '',
        authorLastName: '',
        is_digital: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : 
                    (name === 'totalCopies' || name === 'publishedYear') ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createBook(formData);
            
            setFormData({
                isbn: '',
                title: '',
                description: '',
                coverImageUrl: '',
                totalCopies: 1,
                publishedYear: new Date().getFullYear(),
                authorFirstName: '',
                authorLastName: '',
                is_digital: false
            });
        } catch (err) {
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <header className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <BookPlus className="text-accent-base w-6 h-6" />
                    <h1 className="text-3xl font-black text-primary-text tracking-tight">
                        Manual Book Entry
                    </h1>
                </div>
                <p className="text-secondary-text">
                    Add a new book to the library collection by filling out the details manually.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 bg-secondary-bg border border-border-subtle rounded-3xl p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ISBN */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-text ml-1">ISBN</label>
                        <input 
                            required
                            type="text" 
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            placeholder="e.g., 9780123456789"
                            className="w-full h-12 px-4 bg-input-bg border-none rounded-2xl text-primary-text focus:ring-2 ring-accent-base/20 transition-all"
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-text ml-1">Book Title</label>
                        <input 
                            required
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., The Great Gatsby"
                            className="w-full h-12 px-4 bg-input-bg border-none rounded-2xl text-primary-text focus:ring-2 ring-accent-base/20 transition-all"
                        />
                    </div>

                    {/* Author First Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-text ml-1">Author First Name</label>
                        <input 
                            required
                            type="text" 
                            name="authorFirstName"
                            value={formData.authorFirstName}
                            onChange={handleChange}
                            placeholder="e.g., F. Scott"
                            className="w-full h-12 px-4 bg-input-bg border-none rounded-2xl text-primary-text focus:ring-2 ring-accent-base/20 transition-all"
                        />
                    </div>

                    {/* Author Last Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-text ml-1">Author Last Name</label>
                        <input 
                            required
                            type="text" 
                            name="authorLastName"
                            value={formData.authorLastName}
                            onChange={handleChange}
                            placeholder="e.g., Fitzgerald"
                            className="w-full h-12 px-4 bg-input-bg border-none rounded-2xl text-primary-text focus:ring-2 ring-accent-base/20 transition-all"
                        />
                    </div>

                    {/* Published Year */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-text ml-1">Published Year</label>
                        <input 
                            required
                            type="number" 
                            name="publishedYear"
                            value={formData.publishedYear}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-input-bg border-none rounded-2xl text-primary-text focus:ring-2 ring-accent-base/20 transition-all"
                        />
                    </div>

                    {/* Total Copies */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-text ml-1">Total Copies</label>
                        <input 
                            required
                            type="number" 
                            name="totalCopies"
                            value={formData.totalCopies}
                            onChange={handleChange}
                            min="1"
                            className="w-full h-12 px-4 bg-input-bg border-none rounded-2xl text-primary-text focus:ring-2 ring-accent-base/20 transition-all"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary-text ml-1">Description</label>
                    <textarea 
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief summary of the book..."
                        rows="4"
                        className="w-full p-4 bg-input-bg border-none rounded-3xl text-primary-text focus:ring-2 ring-accent-base/20 transition-all resize-none"
                    />
                </div>

                {/* Cover Image URL */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary-text ml-1">Cover Image URL</label>
                    <div className="relative">
                        <input 
                            type="url" 
                            name="coverImageUrl"
                            value={formData.coverImageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/cover.jpg"
                            className="w-full h-12 pl-12 pr-4 bg-input-bg border-none rounded-2xl text-primary-text focus:ring-2 ring-accent-base/20 transition-all"
                        />
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text w-5 h-5" />
                    </div>
                </div>

                {/* Digital Option */}
                <div className="flex items-center gap-3 py-2">
                    <input 
                        type="checkbox" 
                        name="is_digital"
                        id="is_digital"
                        checked={formData.is_digital}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-none bg-input-bg text-accent-base focus:ring-accent-base/20"
                    />
                    <label htmlFor="is_digital" className="text-sm font-bold text-primary-text cursor-pointer">
                        This is a digital copy (Preview available)
                    </label>
                </div>

                <div className="pt-4 flex gap-4">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="flex-1 h-14 bg-accent-base hover:bg-accent-base/90 text-white rounded-2xl font-black text-lg shadow-lg shadow-accent-base/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Save className="w-6 h-6" />}
                        {loading ? 'Adding Book...' : 'Add Book to Collection'}
                    </button>
                    <button 
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-8 h-14 bg-input-bg hover:bg-input-bg/70 text-secondary-text rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <Undo2 className="w-5 h-5" />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
