
import express from 'express';
import Post from '../models/post.js';

import auth from '../middleware/auth.js';
const router = express.Router();


router.post('/create', auth, async (req, res) => {
  try {
    const { title,description, content } = req.body;
    const post = await Post.create({
      title,
      description,
      content,
      author: req.user.id, 
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  
  }
});
router.get('/allposts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'firstname lastname email'); // Fixed projection issue
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }});
router.get('/myposts',auth,async(req,res)=>{
try{
const Author=req.user.id;
const AuthorPosts=await Post.find({author:Author}).populate('author','firstname lastname email');

res.status(200).json(AuthorPosts);
}
catch(err){
  res.status(500).json({message:err.message});
}
})

router.get('/findpost', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'firstname lastname email');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'firstname lastname email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;

