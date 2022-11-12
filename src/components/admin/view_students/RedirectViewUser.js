import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function RedirectViewUser() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/admin/view_users");
    }, [])
    
    return <></>
}
