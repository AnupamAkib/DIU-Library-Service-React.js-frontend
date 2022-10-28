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
const Header = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  let toast = require(".././toast.js");







  // EDIT HERE IF PAGES NEED TO ADD

    const pages = [{ text:"Home", href:"/student" }];

    if(localStorage.getItem("auth_studentID")){ //student logged in view
        pages.push({ text:"My Book List", href:"/student/booklist" })
        pages.push({ text:"Change Password", href:"/student/change_password" })
    }










  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
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
                <Button onClick={()=>{localStorage.setItem("auth_studentID", ""); toast.msg("You have been logged out", "red", 3000); navigate("/student/login")}} sx={{ marginLeft: "auto" }} variant="contained">
                  Logout
                </Button>
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