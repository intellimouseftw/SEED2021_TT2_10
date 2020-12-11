import React, { useState, useEffect } from 'react'
import { getTxData } from '../api/getTxData.api'
import { getUserData } from '../api/getUserData.api'
import TxDetails from './TxDetails'

import { txData, userDBdata } from '../static_data'

function TxHistory() {

    const [txHist, setTxHist] = useState(txData)
    const [userDB, setUserDB] = useState(userDBdata)

    var userDBcopy

    // useEffect(() => {
    //     getTxData(custID).then((response) => {
    //         setTxHist(response.data)
    //         userDBcopy=response.data
    //     })
    // }, [custID])

    // useEffect(() => {
    //     getUserData().then((response) => {
    //         setUserDB(response.data)
    //     })
    // }, [])

    const [isExpanded, setExpanded] = useState(false)

    function filterDB(txHist, startDateStr, endDateStr) {
        const [syear, smonth, sday] = startDateStr.split('-')
        const [eyear, emonth, eday] = endDateStr.split('-')
        const startDate = new Date(syear, smonth, sday)
        const endDate = new Date(eyear, emonth, eday)


        return (txData.filter((txData) => {
            const txDateStr = txData.dateTime
            const [txyear, txmonth, txday] = txDateStr.substring(0, 10).split('-')
            const txDate = new Date(txyear, txmonth, txday)

            return txDate >= startDate && txDate <= endDate
        }))
    }

    function handleDateFilter(event) {
        event.preventDefault()
        setTxHist(filterDB(txHist, event.target[0].value, event.target[1].value))
    }

    function handleReset() {
        setTxHist(txData)
    }

    return (
        <div className="container-fluid">
            <h1>Transaction History</h1>
            <div className="container-fluid">
                <form className="form-group" onSubmit={handleDateFilter}>
                    <div className="row">
                        <div className="col">
                            <b>Filter transactions by date</b>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Start Date
                            <input className="form-control" type="date" id="startDate" required></input>
                        </div>
                        <div className="col">
                            End Date
                            <input className="form-control" type="date" id="endDate" required></input>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <button className="form-control btn btn-primary btn-sm" type="submit">Filter</button>
                            <button className="form-control btn btn-outline-primary btn-sm" type="reset" onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                </form>

            </div>
            {
                isExpanded ?
                    <div className="container-fluid text-center">
                        {txHist.map((singleTx, txID) => {
                            return (
                                <TxDetails key={txID} data={singleTx} txID={txID + 1} userDB={userDB} />
                            )
                        })}
                        <button className="btn btn-outline-primary" onClick={() => setExpanded(false)}>Hide Transactions...</button>
                    </div> :
                    <div className="container-fluid text-center">
                        {txHist.slice(0, 3).map((singleTx, txID) => {
                            return (
                                <TxDetails key={txID} data={singleTx} txID={txID + 1} userDB={userDB} />
                            )
                        })}
                        {txHist.length > 3 && <button className="btn btn-outline-primary" onClick={() => setExpanded(true)}>View All Transactions...</button>}
                    </div>
            }
        </div>
    )
}

export default TxHistory