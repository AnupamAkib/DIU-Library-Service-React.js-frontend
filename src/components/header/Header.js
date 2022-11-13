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
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


const Header = () => {
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

    
    if(role=="student"){
      if(localStorage.getItem("auth_studentID")){
        pages.push({ text:"Home", href:"/student", icon:"fas fa-home" })
        pages.push({ text:"My Book List", href:"/student/booklist", icon:"fas fa-file-alt" })
        pages.push({ text:"Change Password", href:"/student/change_password", icon:"fas fa-key" })
      }
      else{
        pages.push({ text:"Login", href:"/student/login", icon:"fas fa-sign-in" })
        pages.push({ text:"Registration", href:"/student/registration", icon:"fas fa-user-plus"  })
        pages.push({ text:"Retrieve Password", href:"/student/password_recovery", icon:"fas fa-key"  })
      }
    }
    else if(role=="guards"){
      if(localStorage.getItem("auth_guardID")){
        pages.push({ text:"All Distributed Key", href:"/guards/all_distributed_key", icon:"fas fa-history"  })
        pages.push({ text:"Search Student", href:"/guards/view_student_info", icon:"fas fa-search"  })
      }
      else{
        pages.push({ text:"Login", href:"/guards/login", icon:"fas fa-sign-in"  })
      }
    }
    else if(role=="admin"){ //get admin access from localstorage data
      if(localStorage.getItem("auth_adminUsername")){
        pages.push({ text:"Dashboard", href:"/admin", icon:"fas fa-home"  })
        let access = localStorage.getItem("props").split(",");
        //console.log(access)
        for(let i=0; i<access.length; i++){
          if(access[i]=='1'){
            pages.push({ text:"Add Book", href:"/admin/add_book", icon:"fas fa-book"  })
          }
          if(access[i]=='2'){
            pages.push({ text:"Edit Book", href:"/admin/search_book/edit", icon:"fas fa-edit"  })
          }
          if(access[i]=='3'){
            pages.push({ text:"Delete Book", href:"/admin/search_book/delete", icon:"fas fa-trash"  })
          }
          if(access[i]=='4'){
            pages.push({ text:"View Users", href:"/admin/view_users", icon:"fas fa-user-edit"  })
          }
          if(access[i]=='5'){
            pages.push({ text:"Manage Guards", href:"/admin/manage_guards", icon:"fas fa-user-shield"  })
          }
          if(access[i]=='6'){
            pages.push({ text:"Manage Admin", href:"/admin/manage_admin", icon:"fas fa-user-tie"  })
          }
          if(access[i]=='7'){
            pages.push({ text:"View Statistics", href:"/admin/view_statistics", icon:"fas fa-bar-chart"  })
          }
          if(access[i]=='8'){
            pages.push({ text:"Activity Logs", href:"/admin/activity_logs", icon:"fas fa-history"  })
          }
        }
      }
      else{
        pages.push({ text:"Admin Login", href:"/admin/login", icon:"fas fa-sign-in"  })
      }
    }
    else{
      pages.push({ text:"Student", href:"/student", icon:"fas fa-sign-in"  })
      pages.push({ text:"Security Guard", href:"/guards/all_distributed_key", icon:"fas fa-sign-in"  })
      pages.push({ text:"Admin", href:"/admin", icon:"fas fa-sign-in"  })
    }


    const studentLogout = () =>{
      return (
        <>
                <Button variant="" sx={{ marginLeft: "auto" }}><i className="fas fa-user-alt" style={{marginRight:"8px"}}></i> {localStorage.getItem("auth_studentName")} ({localStorage.getItem("auth_studentID")})</Button>
                <Button onClick={()=>{methods.activity(`${localStorage.getItem("auth_studentName")} logged out from the system`, "student", localStorage.getItem("auth_studentID"));localStorage.setItem("auth_studentID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/student/login")}} sx={{ marginLeft: "10px" }} variant="contained">
                  <i className="fa fa-sign-out" style={{marginRight:"8px"}}></i>Logout
                </Button>
                </>
      )
    }
    const guardLogout = () =>{
      return (
        <>
        <Button variant="" sx={{ marginLeft: "auto" }}><i className="fas fa-user-shield" style={{marginRight:"8px"}}></i>{localStorage.getItem("auth_guardName")}</Button>
                <Button onClick={()=>{methods.activity(`${localStorage.getItem("auth_guardName")} logged out from the system`, "security guard", localStorage.getItem("auth_guardID"));localStorage.setItem("auth_guardID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/guards/login")}} sx={{ marginLeft: "10px" }} variant="contained">
                  <i className="fa fa-sign-out" style={{marginRight:"8px"}}></i>Logout
                </Button>
        </>
      )
    }
    const adminLogout = () =>{
      return (
        <>
        <Button variant="" sx={{ marginLeft: "auto" }}><i className="fas fa-user" style={{marginRight:"8px"}}></i>{localStorage.getItem("auth_adminName")}</Button>
                <Button onClick={()=>{methods.activity(`${localStorage.getItem("auth_adminName")} logged out from the system`, "admin", localStorage.getItem("auth_adminUsername"));localStorage.setItem("auth_adminUsername", ""); toast.msg("You have been logged out", "red", 3000); navigate("/admin/login")}} sx={{ marginLeft: "10px" }} variant="contained">
                  <i className="fa fa-sign-out" style={{marginRight:"8px"}}></i>Logout
                </Button>
        </>
      )
    }
    const loginOrSignUp = () =>{
      return (<>
        <Button onClick={()=>navigate("/student/login")} sx={{ marginLeft: "auto" }} variant="contained">
          <i className="fa fa-sign-in" style={{marginRight:"8px"}}></i>Login
        </Button>
        <Button onClick={()=>navigate("/student/registration")} style={{ marginLeft: "10px", background:"green" }} variant="contained">
          <i className="fas fa-user-plus" style={{marginRight:"8px"}}></i>SignUp
        </Button>
      </>
      )
    }

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#09509e" }}  style={{zIndex:"11555"}}>
        <Toolbar>
          <img onClick={()=>navigate('/')} src="/diulogo_white.png" width="100px" style={{marginRight:"8px", marginLeft:"10px"}}/>
          
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


            </>
          )}
        </Toolbar>
      </AppBar><br/><br/><br/>
    </React.Fragment>
  );
};

export default Header;