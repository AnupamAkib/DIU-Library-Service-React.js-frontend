import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function ReDirect() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/admin/search_book/delete");
    }, [])
    
    return <></>
}
