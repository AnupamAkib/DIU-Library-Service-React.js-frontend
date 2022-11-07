import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom"

export default function SearchBookCard(props) {
    let navigate = useNavigate();
    const ID = props.ID;
    const title = props.title;
    const description = props.description;
    const writer = props.writer;
    const thumbnail = props.thumbnail;
    const bookLink = props.bookLink;
    const tags = props.tags;
    const addedDate = props.addedDate;
    let cropedTitle="";
    for(let i=0; i<title.length; i++){
        cropedTitle += title[i];
        if(i===20){
            cropedTitle += "...";
            break;
        }
    }

    const sendBookData = () =>{
        navigate("/admin/edit_book/"+ID);
    }

    return (
        <div className='bookView' title={title} onClick={sendBookData}>
            <Tooltip title={title+" by "+writer}>
            <Card style={{width:"100%"}} className="bookCard">
            <CardActionArea>
                <CardMedia
                component="img"
                height="150"
                image={thumbnail}
                alt={title}
                />
                <CardContent>
                <Typography className="capitalize">
                    <font style={{fontWeight:"bold"}}>{cropedTitle}</font>
                </Typography>
                <Typography variant="body2" color="text.secondary" className="capitalize">
                    {writer}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            </Tooltip>
        </div>
    )
}
