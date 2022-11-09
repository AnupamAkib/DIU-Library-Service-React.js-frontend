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
        <Button onClick={()=>{setOpenDrawer(false); localStorage.setItem("auth_studentID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/student/login")}} variant="text">
          Logout
        </Button>
      )
    }
    const guardLogout = () =>{
      return (
        <Button onClick={()=>{setOpenDrawer(false); localStorage.setItem("auth_guardID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/guards/login")}} variant="text">
          Logout
        </Button>
      )
    }
    const adminLogout = () =>{
      return (
        <Button onClick={()=>{setOpenDrawer(false); toast.msg("You have been logged out", "red", 3000); navigate("/admin/login")}} variant="text">
          Logout
        </Button>
      )
    }
    const loginOrSignUp = () =>{
      return (<>
        <Button onClick={()=>{setOpenDrawer(false); navigate("/student/login")}} variant="text" fullWidth>
          Login
        </Button>
        <Button style={{marginTop:"10px"}} onClick={()=>{setOpenDrawer(false); navigate("/student/registration")}} variant="text" fullWidth>
          SignUp
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
          <br/>
              <center><img src="/library_logo.png" width="150" onClick={()=>{setOpenDrawer(false);navigate("/")}}/></center>
              <br/>
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
              <b>{localStorage.getItem("auth_guardName")}</b>
              <br/>
              <b>EmpID:</b> {localStorage.getItem("auth_guardID")}<br/>
              <b>Role:</b> Security Guard<br/>
            </div> : 
            role=="admin"?
            <div style={{padding:"18px"}}>
              <b>Admin Name</b><br/>
              <b>EmpID: </b><br/>
              <b>Role:</b> Admin<br/>
            </div> : 
            <></>
          }
          <List sx={{width:"220px"}} onClick={()=>setOpenDrawer(false)}>
            {pages.map((page, index) => (
              <ListItemButton key={index} onClick={()=>navigate(page.href)}>
                <ListItemIcon>
                  <ListItemText>{page.text}</ListItemText>
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
                    adminLogout()
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