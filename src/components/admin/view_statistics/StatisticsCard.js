import React from 'react'

export default function (props) {
    const count = props.count;
    const title = props.title;
    return (
        <div className='statistics_card' style={{width:"50%"}}>
            <center>
                <font style={{fontSize:"37px"}}><b>{count}</b></font>
                <br/>
                {title}
            </center>
        </div>
    )
}
