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

    function RetrieveUserFullName(custID) {
        var userData = props.userDB.find((userData) => {
            return userData.custID === custID
        })
        return userData.firstName + " " + userData.lastName
    }

    function checkReceiving() {
        return props.data.custID === 10
    }

    let isReceiving = checkReceiving()

    return (
        <div className="card m-2" style={{ minWidth: "500px" }}>
            <div className="container-fluid">
                <div className="top_left">
                    {props.data.eGift && <h5><b>E-gift</b></h5>}
                </div>
                <div className="row">
                    <div className="col">
                        {IconSelector(props.data.expensesCat)}
                    </div>
                    <div className="col">
                        <b>Amount</b>{isReceiving ? <h2 className="text-success">+{props.data.amount}</h2> : <h2 className="text-danger">-{props.data.amount}</h2>}
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="container-fluid text-center">
                    <div className="row">
                        <div className="col">
                            <b>Transaction ID</b>
                            <p> {props.txID} </p>
                        </div>
                        <div className="col">
                            <b>Transaction Date</b>
                            <p>{AdjustDateString(props.data.dateTime)}</p>
                        </div>
                        <div className="col">
                            {isReceiving ? <b>Received from</b> : <b>Paid to</b>}
                            <p>{RetrieveUserFullName(props.data.custID)}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <b>Message</b>
                            <p>{props.data.message}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default TxDetails