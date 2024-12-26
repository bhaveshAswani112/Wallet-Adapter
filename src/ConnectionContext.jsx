import React, { createContext } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

const WalletContext = createContext();

function Context({ children }) {
    const wallet = useWallet();
    const { connection } = useConnection();

    return (
        <WalletContext.Provider value={{ wallet, connection }}>
            {children}
        </WalletContext.Provider>
    );
}

export { Context, WalletContext };
