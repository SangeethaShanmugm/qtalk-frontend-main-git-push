import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Styles from "./sidebar.module.css"


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        
        {
            path:"/admin/dashboard",
            name:"Dashboard",
            icon:<FaCommentAlt/> 
        },        
        {
            path:"/admin/register",
            name:"Add Roles",
            icon:<FaUserAlt/>
        },
        {
            path:"/admin/batch",
            name:"Add Batches",
            icon:<FaThList/>
        }
        
    ]
    return (
        <div className={Styles.container}>
           <div style={{width: isOpen ? "200px" : "150px"}} className={Styles.sidebar}>
               <div className={Styles.top_section}>
                   <h1 style={{display: isOpen ? "block" : "none"}} className={Styles.logo}>Q-Talk</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className={Styles.bars}>
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className={Styles.link} activeclassname={Styles.active}>
                           <div className={Styles.icon}>{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={Styles.link_text}>{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;