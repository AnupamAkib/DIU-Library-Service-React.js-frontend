import React from 'react'

export default function InfoCard(props) {
    const studentID = props.studentID;
    const keyNumber = props.keyNumber;
    const handoverTime = props.handoverTime;
    const returnTime = props.returnTime;
    const duration = props.duration;
    return (
        /*<div className="lockerInfoCard">
            Sudent ID: {studentID}<br/>
            Key Number: {keyNumber}<br/>
            Handover Time: {handoverTime}<br/>
            Return Time: {returnTime=="-"? <i>NOT RETURNED</i> : returnTime}<br/>
            Duration: {duration}<br/>
        </div>*/
        <tr>
            <td>{studentID}</td>
            <td>{keyNumber}</td>
            <td>{handoverTime}</td>
            <td>{returnTime=="-"? <i>NOT RETURNED</i> : returnTime}</td>
            <td>{duration}</td>
        </tr>
    )
}
