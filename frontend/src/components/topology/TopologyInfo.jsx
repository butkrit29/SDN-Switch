import "./topologyInfo.css";
import routers from "../../img/topopic/routers.png";
import React, { useState, useEffect, useRef } from "react";
import { DataSet, Network } from "vis";
import axios from "axios";


const  Topology = () => {
  // get switchData
  const [SwitchList, setswitchList] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.56.1:5000/switches").then((result) => {
      setswitchList(result.data);
      console.log(result.data);
    });
  }, []);

  //get edgesData
  const [edgesList, setEdesList] = useState(null);
  useEffect(() => {
    axios.get("http://192.168.56.1:5000/links").then((res) => {
      setEdesList(res.data);
      console.log(res.data);
    });
  }, []);

  // A reference to the div rendered by this component
  const domNode = useRef(null);

  // A reference to the vis network instance
  const network = useRef(null);

  useEffect(() => {
    // check edgesList
    if (edgesList === null) {
      return;
    }
    if (SwitchList === null) {
      return;
    }

    // check switchList

    const tempSwitchList = SwitchList;
    const dataNode = [];

    for (var i = 0; i < tempSwitchList.length; i++) {
      var swtichnode = {
        id: tempSwitchList[i],
        label: "R " + tempSwitchList[i],
        image: routers,
        shape: "image",
      };
      dataNode.push(swtichnode);
    }

    const tempEdgesList = edgesList;
    const dataEdges = [];

    for (var j = 0; j < tempEdgesList.length; j++) {
      dataEdges.push({
        from: tempEdgesList[j].src.dpid.substring(15),
        to: tempEdgesList[j].dst.dpid.substring(15),
        label: "R " +
          tempEdgesList[j].src.dpid.substring(15) +
          " port: " +
          tempEdgesList[j].src.port_no.substring(7) +
          " to R " +
          tempEdgesList[j].dst.dpid.substring(15) +
          " port: " +
          tempEdgesList[j].dst.port_no.substring(7),
      });
    }

    // An array of nodes
    const nodes = new DataSet(dataNode);

    // An array of edges
    const edges = new DataSet(dataEdges);

    const data = {
      nodes,
      edges,
    };

    const options = {
      nodes: {
        size: 7,
        font: {
          size: 7,
        },
      },

      edges: {
        font: {
          size: 6,
          align: "middle",
        },
        smooth: {
          type: "dynamic"
        },
      },

      width: "1500px",
      height: "600px",
    };

    network.current = new Network(domNode.current, data, options);
  }, [domNode, network, edgesList, SwitchList]);
  return (
    <div className="topology">
      <h1 className="topologyTitle">TOPOLOGY</h1>
      <div className="tolopogyItem" ref={domNode} />
    </div>
  );
}

export default Topology;