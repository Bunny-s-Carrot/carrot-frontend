import NavBar from "../../components/navBar";
import PopularPost from "../../components/neighborhood/popularpost";
import Post from "../../components/neighborhood/post";
import TopicBar from "../../components/neighborhood/topicbar";

const Neighborhood = () => {
  return (
    <div>
      <TopicBar />
      <PopularPost />
      <Post />
      <NavBar pageType="NEIGHBORHOOD" />
    </div>
  );
};

export default Neighborhood;
