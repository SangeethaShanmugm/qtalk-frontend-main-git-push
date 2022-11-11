import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut, reset } from "../../redux/AuthSlice";

import style from "./header.module.css";
const NavSection = styled.section` 
  
`;
const NavArticle = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  ${'' /* height: 70px; */}
`;
const LogoBlock = styled.div`
  flex-basis: 200px;
  padding: 5px;
  font-size: 30px;
`;
const AuthBlock = styled.div`
  flex-basis: 50%;
  display: flex;
  justify-content: flex-end;
`;
const AuthUl = styled.ul`
  display: flex;
  list-style: none;
`;

const Navbar = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let { isLoading, isSuccess, isError, message, user, isLogout } = useSelector(
    state => state.auth
  );

  // let logoutFun = e => {
  //   if (user) {
  //     dispatch(logOut());
  //     window.location.assign("/signin");
  //   }
  // };

  
  const onLogout = () => {
    dispatch(logOut())
    dispatch(reset())
    navigate('/login')
  }

  let AuthUser = () => {
    return (
      <Fragment>
        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
      </Fragment>
    );
  };

  let AnonymousUser = () => {
    return (
      <Fragment>
        
        <li>
          <Link to={isLogout ? "/logout" : "/login"}>{isLogout ? "Logout" : "Login"}</Link>
        </li>
        {/* <li>
          <Link to="/register">{isLogout ? "" : isLogout=== false ? "" : "Register"} </Link>
        </li>         */}
      </Fragment>
    );
  };

  return (
    <NavSection>
      <NavArticle>
        <LogoBlock className="logoBlock"></LogoBlock>
        <AuthBlock className="authBlock">
          <AuthUl className={style.authUl}>
            {user?.TOKEN ? <AuthUser /> : <AnonymousUser />}
          </AuthUl>
        </AuthBlock>
      </NavArticle>
    </NavSection>
  );
};

export default Navbar;
