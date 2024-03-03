import "./rightbar.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Users } from "../../dummyData";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const RightBar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    if (user && currentUser) {
      const isFollowing = currentUser.following.includes(user._id);
      setFollow(isFollowing);
    }
  }, [user, currentUser]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {}
    };
    getFriends();
  }, [user]);

  const followHandler = async () => {
    try {
      if (follow) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollow(!follow);
  };
  const HomeRightBar = () => {
    return (
      <>
        <div className="topContainer">
          <h2 className="gridTitle">People you may know</h2>
          <div className="topGrid">
            <div className="topGridItem">
              <img src="/assets/person/3.jpeg" alt="" className="profilePic" />
              <div className="infoContainer">
                <p className="profileName">
                  <b>Janice Peck</b>
                </p>
                <p className="profileFriends">3 common friends</p>
              </div>
            </div>
            <div className="topGridItem">
              <img src="/assets/person/3.jpeg" alt="" className="profilePic" />
              <div className="infoContainer">
                <p className="profileName">
                  <b>Janice Peck</b>
                </p>
                <p className="profileFriends">3 common friends</p>
              </div>
            </div>
            <div className="topGridItem">
              <img src="/assets/person/3.jpeg" alt="" className="profilePic" />
              <div className="infoContainer">
                <p className="profileName">
                  <b>Janice Peck</b>
                </p>
                <p className="profileFriends">3 common friends</p>
              </div>
            </div>
            <div className="topGridItem">
              <img src="/assets/person/3.jpeg" alt="" className="profilePic" />
              <div className="infoContainer">
                <p className="profileName">
                  <b>Janice Peck</b>
                </p>
                <p className="profileFriends">3 common friends</p>
              </div>
            </div>
            <div className="topGridItem">
              <img src="/assets/person/3.jpeg" alt="" className="profilePic" />
              <div className="infoContainer">
                <p className="profileName">
                  <b>Janice Peck</b>
                </p>
                <p className="profileFriends">3 common friends</p>
              </div>
            </div>
            <div className="topGridItem">
              <img src="/assets/person/3.jpeg" alt="" className="profilePic" />
              <div className="infoContainer">
                <p className="profileName">
                  <b>Janice Peck</b>
                </p>
                <p className="profileFriends">3 common friends</p>
              </div>
            </div>
          </div>
          <button className="seeMoreButton">Show More</button>
        </div>
        <div className="centralContainer">
          <h2 className="centralTitle">Discover</h2>
          <div className="centralGrid">
            <div className="centralGridItem">
              <p className="discoverName">Jovo Marin</p>
              <img src="/assets/post/6.jpeg" alt="" className="discoverImage" />
              <div className="discoverLikes">
                <ThumbUpIcon className="likesIcon" />
                <span>66</span>
              </div>
            </div>
            <div className="centralGridItem">
              <p className="discoverName">Jaqelin Husso</p>
              <img src="/assets/post/6.jpeg" alt="" className="discoverImage" />
              <div className="discoverLikes">
                <ThumbUpIcon className="likesIcon" />
                <span>66</span>
              </div>
            </div>
            <div className="centralGridItem">
              <p className="discoverName">Bana Banic</p>
              <img src="/assets/post/6.jpeg" alt="" className="discoverImage" />
              <div className="discoverLikes">
                <ThumbUpIcon className="likesIcon" />
                <span>66</span>
              </div>
            </div>
            <div className="centralGridItem">
              <p className="discoverName">Zoki Odinson</p>
              <img src="/assets/post/6.jpeg" alt="" className="discoverImage" />
              <div className="discoverLikes">
                <ThumbUpIcon className="likesIcon" />
                <span>66</span>
              </div>
            </div>
          </div>
          <button className="discoverButton">Show More</button>
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user?.username !== currentUser.username && (
          <div className="addFriendContainer">
            <p className="addFriendText">
              {follow ? "Want to see less?" : "Want to see more?"}
            </p>
            <KeyboardDoubleArrowRightIcon className="addFriendText" />
            <button className="rightbarFollowBtn" onClick={followHandler}>
              {follow ? "Unfollow me" : "Follow me"}
              {follow ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
            </button>
          </div>
        )}
        <div className="profileRightTopContainer">
          <h2 className="gridTitle">People I Follow</h2>
          <div className="topGrid">
            {friends.map((friend) => (
              <Link key={friend._id} to={`/profile/${friend.username}`}>
                <div className="topGridItemProfile">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "noAvatar.png"
                    }
                    alt=""
                    className="profilePic"
                  />
                  <p className="profileName">
                    <b>{friend.username}</b>
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <MoreHorizIcon className="seeMore" />
        </div>
        <div className="profileRightBotContainer">
          <h2 className="gridTitle">Most Liked</h2>
          <div className="imageGrid">
            {Users.map((user) => (
              <div key={user.id} className="imageContainer">
                <img
                  src={PF + user.profilePicture}
                  alt=""
                  className="mostLikedImage"
                />
              </div>
            ))}
          </div>
          <MoreHorizIcon className="seeMore" />
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightBarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default RightBar;
