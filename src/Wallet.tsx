import { FC, useMemo } from 'react';
// import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import { LeoAIP1193Wrapper, WrapperType } from './aip1193';
import useConnect from './useConnect';

// Default styles that can be overridden by your app
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');

export const Wallet: FC = () => {
  const wallet = useMemo(
    () =>
      new LeoAIP1193Wrapper(
        WrapperType.LeoWallet,
        DecryptPermission.UponRequest,
        WalletAdapterNetwork.Localnet,
      ),
    [],
  );

  const { connect, publicKey } = useConnect(wallet);
  console.log('publicKey: ', publicKey);

  return publicKey ? (
    <p>Connected: ${publicKey}</p>
  ) : (
    <button onClick={connect}>Connect</button>
  );

  // <WalletProvider
  //   wallets={wallets}
  //   decryptPermission={DecryptPermission.UponRequest}
  //   network={WalletAdapterNetwork.Localnet}
  //   autoConnect
  // >
  //   <WalletModalProvider>
  //     <SelectWallet />
  //     <WalletConnectButton />
  //     <SignMessage />
  //     <DecryptMessage />
  //     <RequestViewKey />
  //   </WalletModalProvider>
  // </WalletProvider>
};
