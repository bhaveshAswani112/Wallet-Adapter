import { useContext, useEffect, useState } from "react"
import { WalletContext } from "../ConnectionContext"


const ShowBalance = () => {
    const {connection,wallet} = useContext(WalletContext)
    const [balance,setBalance] = useState()
    useEffect(() => {
        connection.getBalance(wallet.publicKey).then((data) => {
            setBalance(data)
        }).catch((e) => {
            console.error(e)
        })
    },[])
    return (
        <div>
            {balance ? `You have ${balance} sol` : "Requesting..."}
        </div>
    )
}

export default ShowBalance