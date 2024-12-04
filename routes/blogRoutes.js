const express = require('express');
const {
  addBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogControllers');

const router = express.Router();

router.post('/', addBlog);
router.get('/', getBlogs);
router.get('/', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
