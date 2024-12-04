const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            default: []
        },
    },
    {
        timestamps: true,
    }
);

// Text indexing for search functionality
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
