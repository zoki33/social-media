import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const TopBar = ({ profile, username }) => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link style={{ textDecoration: "none" }} to="/">
          <span className="logo">photogram</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search..." className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {!profile && (
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none" }}
            >
              <span className="topbarLink">Profile</span>
            </Link>
          )}
          {profile && (
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="topbarLink">Timeline</span>
            </Link>
          )}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        {(!profile || user.username !== username) && (
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "noAvatar.png"
              }
              alt="profile"
              className="topbarImage"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopBar;
