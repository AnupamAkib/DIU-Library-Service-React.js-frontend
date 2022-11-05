import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./Drawer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


const Header = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  let toast = require(".././toast.js");
  const methods = require('.././methods.js');
  const api = methods.API();

  useEffect(() => { //ping backend server in every 15 seconds
    const interval = setInterval(function() {
      axios.get(api+'/test', {
          //parameters
      })
          .then((response) => {
              //console.log(response.data)
          }, (error) => {
              console.log(error);
      });
    }, 15000);
  }, [])
  




  // EDIT HERE IF PAGES NEED TO ADD

    const pages = [];

    if(localStorage.getItem("auth_studentID")){ //student logged in view
        pages.push({ text:"Home", href:"/student" })
        pages.push({ text:"My Book List", href:"/student/booklist" })
        pages.push({ text:"Change Password", href:"/student/change_password" })
    }
    else if(localStorage.getItem("auth_guardID")){ //student logged in view
      pages.push({ text:"Locker Key Distribution", href:"/guards/login" })
      pages.push({ text:"Search Student", href:"/guards/view_student_info" })
  }




  return (
    <React.Fragment>
      <AppBar sx={{ background: "#09509e" }}>
        <Toolbar>
          <font size="5">DIU Library Service</font>
          {isMatch ? (
            <>
              <DrawerComp data = {pages}/>
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                {pages.map((page, index) => (
                <Tab label={page.text} onClick={()=>navigate(page.href)} />
                ))}
                

              </Tabs>


              {
                localStorage.getItem("auth_studentID")?
                <>
                <Button variant="" sx={{ marginLeft: "auto" }}>{localStorage.getItem("auth_studentName")} ({localStorage.getItem("auth_studentID")})</Button>
                <Button onClick={()=>{localStorage.setItem("auth_studentID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/student/login")}} sx={{ marginLeft: "10px" }} variant="contained">
                  Logout
                </Button>
                </>
                :
                localStorage.getItem("auth_guardID")?
                <>
                <Button variant="" sx={{ marginLeft: "auto" }}>{localStorage.getItem("auth_guardName")}</Button>
                <Button onClick={()=>{localStorage.setItem("auth_guardID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/guards/login")}} sx={{ marginLeft: "10px" }} variant="contained">
                  Logout
                </Button>
                </>
                :
                <>
                  <Button onClick={()=>navigate("/student/login")} sx={{ marginLeft: "auto" }} variant="contained">
                  Login
                  </Button>
                  <Button onClick={()=>navigate("/student/registration")} sx={{ marginLeft: "10px", background:"green" }} variant="contained">
                    SignUp
                  </Button>
                </>
              }


            </>
          )}
        </Toolbar>
      </AppBar><br/><br/><br/>
    </React.Fragment>
  );
};

export default Header;