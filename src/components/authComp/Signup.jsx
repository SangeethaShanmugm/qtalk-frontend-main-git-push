import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Styles from "./auth.module.css";
import { register, reset } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../pages/Spinner";
import Sidebar from "../sidebarComp/Sidebar";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";

const Signup = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [number, setNumber] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [idNum, setIdNum] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message, { position: "top-right" });
    }
    if (isSuccess) {
      toast.success("successfully registered", { position: "top-right" });
      navigate("/admin/dashboard");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      let payload = { email, password, username, number, idNum, role };
      dispatch(register(payload));
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Sidebar>
        <section className={Styles.authBlock}>
          <article>
            <header>
              <h1>Add other Roles</h1>
            </header>
            <main>
              <form onSubmit={handleSubmit}>
                <Box>
                  <Grid container spacing={2} columns={16}>
                    <Grid item xs={8} zeroMinWidth>
                      <em style={{ color: "red" }}>*All fields are required</em>
                      <TextField
                        sx={{ width: 300 }}
                        label="Username"
                        variant="standard"
                        value={username}
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        sx={{ width: 300, marginTop: "4%" }}
                        label="Email"
                        variant="standard"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        sx={{ width: 300 }}
                        label="Number"
                        variant="standard"
                        value={number}
                        placeholder="Enter number"
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <InputLabel variant="standard">Role</InputLabel>

                      <NativeSelect
                        id="demo-simple-select-standard"
                        labelId="demo-simple-select-label"
                        sx={{ width: 300, marginTop: "5%" }}
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                        label="Role"
                      >
                        <option value="trainer">Trainer</option>
                        <option value="hr">HR</option>
                        <option value="tracker">Tracker</option>
                        <option value="councellor">Councellor</option>
                      </NativeSelect>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        sx={{ width: 300 }}
                        variant="standard"
                        label="ID"
                        value={idNum}
                        placeholder="Enter idNum"
                        onChange={(e) => setIdNum(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <div className="form-group">
                  <button
                    style={{ marginTop: "8%", marginLeft: "30%", width: "30%",backgroundColor: "#3484cc", }}
                    
                  >
                    Register Role
                  </button>
                </div>
              </form>
            </main>
          </article>
        </section>
      </Sidebar>
    </>
  );
};

export default Signup;
