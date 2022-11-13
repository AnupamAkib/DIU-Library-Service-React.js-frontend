import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CardActionArea } from '@mui/material';


export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='container col-6'>
            <center>
                <img src="/diulogo.png" width="200" style={{marginTop:"10px"}}/><hr/>
                <div style={{padding:"15px 35px 15px 35px"}}>
                <h1>Welcome to DIU Library Service</h1>
                Please select your role to interact with the system
                </div>

                <div style={{float:"left", width:"100%"}}>
                    <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                        m: 1,
                        width:"100%",
                        height: 150,
                        },
                    }}
                    onClick={()=>navigate("/student/")}
                    >
                        <CardActionArea>
                            <Paper elevation={3} style={{height:"100%", fontSize:"large", padding:"5px"}}>
                                <center>
                                    <i className="fas fa-user-graduate" style={{fontSize:40, padding:"27px 27px 15px 27px"}}></i><br/>
                                    Enter as Student
                                </center>
                            </Paper>
                        </CardActionArea>
                    </Box>
                </div>

                <div style={{float:"left", width:"50%"}}>
                    <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                        m: 1,
                        width:"100%",
                        height: 150,
                        },
                    }}
                    onClick={()=>navigate("/guards/all_distributed_key")}
                    >
                        <CardActionArea>
                            <Paper elevation={3} style={{height:"100%", fontSize:"large", padding:"5px"}}>
                                <center>
                                    <i className="fas fa-user-shield" style={{fontSize:40, padding:"27px 27px 19px 27px"}}></i><br/>
                                    Security Guard
                                </center>
                            </Paper>
                        </CardActionArea>
                    </Box>
                </div>

                <div style={{float:"left", width:"50%"}}>
                    <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                        m: 1,
                        width:"100%",
                        height: 150,
                        },
                    }}
                    onClick={()=>navigate("/admin/")}
                    >
                        <CardActionArea>
                            <Paper elevation={3} style={{height:"100%", fontSize:"large", padding:"5px"}}>
                                <center>
                                    <i className="fas fa-user-tie" style={{fontSize:40, padding:"27px 27px 19px 27px"}}></i><br/>
                                    Admin/Authority
                                </center>
                            </Paper>
                        </CardActionArea>
                    </Box>
                </div>

            </center> 
                    
            <div style={{clear:"both"}} className="project_card">
                <br/>
                
                <div className='col-12'>
                    <b>Project Name:</b> DIU Library Service<br/>
                    <b>Course Code:</b> SE431<br/>
                    <b>Finish Date:</b> 13 November, 2022<br/>
                </div>
                <br/>

                <div className="col-6 project_card" style={{float:"left"}}>
                    <h4><u>Presented by</u></h4>
                    <table>
                        <tr>
                            <td style={{verticalAlign:"top"}}>
                                <img src="/anupam.jpg" width="50px" style={{borderRadius:"50%", margin:"10px"}}/>
                            </td>
                            <td>
                                <font style={{fontSize:"22px", fontWeight:"bold"}}>Mir Anupam Hossain Akib</font><br/>
                                ID: 191-35-2640, Batch: 28<sup>th</sup> <br/>
                                Department of Software Engineering,<br/>
                                Daffodil International University<br/>
                                <i className='fas fa-envelope' style={{marginRight:"7px"}}></i>anupam35-2640@diu.edu.bd<br/>
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="col-6 project_card" style={{float:"left"}}>
                    <h4><u>Supervised by</u></h4>
                    <table>
                        <tr>
                            <td style={{verticalAlign:"top"}}>
                                <img src="/NJ.jpg" width="50px" style={{borderRadius:"50%", margin:"10px"}}/>
                            </td>
                            <td>
                                <font style={{fontSize:"22px", fontWeight:"bold"}}>Ms. Nusrat Jahan</font><br/>
                                Assistant Professor and Head,<br/>
                                Department of ITM,<br/>
                                Daffodil International University<br/>
                                <i className='fas fa-envelope' style={{marginRight:"7px"}}></i>nusrat.swe@diu.edu.bd<br/>
                            </td>
                        </tr>
                    </table>
                </div>


            </div>
        </div>
    )
}
