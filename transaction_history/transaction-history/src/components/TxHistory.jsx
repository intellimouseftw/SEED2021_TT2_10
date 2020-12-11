import React, { useState, useEffect } from 'react'
import { getTxData } from '../api/getTxData.api'
import { getUserData } from '../api/getUserData.api'
import TxDetails from './TxDetails'

import { txData, userDBdata } from '../static_data'

function TxHistory() {

    const custID = 10
    const [txHist, setTxHist] = useState([])

    const [userDB, setUserDB] = useState([])

    // console.log(getTxData(10))

    // useEffect(() => {
    //     getTxData(custID).then((response) => {
    //         setTxHist(response.data)
    //     })
    // }, [custID])

    // useEffect(() => {
    //     getUserData().then((response) => {
    //         setUserDB(response.data)
    //     })
    // }, [])

    const [isExpanded, setExpanded] = useState(false)


    return (
        <div className="container-fluid">
        <h1>Transaction History</h1>
        {isExpanded ? 
        <div className="container-fluid text-center">
            {txData.map((singleTx, txID) => {
                return (
                    <TxDetails data={singleTx} txID={txID+1} userDB={userDBdata} />
                )
            })}
        </div> :
        <div className="container-fluid text-center">
            {txData.slice(0,3).map((singleTx, txID) => {
                return (
                    <TxDetails data={singleTx} txID={txID+1} userDB={userDBdata} />
                )
            })}
            <button className="btn btn-outline-primary" onClick={()=>setExpanded(true)}>View All Transactions...</button>
        </div>
        }
        </div>
    )
}

export default TxHistory