import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Card(props) {
    const navigate = useNavigate();
    const text = props.children;
    const href = props.href;
    const icon = props.icon;
    return (
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
            onClick={()=>navigate(href)}
            >
                <CardActionArea>
                    <Paper elevation={3} style={{height:"100%", fontSize:"large", padding:"5px"}}>
                        <center>
                            <i className={icon} style={{fontSize:40, padding:"27px", opacity:"0.9"}}></i><br/>
                            {text}
                        </center>
                    </Paper>
                </CardActionArea>
           </Box>
             
        </div>
    )
}
