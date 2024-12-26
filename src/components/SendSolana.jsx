import { useContext, useState } from "react"
import { WalletContext } from "../ConnectionContext"
import { Transaction, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js'


const SendSolana = () => {
    const {wallet,connection} = useContext(WalletContext)
    const [address,setAddress] = useState()
    const [amount,setAmount] = useState()
    const [loading,setLoading] = useState(false)
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }
    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }
    const handleSendSolana = async () => {
        try {
            if(!amount || !address){
                return
            }
            setLoading(true)
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: address,
                    lamports : amount*LAMPORTS_PER_SOL
                })
            )
            const signature = await wallet.sendTransaction(transaction,connection)
             console.log(signature)
        } catch (error) {
            alert("Error in sending sol")
            console.error(error)
            
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <input placeholder="Receiver's Public Address" onChange={handleAddressChange}></input>
            <input placeholder="Enter the amount" onChange={handleAmountChange}></input>
            <button onClick={handleSendSolana}>Send Solana</button>
        </div>
    )
}

export default SendSolana