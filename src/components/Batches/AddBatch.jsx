import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/sidebarComp/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../pages/Spinner";
import Styles from "../authComp/auth.module.css";
import { reset, createBatches } from "../../redux/AddBatchSlice";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const AddBatch = () => {
  let [batchCode, setBatchCode] = useState("");
  let [subject, setSubject] = useState("");
  let [course, setCourse] = useState("");
  let [branch, setBranch] = useState("");
  // let [startDate,setStartDate]= useState("");
  let [endDate, setEndDate] = useState();
  let [trainer, setTrainer] = useState("");
  let [tracker, setTracker] = useState("");
  let [addStudents, setAddStudents] = useState(Array);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, { position: "top-right" });
    }
    if (isSuccess && user) {
      toast.success("successfully Signed in", { position: "top-right" });
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, user]);

  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      let payload = {
        batchCode,
        subject,
        course,
        branch,
        endDate,
        trainer,
        tracker,
        addStudents,
      };
      console.log("first");
      dispatch(createBatches(payload));
      console.log(payload);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }


const handleDateChange = (endDate) => {
 console.log(endDate)
 setEndDate(endDate)
}

  return (
    <>
      <Sidebar>
        <section className={Styles.authBlock1}>
          <article>
            <header>
              <h1 style={{ width: "100%",color: "#3484cc",  }}>Add Batches</h1>
            </header>
            <main>
              <form onSubmit={handleSubmit}>
                <Box>
                  <Grid container spacing={3} columns={16}>
                    <Grid item xs={4} zeroMinWidth>
                      <em style={{ color: "red" }}>*All fields are required</em>
                      <TextField
                        sx={{ width: 200 }}
                        label="BatchCode"
                        variant="standard"
                        value={batchCode}
                        placeholder="Enter BatchCode"
                        onChange={(e) => setBatchCode(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4} >
                      <TextField
                        sx={{ width: 200, marginTop: "5%" }}
                        label="Subject"
                        variant="standard"
                        value={subject}
                        placeholder="Enter Subject"
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4} >
                      <TextField
                        sx={{ width: 200, marginTop: "5%"  }}
                        label="Course"
                        variant="standard"
                        value={course}
                        placeholder="Enter Course"
                        onChange={(e) => setCourse(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4} >
                      <TextField
                        sx={{ width: 200, marginTop: "5%"  }}
                        label="Branch"
                        variant="standard"
                        value={branch}
                        placeholder="Enter Branch"
                        onChange={(e) => setBranch(e.target.value)}
                      />
                    </Grid>                   
                    <Grid item xs={4} >
                      <TextField
                        sx={{ width: 200, marginTop: "8%", marginLeft: "-1%" }}
                        label="Trainer"
                        variant="standard"
                        value={trainer}
                        placeholder="Enter Trainer"
                        onChange={(e) => setTrainer(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4} >
                      <TextField
                        sx={{ width: 200, marginTop: "8%", marginLeft: "-1%"  }}
                        label="Tracker"
                        variant="standard"
                        value={tracker}
                        placeholder="Enter Tracker"
                        onChange={(e) => setTracker(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}  >
                    <InputLabel style={{ marginTop: "15%"}}>Select Date</InputLabel>
                    <input style={{ marginLeft: "1%", marginTop: "10%"}} type="date" onChange={e => setEndDate(e.target.value)} required pattern="\d{2}-\d{2}-\d{4}" />
                    {/* <Calendar id={Styles.Calendar}
                    selected={endDate} 
                    onChange={handleDateChange}
                    value={endDate}
                    minDate={new Date()}                    
                    
                    /> */}

                      {/* <TextField
                        sx={{ width: 300 }}
                        label="EndDate"
                        variant="standard"
                        value={endDate}
                        placeholder="Enter EndDate"
                        onChange={(e) => setEndDate(e.target.value)}
                      /> */}
                    </Grid>
                    <Grid item xs={4}>
                      <InputLabel style={{ marginLeft: "1%", marginTop: "15%"}}>Upload Your File </InputLabel>
                      <IconButton aria-label="upload" style={{ width: "70%", marginTop: "7%", marginLeft: "-1%"  }}>
                        <input
                          type="file"
                          // value={addStudents}
                          id="addStudents"
                          required
                          onChange={(e) => setAddStudents(e.target.files[0])}
                        ></input>
                      </IconButton>
                    </Grid>

                    <div className="form-group">
                      <button
                        style={{
                          marginTop: "114%",
                          marginLeft: "500%",
                          width: "300%",
                          height: "30%",
                          backgroundColor: "#3484cc",                          
                          fontSize:"15px",
                          letterSpacing: "1px",
                          cursor: "pointer",
                          border: "none",                          
                        }}
                      >
                        Create Batch
                      </button>
                    </div>
                  </Grid>
                </Box>
              </form>
            </main>{" "}
          </article>
        </section>
      </Sidebar>
    </>
  );
};

export default AddBatch;
