import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <center>
                <h2>Select your role</h2><br/>
                <Button onClick={()=>navigate("/student/")}>Student</Button><br/>
                <Button onClick={()=>navigate("/guards/all_distributed_key")}>Security Guard</Button><br/>
                <Button onClick={()=>navigate("/admin/")}>Admin/Authority</Button><br/>
            </center>
        </div>
    )
}
