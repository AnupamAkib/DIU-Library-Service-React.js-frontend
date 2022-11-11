import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function RedirectToManageAdmin() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/admin/manage_admin");
    }, [])
    
    return <></>
}
