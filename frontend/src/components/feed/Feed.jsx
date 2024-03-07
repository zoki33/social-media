import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username, feed }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("/posts/timeline/" + user._id);
        setPosts(
          res.data.sort((p1, p2) => {
            return (
              new Date(p2.userPost.createdAt) - new Date(p1.userPost.createdAt)
            );
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [username, user._id]);

  const updatePostWithComment = (index, newComment) => {
    const updatedPosts = [...posts];

    updatedPosts[index] = {
      ...updatedPosts[index],
      comments: [...updatedPosts[index].userPost.comments, newComment],
    };

    setPosts(updatedPosts);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {username === user.username ? <Share /> : feed && <Share />}
        {posts.map((post, index) => (
          <Post
            key={index}
            index={index}
            post={post.userPost}
            user={post.user}
            updatePostWithComment={updatePostWithComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
