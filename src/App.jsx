import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
    WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './components/RequestAirdrop';
import { createContext } from 'react';
import ShowBalance from './components/ShowBalance';
import { Context } from './ConnectionContext';
import SendSolana from './components/SendSolana';


function App() {
  
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/UHKzjcPwEaqqlCPEIDfwgnmiJ2_XaTo5"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
                <WalletMultiButton />
                <WalletDisconnectButton />
                    <Context>
                        <RequestAirdrop/>
                        <SendSolana/>
                    </Context>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
);
}

export default App
