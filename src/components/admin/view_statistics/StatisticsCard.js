import React from 'react'

export default function (props) {
    const count = props.count;
    const title = props.title;
    return (
        <div style={{width:"50%", float:"left"}}>
            <div className='statistics_card'>
                <center>
                    <font style={{fontSize:"37px"}}><b>{count}</b></font>
                    <br/>
                    {title}
                </center>
            </div>
        </div>
    )
}
