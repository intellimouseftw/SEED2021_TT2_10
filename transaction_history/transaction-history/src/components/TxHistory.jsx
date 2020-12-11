import React, { useState, useEffect } from 'react'
import { getTxData } from '../api/getTxData.api'
import { BrowserRouter, Switch, Link } from 'react-router-dom'
import TxDetails from './TxDetails'

import { txData } from '../static_data'

function TxHistory() {

    const custID = 10
    const [TxHist, setTxHist] = useState([])

    console.log(getTxData(10))
    
    useEffect(()=> {
        getTxData(custID).then((response)=> {
            setTxHist(response.data)
            })
        }, [custID])

    useEffect(() => {
        console.log(txData)
    }
    )

    return (
        <BrowserRouter>
            <div className="container-sm">
                {txData.map((singleTx, txID) => {
                    return (
                        <TxDetails data={singleTx} txID={txID} />
                    )
                })}
            </div>
        </BrowserRouter>
    )
}

export default TxHistory