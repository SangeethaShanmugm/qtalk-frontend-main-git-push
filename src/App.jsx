import React, { lazy, Suspense } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from "./components/ErrorBoundary";
import ListRoles from "./components/Register/ListRoles";
import AddBatch from "./components/Batches/AddBatch";
import Spinner from "./pages/Spinner";
import SelectedBatchList from "./components/Batches/SelectedBatchLish";
// import Navbar from "./components/headerComp/Navbar";
// import Home from "./pages/Home";
// import Signup from "./components/authComp/Signup";
// import Signin from "./components/authComp/Signin";
// import Sidebar from "./components/sidebarComp/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import UserDashboard from "./components/User/UserDashboard";
// import Batch from "./components/Batches/Batch";
const Dashboard = React.lazy(() => import ("./pages/Dashboard"))
const Signin = React.lazy(() => import ("./components/authComp/Signin"));
const Signup = React.lazy(() => import ("./components/authComp/Signup"));
const Home = React.lazy(() => import ("./pages/Home"));
const Navbar = React.lazy(() => import ("./components/headerComp/Navbar"));
const Sidebar = React.lazy(() => import ("./components/sidebarComp/Sidebar"));
const UserDashboard =  React.lazy(() => import ("./components/User/UserDashboard"));
const Batch =  React.lazy(() => import ("./components/Batches/Batch"));


const App = () => {
  let { role } = useSelector(
    state => state.auth
  );


  return (
    <BrowserRouter>     
    <Navbar />    
     <main>
     <Toaster />
     <ErrorBoundary  
     FallbackComponent={ErrorFallback}
     onReset={() => {}}>
     <Suspense fallback={<div><Spinner /></div>}>
     <Routes>
        <Route path="/" element={role === "admin" ? <Dashboard /> : <UserDashboard />} />
        <Route path="/admin/dashboard" element={role === "admin" ? <Dashboard /> : <Signin />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/admin/register" element={<Signup />} />   
        <Route path="/admin/batch" element={<AddBatch/>} />
        <Route path="/admin/listRoles" element={<ListRoles/>} />
        <Route path="/:batchCode" element={<SelectedBatchList/>}/>
      </Routes>
      </Suspense>
      </ErrorBoundary>
     </main>
    
  </BrowserRouter>
    
  );
};

export default App;
