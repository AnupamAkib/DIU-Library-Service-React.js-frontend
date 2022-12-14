import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom'

const DrawerComp = (props) => {
    const methods = require("../methods")
    const navigate = useNavigate();
    const location = useLocation();
    const [role, setRole] = useState("");
    useEffect(() => {
      let path = location.pathname;
      path = path.split("/");
      if(path[1]=="student" || path[1]=="book"){
        setRole("student");
      }
      else if(path[1]=="guards"){
        setRole("guards");
      }
      else if(path[1]=="admin"){
        setRole("admin");
      }
      //console.log(role)
    }, [location.pathname])
    


    const [openDrawer, setOpenDrawer] = useState(false);
    let toast = require(".././toast.js");
    const pages = props.data;

    const studentLogout = () =>{
      return (
        <Button onClick={()=>{methods.activity(`${localStorage.getItem("auth_studentName")} logged out from the system`, "student", localStorage.getItem("auth_studentID")); setOpenDrawer(false); localStorage.setItem("auth_studentID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/student/login")}} variant="text">
          <i className="fas fa-sign-out" style={{marginRight:"8px"}}></i>Logout
        </Button>
      )
    }
    const guardLogout = () =>{
      return (
        <Button onClick={()=>{methods.activity(`${localStorage.getItem("auth_guardName")} logged out from the system`, "security guard", localStorage.getItem("auth_guardID"));setOpenDrawer(false); localStorage.setItem("auth_guardID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/guards/login")}} variant="text">
          <i className="fas fa-sign-out" style={{marginRight:"8px"}}></i>Logout
        </Button>
      )
    }
    const adminLogout = () =>{
      return (
        <Button onClick={()=>{methods.activity(`${localStorage.getItem("auth_adminName")} logged out from the system`, "admin", localStorage.getItem("auth_adminUsername"));setOpenDrawer(false); localStorage.setItem("auth_adminUsername", ""); toast.msg("You have been logged out", "red", 3000); navigate("/admin/login")}} variant="text">
          <i className="fas fa-sign-out" style={{marginRight:"8px"}}></i>Logout
        </Button>
      )
    }
    const loginOrSignUp = () =>{
      return (<>
        <Button onClick={()=>{setOpenDrawer(false); navigate("/student/login")}} variant="text" fullWidth>
          <i className="fas fa-sign-in" style={{marginRight:"8px"}}></i>Login
        </Button>
        <Button style={{marginTop:"10px"}} onClick={()=>{setOpenDrawer(false); navigate("/student/registration")}} variant="text" fullWidth>
          <i className="fas fa-user-plus" style={{marginRight:"8px"}}></i>SignUp
        </Button>
        </>
      )
    }
    

    return (
      <React.Fragment>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <br/><br/><br/>
              <center><img style={{marginTop:"8px"}} src="/library_logo.png" width="150" onClick={()=>{setOpenDrawer(false);navigate("/")}}/></center>
              <hr/>
          {
            localStorage.getItem("auth_studentID") && role=="student"?
            <div style={{padding:"18px"}}>
              <b>{localStorage.getItem("auth_studentName")}</b>
              <br/>
              {localStorage.getItem("auth_studentID")}<br/>
              {localStorage.getItem("auth_studentDept")}
            </div> : 
            localStorage.getItem("auth_guardID") && role=="guards"?
            <div style={{padding:"18px"}}>
              <b className="capitalize">{localStorage.getItem("auth_guardName")}</b>
              <br/>
              <b>EmpID:</b> {localStorage.getItem("auth_guardID")}<br/>
              <b>Role:</b> Security Guard<br/>
            </div> : 
            localStorage.getItem("auth_adminUsername") && role=="admin"?
            <div style={{padding:"18px"}}>
              <b className="capitalize">{localStorage.getItem("auth_adminName")}</b><br/>
              <b>User:</b> {localStorage.getItem("auth_adminUsername")}<br/>
              <b>Role:</b> Admin<br/>
            </div> : 
            <></>
          }
          <List sx={{width:"220px"}} onClick={()=>setOpenDrawer(false)}>
            {pages.map((page, index) => (
              <ListItemButton key={index} onClick={()=>navigate(page.href)}>
                <ListItemIcon>
                  <ListItemText><i className={page.icon} style={{marginRight:"8px"}}></i>{page.text}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))}
            
          </List>
          <hr/>
            {
                  role=="student"?
                    localStorage.getItem("auth_studentID")?
                      studentLogout()
                      :
                      loginOrSignUp()
                  :
                  role=="guards"?
                    localStorage.getItem("auth_guardID")?
                      guardLogout()
                      :
                      <></>
                  :
                  role=="admin"?
                    localStorage.getItem("auth_adminUsername")?
                      adminLogout() : <></>
                    :
                    <></>
                }


        </Drawer>
        <IconButton
          sx={{ color: "white", marginLeft: "auto" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon color="white" />
        </IconButton>
      </React.Fragment>
    );
};

export default DrawerComp;