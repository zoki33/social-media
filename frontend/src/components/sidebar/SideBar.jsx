import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import EventIcon from "@mui/icons-material/Event";
import CelebrationIcon from "@mui/icons-material/Celebration";
import GroupIcon from "@mui/icons-material/Group";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import { Users } from "../../dummyData";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Online from "../online/Online";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Diversity3Icon className="sidebarIcon" />
            <span className="sidebarListItemText">Friends</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <CelebrationIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Birthdays</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <NaturePeopleIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Outdoor Activities</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <p className="friendListTitle">Active Friends</p>
        <ul className="sidebarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
