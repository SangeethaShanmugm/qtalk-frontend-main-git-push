import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsMessenger } from "react-icons/bs";
import Styles from "../authComp/auth.module.css";
import AxioInstance from "../../services/AxioInstance";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AiFillMessage } from 'react-icons/ai';


const BatchList = (props) => {
  const [batchList, setBatchList] = useState([]);

  useEffect(() => {
   AxioInstance.get("/admin/batchList").then((data) => {
     let payload =data.data.result.results; 
     setBatchList(payload)
    });
    
  }, []);
  console.log(batchList)


  const styles = {
    color: "#3484cc",
    fontSize: "40px",
  }


  const handleSubmit = () => {
    console.log("hello")
  }
  return (
    <>
      <TableContainer >
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Batch List</TableCell>
            <TableCell align="left">Branch</TableCell>
            <TableCell align="left">Subject</TableCell>
            <TableCell align="left">Course</TableCell>
            <TableCell align="left">Trainer</TableCell>
            <TableCell align="left">Total Student</TableCell>
            <TableCell align="left" >View Chat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batchList.map((list) => (
            <TableRow
              key={list.batchCode}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="batch">
                {list.batchCode}
              </TableCell>
              <TableCell align="left">{list.branch}</TableCell>
              <TableCell align="left">{list.subject}</TableCell>
              <TableCell align="left">{list.course}</TableCell>
              <TableCell align="left">{list.trainer}</TableCell>
              <TableCell align="left">{list.No_ofStudents}</TableCell>
              <TableCell align="left" style={styles}><AiFillMessage /></TableCell>         
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>         
      
    </>
  );
};

export default BatchList;
