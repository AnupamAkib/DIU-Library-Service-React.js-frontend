import React, { useState } from "react";
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


const DrawerComp = (props) => {
    const navigate = useNavigate();
    //console.log(props.data)
  const [openDrawer, setOpenDrawer] = useState(false);
  let toast = require(".././toast.js");
  const pages = props.data;
  return (
    <React.Fragment>
      <Drawer
      
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {
          localStorage.getItem("auth_studentID")?
          <div style={{padding:"18px"}}>
            <br/>
            <center><img src="/library_logo.png" width="150"/></center>
            <br/>
            <b>{localStorage.getItem("auth_studentName")}</b>
            <br/>
            {localStorage.getItem("auth_studentID")}<br/>
            {localStorage.getItem("auth_studentDept")}
          </div> : <></>
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
                localStorage.getItem("auth_studentID")?
                <Button onClick={()=>{setOpenDrawer(false); localStorage.setItem("auth_studentID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/student/login")}} variant="text">
                  Logout
                </Button>
                :
                <>
                  <Button onClick={()=>{setOpenDrawer(false); navigate("/student/login")}} variant="text" fullWidth>
                  Login
                  </Button>
                  <Button style={{marginTop:"10px"}} onClick={()=>{setOpenDrawer(false); navigate("/student/registration")}} variant="text" fullWidth>
                    SignUp
                  </Button>
                </>
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