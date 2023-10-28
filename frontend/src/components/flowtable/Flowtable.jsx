import axios from 'axios'
import './flowtable.css'
import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function Flowtable() {

    const [LoadFlow, setLoadFlow] = useState([]);
    const [SwitchList, setswitchList] = useState([]);
    
    useEffect(() => {
      axios.get("http://192.168.56.1:5000/switches").then((result) => {
         setswitchList(result.data);
      });
    }, []);

    // sort switch id
    const swId = SwitchList;
    let sortSwId = swId.sort(function(a,b){
        return a-b;
    })
      
  useEffect(() => {
        axios.get("http://192.168.56.1:5000/flow/2" ).then((res) => {
        setLoadFlow(res.data);
      }); 
  }, []);
    
  console.log(LoadFlow);

  function createData(
    RouterId,
     Priority,
     Match_Field,
     cookie,
     Duration,
     Idle_Timeout,
     Hard_Timeout,
     Instructions,
     Packet_Count,
     Byte_Count
   ) {
     return {
       RouterId,
       Priority,
       Match_Field,
       cookie,
       Duration,
       Idle_Timeout,
       Hard_Timeout,
       Instructions,
       Packet_Count,
       Byte_Count,
     };
   }

   const rows = [
     createData(
       2,
       65535,
       "in_port: 2, enw_src: '10.0.0.4', nw_dst: '10.0.0.2",
       0,
       1150,
       120,
       0,
       "OUTPUT: port:3",
       3,
       140
     ),
   ];

  return (
    <div className="flowtable">
      <h1 className="Title">FlowsTable</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Router_Id</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Match_Field</TableCell>
              <TableCell align="center">Cookie&nbsp;</TableCell>
              <TableCell align="center">Duration&nbsp;</TableCell>
              <TableCell align="center">Idle_Timeout&nbsp;</TableCell>
              <TableCell align="center">Hard_Timeout&nbsp;</TableCell>
              <TableCell align="center">Instructions&nbsp;</TableCell>
              <TableCell align="center">Packet_Count&nbsp;</TableCell>
              <TableCell align="center">Byte_Count&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.RouterId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">{row.RouterId}</TableCell>
                <TableCell align="center">{row.Priority}</TableCell>
                <TableCell align="center">{row.Match_Field}</TableCell>
                <TableCell align="center">{row.cookie}</TableCell>
                <TableCell align="center">{row.Duration}</TableCell>
                <TableCell align="center">{row.Idle_Timeout}</TableCell>
                <TableCell align="center">{row.Hard_Timeout}</TableCell>
                <TableCell align="center">{row.Instructions}</TableCell>
                <TableCell align="center">{row.Packet_Count}</TableCell>
                <TableCell align="center">{row.Byte_Count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
