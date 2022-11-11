import React from 'react';
import Sidebar from "../components/sidebarComp/Sidebar";
import BatchList from "../components/Batches/BatchList";
const Dashboard = () => {
    return (
        <div>
           <Sidebar >
           <h1>Admin Dashboard</h1>
           <BatchList />
           </Sidebar>
        </div>
    );
};

export default Dashboard;