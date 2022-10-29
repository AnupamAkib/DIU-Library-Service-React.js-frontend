import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div align="center">
        <div style={{marginTop:"25vh"}}>
            <CircularProgress /><br/>
            Please Wait
        </div>
    </div>
  )
}
