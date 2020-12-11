import React from 'react'
import CommuteRoundedIcon from '@material-ui/icons/CommuteRounded';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import LocalMallRoundedIcon from '@material-ui/icons/LocalMallRounded';
import NoteRoundedIcon from '@material-ui/icons/NoteRounded';
import SportsEsportsRoundedIcon from '@material-ui/icons/SportsEsportsRounded';
import "../css/TxDetails.css"

function TxDetails(props) {

    function IconSelector(expensesCat) {
        if (expensesCat === "Entertainment") {
            return <SportsEsportsRoundedIcon className="enlarge_icon" />
        } else if (expensesCat === "Transport") {
            return <CommuteRoundedIcon className="enlarge_icon" />
        } else if (expensesCat === "Food") {
            return <FastfoodRoundedIcon className="enlarge_icon" />
        } else if (expensesCat === "Shopping") {
            return <LocalMallRoundedIcon className="enlarge_icon" />
        } else if (expensesCat === "Insurance") {
            return <NoteRoundedIcon className="enlarge_icon" />
        } else {
            return <NoteRoundedIcon className="enlarge_icon" />
        }
    }

    function AdjustDateString(dateString) {
        var date = dateString.substring(0, 10)
        var time = dateString.substring(11, 19)
        return (date + "   " + time)
    }

    console.log(AdjustDateString(props.data.dateTime))


    return (
        <div className="card m-2" style={{ minWidth: "500px" }}>
            <div className="container-sm">
                <div className="row">
                    <div className="col">
                        {IconSelector(props.data.expensesCat)}
                    </div>
                    <div className="col">
                        <p>Amount {props.data.amount}</p>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <p>Transaction ID</p>
                            <p> {props.txID} </p>
                        </div>
                        <div className="col">
                            <p>Transaction Date</p>
                            <p>{AdjustDateString(props.data.dateTime)}</p>
                        </div>
                        <div className="col">
                            <p>Paid to</p>
                            <p>{props.data.custID}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Message</p>
                            <p>{props.data.message}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default TxDetails