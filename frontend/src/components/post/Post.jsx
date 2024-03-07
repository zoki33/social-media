import "./post.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import { useState, useEffect, useContext } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CommentWrapper from "../comment/CommentWrapper";

const Post = ({ post, profile, user, index, updatePostWithComment }) => {
  const [like, setLike] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser, post]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/posts/${post._id}/comment`, {
        userId: currentUser._id,
        postId: post._id,
        comment: comment,
      });

      updatePostWithComment(index, res.data.comment);

      setShowComments(true);
      setAddComment(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <Link to={profile ? "" : `/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "/noAvatar.png"
              }
              alt=""
              className="profileImage"
            />
          </Link>
          <div className="postInfo">
            <p>
              <strong className="strongInfo">{user.username}</strong>
              {post.location && (
                <>
                  {" "}
                  is at <strong className="strongInfo">{post.location}</strong>
                </>
              )}
            </p>
            <p className="timeInfo">{format(post.createdAt)}</p>
          </div>
        </div>
        <div className="postMain">
          <p className="postText">{post?.desc}</p>
          <img src={PF + post.img} alt="" className="postImage" />
          <div className="postLikesComms">
            <div className="moreInfo">
              <ThumbUpIcon className="likesIcon" />
              <span className="likesNumber">{like}</span>
            </div>
            <div className="moreInfo">
              <CommentIcon className="commIcon" />
              <span
                className="likesNumber"
                onClick={() => setShowComments(!showComments)}
              >
                {post.comments.length} comments
              </span>
            </div>
          </div>
        </div>
        <hr className="postHr"></hr>

        <div className="postBottom">
          <div className="postOptions">
            <div onClick={likeHandler} className="postOption">
              {isLiked ? (
                <>
                  {" "}
                  <span className="optionText">Liked</span>
                  <ThumbUpIcon className="optionIcon" />
                </>
              ) : (
                <>
                  {" "}
                  <span className="optionText">Like</span>
                  <ThumbUpOffAltIcon className="optionIcon" />
                </>
              )}
            </div>
            <div
              className="postOption"
              onClick={() => setAddComment(!addComment)}
            >
              <span className="optionText">Comment</span>
              <AddCommentIcon className="optionIcon" />
            </div>
            <div className="postOption">
              <span className="optionText">Share</span>
              <ShareIcon className="optionIcon" />
            </div>
          </div>
        </div>
        {addComment && (
          <form className="addCommentContainer" onSubmit={commentHandler}>
            <div className="commentInputContainer">
              <Link to={profile ? "" : `/profile/${user.username}`}>
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "/noAvatar.png"
                  }
                  alt=""
                  className="profileImage"
                />
              </Link>
              <textarea
                placeholder="Type your comment here..."
                className="commentInput"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {comment !== "" ? (
              <button type="submit" className="addCommentButton">
                Add Comment
              </button>
            ) : (
              <button type="submit" className="addCommentButton" disabled>
                Add Comment
              </button>
            )}
          </form>
        )}
        {post.comments.length > 0
          ? showComments && <CommentWrapper post={post} />
          : showComments && "No comments to show!"}
      </div>
    </div>
  );
};

export default Post;
