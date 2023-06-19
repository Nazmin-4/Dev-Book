const Developer = require('../models/Developers');
const Post = require('../models/Post');

const getDashboard = async (req, res, next) => {
  try {
    // Get the logged-in developer's ID
    const developerId = req.userId;

    // Fetch the developer's information
    const developer = await Developer.findById(developerId);

    // Fetch the developer's posts
    const posts = await Post.find({ developer: developerId });

    // Return the developer's information and posts
    res.json({ developer, posts });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, type } = req.body;
    const developerId = req.userId;

    // Create a new post
    const newPost = new Post({
      title,
      content,
      type,
      developer: developerId,
    });

    // Save the post to the database
    await newPost.save();

    // Return success response
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, createPost };
