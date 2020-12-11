import React, { useState, useEffect } from 'react'
import { getTxData } from '../api/getTxData.api'
import { BrowserRouter, Switch, Link } from 'react-router-dom'

import { txData } from '../static_data'

function TxHistory() {

    const custID = 10
    const [TxHist, setTxHist] = useState([])

    // console.log(getTxData(10))
    // 
    // useEffect(()=> {
    //     getTxData(custID).then((response)=> {
    //         setTxHist(response.data)
    //         })
    //     }, [custID])

    useEffect(() => {
        console.log(txData)
    }
    )

    return (
        <BrowserRouter>
            <div className="container-sm">
                <div className="row">
                    <div className="col">
                        <h1>Transaction ID</h1>
                    </div>
                    <div className="col">
                        <h1>Amount</h1>
                    </div>
                    <div className="col">
                        <h1>Date</h1>
                    </div>
                </div>
                {txData.map((singleTx, txID) => {
                    return (
                        <div classname="row">
                            <div className="col">
                                <p>{txID}</p>
                            </div>
                            <div className="col">
                                <p>{singleTx.amount}</p>
                            </div>
                            <div className="col">
                                <p>{singleTx.dateTime}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </BrowserRouter >
    )
}

export default TxHistory