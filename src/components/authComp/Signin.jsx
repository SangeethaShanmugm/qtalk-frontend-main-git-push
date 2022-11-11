import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../pages/Spinner";
import { signIn, reset } from "../../redux/AuthSlice";
import Styles from "./auth.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";


const Signin = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

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
      let payload = { email, password };
      dispatch(signIn(payload));
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className={Styles.authBlock}>
      <article>
        <header>
          <h1>SignIn</h1>
        </header>
       
          <form onSubmit={handleSubmit} style={{display:"flex", flexDirection: "column", marginLeft: "150px"}}>
           
             
                  <TextField 
                  
                    sx={{ width: 400 }}
                    label="Email"
                    variant="standard"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                
                            
                  <TextField
                     sx={{ width: 400 }}
                    label="Password"
                    variant="standard"
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
               
                {/* <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    id="email"
                    required
                    placeholder="enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}
                {/* <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    id="password"
                    required
                    placeholder="enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div> */}
              
          
            <div className="form-group">
              <button style={{ background: "#3484cc", width: "100%", color:" #fff"}}>Sign In</button>
            </div>
          </form>
        
      </article>
    </section>
  );
};

export default Signin;
