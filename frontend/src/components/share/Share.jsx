import "./share.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/noAvatar.png"
            }
            alt=""
          />
          <textarea
            placeholder={"Whatcha thinking about " + user.username + "?"}
            className="shareInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <ClearIcon
              className="shareCancelIcon"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <span className="shareOptionText">Photo/Video</span>
              <AddAPhotoIcon className="addPhotoIcon" />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.mp4"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <span className="shareOptionText">Tag People</span>
              <PersonAddIcon className="addPhotoIcon" />
            </div>
            <div className="shareOption">
              <span className="shareOptionText">Add Location</span>
              <AddLocationIcon className="addPhotoIcon" />
            </div>
            <div className="shareOption">
              <span className="shareOptionText">Add Emojis</span>
              <AddReactionIcon className="addPhotoIcon" />
            </div>
          </div>
          {desc !== "" || file ? (
            <button type="submit" className="shareButton">
              Share Now
            </button>
          ) : (
            <button type="submit" className="shareButton" disabled>
              Share Now
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Share;
