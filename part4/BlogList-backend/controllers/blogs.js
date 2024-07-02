const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  res.status(200).json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(400).end();
  }
});

blogsRouter.post("/", async (req, res) => {
  const { body, userToken } = req;

  const user = await User.findOne({ _id: userToken.id });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const blogSaved = await blog.save();
  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();

  res.status(201).json(blogSaved);
});

blogsRouter.put("/:id", async (req, res) => {
  const { body, params } = req;

  const blogToUpdate = await Blog.findOne({ _id: params.id });

  const blog = {
    blogToUpdate,
    likes: body.likes,
  };

  const blogUpdated = await Blog.findOneAndUpdate({ _id: params.id }, blog, {
    new: true,
  });
  const blogSaved = await blogUpdated.save();
  res.status(200).json(blogSaved);
});

blogsRouter.delete("/:id", async (req, res) => {
  const { userToken } = req;

  const user = await User.findOne({ _id: userToken.id });

  const blogToDelete = await Blog.findOne({ _id: req.params.id });

  if (user._id.toString() !== blogToDelete.user.toString()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await Blog.deleteOne({ _id: req.params.id });
  res.status(204).end();
});

module.exports = blogsRouter;
