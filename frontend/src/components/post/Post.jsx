import "./post.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import { useState, useEffect, useContext, useCallback } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post, profile, user }) => {
  const [like, setLike] = useState(post.likes.length);
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser, post]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`/posts/${post._id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const ShowCommentsHandler = () => {
    fetchComments();
    return (
      <>
        <ul>
          {comments &&
            comments.map((comment, index) => (
              <li key={index}>
                {comment.comment} by {comment.user.username}
              </li>
            ))}
        </ul>
      </>
    );
  };

  // const commentHandler = () => {
  //   try {
  //     axios.put(`/posts/${post._id}/comment`, {
  //       userId: currentUser._id,
  //       comment: comment,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
                onClick={() => setShowComments(true)}
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
            <div className="postOption">
              <span className="optionText">Comment</span>
              <AddCommentIcon className="optionIcon" />
            </div>
            <div className="postOption">
              <span className="optionText">Share</span>
              <ShareIcon className="optionIcon" />
            </div>
          </div>
        </div>
        {showComments && <ShowCommentsHandler />}
      </div>
    </div>
  );
};

export default Post;
