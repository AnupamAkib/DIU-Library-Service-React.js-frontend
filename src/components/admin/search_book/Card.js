import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import DeleteBook from '../delete_book/DeleteBook';
import { Box, Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function SearchBookCard(props) {
    let navigate = useNavigate();
    const action = props.action;
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

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);



    //console.log(action)
    const sendBookData = () =>{
        //console.log(action)
        if(action=="edit"){
            navigate("/admin/edit_book/"+ID);
        }
        else if(action=="delete"){
            //console.log("delete "+title)
            handleOpen();
        }
    }

    return (
        <>
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
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="col-3">
                        <DeleteBook ID={ID} title={title} writer={writer}/>
                    </Box>
                </Modal>
            </div>
        </>
    )
}
