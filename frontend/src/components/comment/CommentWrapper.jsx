import React, { useEffect, useState } from "react";
import "./commentwrapper.css";
import axios from "axios";
import { format } from "timeago.js";

const CommentWrapper = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/${post._id}/comments`, {
          params: {
            page: page,
            per_page: 5,
          },
        });
        console.log(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [post._id, page]);

  return (
    <>
      <ul className="commentContainer">
        {comments &&
          comments.map((comment, index) => (
            <li key={index}>
              <div className="commentContainerBox">
                <div className="profileContainer">
                  <img
                    src={
                      comment.user.profilePicture
                        ? PF + comment.user.profilePicture
                        : PF + "/noAvatar.png"
                    }
                    alt=""
                    className="profileImage"
                  />
                  <h3 className="profileName">{comment.user.username}</h3>
                </div>
                <div className="textContainer">
                  <p className="commentText">{comment.comment}</p>
                  <p className="createdAtText">
                    {comment.createdAt ? format(comment.createdAt) : ""}
                  </p>
                </div>
              </div>
            </li>
          ))}
        <button className="showMoreButton">Show More</button>
      </ul>
    </>
  );
};

export default CommentWrapper;
