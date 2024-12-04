const Blog = require('../models/Blog');

module.exports.addBlog = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const blog = await Blog.create({ title, content, category, tags });
        res.status(201).json({
            success: true,
            message: 'Blog added successfully',
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        })
    }
};

module.exports.getBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, tag, search } = req.query;

        const query = {};
        if (category) query.category = category;
        if (tag) query.tags = tag;
        if (search) query.$text = { $search: search };

        const blogs = await Blog.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            data: blogs,
            message: 'Blog fetched successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        })
    }
};

module.exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID"
            });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            data: blog,
            message: 'Blog fetched successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error retrieving blog",
            success: false,
        });
    }
};


module.exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });

        if (!blog) return res.status(404).json({
            success: false,
            message: 'Blog not found'
        });

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        })
    }
};

module.exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) return res.status(404).json({
            success: false,
            message: 'Blog not found'
        });

        res.status(200).json({ success: true, message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        })
    }
};
