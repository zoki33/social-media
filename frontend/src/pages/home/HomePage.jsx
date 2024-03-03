import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import RightBar from "../../components/rightbar/RightBar";
import Feed from "../../components/feed/Feed";
import "./home.css";

export const HomePage = () => {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <SideBar />
        <Feed feed />
        <RightBar />
      </div>
    </>
  );
};
