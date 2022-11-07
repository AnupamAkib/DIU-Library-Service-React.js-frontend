import React from 'react'
import Card from './Card'

export default function Dashboard() {
    return (
        <div className='container col-5'>
            <div align='center' style={{padding:"15px 20px 15px 20px"}}>
              <h1>Welcome Admin</h1>
              Click on the action that you want to perform. You have the access to perform the following actions.
            </div>
            <Card href="/admin/add_book" icon="fas fa-book-open">Add Book</Card>
            <Card href="/admin/search_book/edit" icon="fas fa-edit">Edit Book</Card>
            <Card href="/admin/delete_book" icon="far fa-trash-alt">Delete Book</Card>
            <Card href="/admin/manage_guards" icon="fas fa-user-shield">Manage Guards</Card>
            <Card href="/admin/view_statistics" icon="fa fa-line-chart">View Statistics</Card>
            <Card href="/admin/activity_logs" icon="fa fa-list-ul">Activity Logs</Card>
            <Card href="/admin/view_users" icon="fas fa-users">View Users</Card>
            <Card href="/admin/manage_admin" icon="fas fa-user-tie">Manage Admin</Card>
        </div>
    )
}
