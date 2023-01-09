import { useMemo } from 'react';
// import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import { LeoAIP1193Wrapper, WrapperType } from './aip1193';
import useConnect from './useConnect';
import useDisconnect from './useDisconnect';

// Default styles that can be overridden by your app
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');

export const Wallet = () => {
  const wallet = useMemo(
    () =>
      new LeoAIP1193Wrapper(
        WrapperType.LeoWallet,
        DecryptPermission.UponRequest,
        WalletAdapterNetwork.Localnet,
      ),
    [],
  );
  wallet.on('connect', (publicKey) => {
    console.log('external listener connect: ', publicKey);
  });
  wallet.on('disconnect', () => {
    console.log('external listener disconnect');
  });

  const { connect, publicKey } = useConnect(wallet);
  const { disconnect } = useDisconnect(wallet);
  console.log('wallet: ', wallet);

  return wallet.publicKey ? (
    <p>
      Connected: ${wallet.publicKey}
      <button onClick={disconnect}>Disconnect</button>
    </p>
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
