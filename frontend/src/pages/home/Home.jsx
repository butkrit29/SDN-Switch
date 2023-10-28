import "./home.css";
import TopologyInfo from "../../components/topology/TopologyInfo";
import Addflow from "../../components/addflow/Addflow";
import Flowtable from "../../components/flowtable/Flowtable";

export default function Home() {
  return (
    <div className="home">
    <TopologyInfo />
    <div className="homewidgets">
       <Flowtable />
       <Addflow />
    </div>
    </div>
  );
}
