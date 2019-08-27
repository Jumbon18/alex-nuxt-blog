const Comment = require('../db/models/comment.model');
const Post = require('../db/models/post.model');

module.exports.create = async (req,res)=>{
try{
  const {name,text,postId} = req.body;
  const comment = new Comment({
    name,text,postId
  });
  await comment.save();
  const post = await Post.findById(postId);
  post.comments.push(comment);
  await post.save();

  res.status(201).json(comment);
}catch (e) {
  res.status(500).json(e);
}
};
