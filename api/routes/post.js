const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated successfully");
    } else {
      return res.status(403).json("You can't update this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId || req.body.isAdmin) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      return res.status(403).json("You can't delete this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//comment a post
router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({
      $push: {
        comments: { userId: req.body.userId, comment: req.body.comment },
      },
    });
    res.status(200).json("Comment added");
  } catch (error) {
    res.status(500).json(error);
  }
});

//show comments on a post
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comments = post.comments;

    const commentsPromises = comments.map(async (comment) => {
      const commentUser = await User.findById(comment.userId).select(
        "username profilePicture"
      );
      return {
        user: commentUser,
        comment: comment.comment,
      };
    });

    const commentsResolved = await Promise.all(commentsPromises);
    const commentPromisesflat = commentsResolved.flat();

    res.status(200).json(commentPromisesflat);
  } catch (error) {
    res.status(500).json(error);
  }
});
// //delete a comment
// router.put("/:id/uncomment", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     await post.updateOne({ $pull: { comments: req.body } });
//     res.status(200).json("Comment added");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json("Post not found");
  }
});

//get user posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "username profilePicture"
    );
    const userPosts = await Post.find({ userId: user._id });
    const userComboPosts = userPosts.map((post) => ({
      user: user,
      userPost: post,
    }));

    res.status(200).json(userComboPosts);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "username profilePicture following"
    );
    const userPosts = await Post.find({ userId: user._id });
    const userComboPosts = userPosts.map((post) => ({
      user: user,
      userPost: post,
    }));

    const followerPostsPromises = user.following.map(async (friendId) => {
      const userPosts = await Post.find({ userId: friendId });
      const userFriend = await User.findById(friendId).select(
        "username profilePicture"
      );
      return userPosts.map((post) => ({ user: userFriend, userPost: post }));
    });

    const followerPosts = await Promise.all(followerPostsPromises);
    const followerPostsflat = followerPosts.flat();
    const timeLinePosts = [...userComboPosts, ...followerPostsflat];

    res.status(200).json(timeLinePosts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
