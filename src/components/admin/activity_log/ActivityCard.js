import React from 'react'

export default function ActivityCard(props) {
    const activity = props.activity;
    const role = props.role;
    const username = props.username;
    const dateTime = props.dateTime;

    return (
        <div className='ActivityCard'>
            <font size='3'><b>{activity}</b></font><br/>
            <i className='fa fa-user' style={{marginRight:"5px"}}></i> {username}, {role}<br/>
            <i className='fa fa-clock-o' style={{marginRight:"5px"}}></i>{dateTime}
        </div>
    )
}
