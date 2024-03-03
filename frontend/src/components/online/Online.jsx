import "./online.css";

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <div className="activeImageWrapper">
        <img
          src={PF + user.profilePicture}
          alt=""
          className="sidebarFriendImg"
        />

        <span className="activeDot"></span>
      </div>
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default Online;
