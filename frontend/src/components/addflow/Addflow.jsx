import './addflow.css'
import React, { useState } from 'react';
import axios from 'axios';


export default function Addflow() {

  const [RouterID, setRouterID] = useState("");
  const [In_Port, setIn_Port] = useState([]);
  const [inputSrc, setInputSrc] = useState("");
  const [inputDst, setInputDst] = useState("");
  const [Action, setAction] = useState("INPUT");
  const [Port, setPort] = useState("");
  

  // collect RouterID
  const handleChange = (e) => {
    setRouterID(e.target.value);
  };

  // collect In_Port
  const handleChange2 = (e) => {
    setIn_Port(e.target.value);
  };

  // collect input src ip
  const handleChange3 = (event) => {
    setInputSrc(event.target.value);
  };

  // collect input dst ip
  const handleChange4 = (event) => {
    setInputDst(event.target.value);
  };

  // collect input dst ip
  const handleChange5 = (event) => {
    setAction(event.target.value);
  };

  // collect input dst ip
  const handleChange6 = (event) => {
    setPort(event.target.value);
  };

  // collect sumit
  const handleSubmit = (e) => {
   e.preventDefault();
    const data = {
      dpid: RouterID,
      idle_timeout: 1200,
      priority: 65535,
      match: {
        in_port: In_Port,
        nw_src: inputSrc,
        dl_type: 2048,
        nw_dst: inputDst,
      },
      actions: [
        {
          type: Action,
          port: Port,
        }
      ]
    };
    

    axios.post("http://192.168.56.1:5000/addflow",data)
    .then((response) => {
      console.log(data);
      console.log("Flow entry added successfully:", response);
    }).catch((error) => {
      console.error("Error adding flow entry:", error);
    });
    
  };
  
  // set action type
  const Action_Options = [
    { value: "INPUT", text: "INPUT" },
    { value: "OUTPUT", text: "OUTPUT" }
  ];

  const resetForm = () => {
     setRouterID("");
     setIn_Port("");
     setInputSrc("");
     setInputDst("");
     setAction("");
     setPort("");
   };
  
  return (
    <div className="addflow">
      <h1 className="Title">ADD FLOWS</h1>
      <div className="List">
        <p className="ListItem">
          <h4>Taget</h4>
          <label>
            RouterID : &nbsp;
            <input type="text" value={RouterID} onChange={handleChange} />
          </label>
        </p>
      </div>
      <h4 className="List">Match Field</h4>
      <p className="ListItem">
        <form>
          <label>
            In_Port : &nbsp;
            <input type="text" value={In_Port} onChange={handleChange2} />
          </label>
          <br />
          <label>
            Source IP Address:&nbsp;
            <input type="text" value={inputSrc} onChange={handleChange3} />
          </label>
        </form>
        <form>
          <label>
            Destination IP Address:&nbsp;
            <input type="text" value={inputDst} onChange={handleChange4} />
          </label>
        </form>
      </p>
      <h4 className="List">Apply Action</h4>
      <p>
        Action_Type :&nbsp;
        <select select value={Action} onChange={handleChange5}>
          {Action_Options.map((item) => {
            return (
              <option key={item.key} value={item.value}>
                {item.text}
              </option>
            );
          })}
        </select>
      </p>
      <form>
        <label>
          Port : &nbsp;
          <input type="text" value={Port} onChange={handleChange6} />
        </label>
      </form>
      <br />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
        &nbsp;&nbsp;&nbsp;
        <input type="button" value="Cancel" onClick={() => resetForm()} />
      </form>
    </div>
  );
}