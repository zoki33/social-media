import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import RightBar from "../../components/rightbar/RightBar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <TopBar profile username={username} />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <img
              src={
                user.coverPicture ? PF + user.coverPicture : PF + "noCover.jpeg"
              }
              alt=""
              className="showcaseImage"
            />
            <div className="profileInfoContainer">
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=""
                className="profilePageImage"
              />
              <div className="nameContainer">
                <p className="userNameText">{user.username}</p>
                <p className="userDescText">
                  My name is {user.username}. I'm a photographer.
                </p>

                <p className="userDescText">
                  <b>My camera:</b> {user.camera}
                </p>

                {user.from && (
                  <p className="userDescText">
                    <b>Location:</b> {user.from}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} profile />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
