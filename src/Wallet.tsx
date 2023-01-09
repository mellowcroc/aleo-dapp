import React, { FC, useEffect, useMemo, useState } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletModal,
  WalletModalProvider,
} from "@demox-labs/aleo-wallet-adapter-reactui";
// import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { AIP1193Wrapper, WrapperType } from "./aip1193";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { RequestViewKey } from "./RequestViewKey";
import { SignMessage } from "./SignMessage";
import { DecryptMessage } from "./DecryptMessage";
import { WalletConnectButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import { SelectWallet } from "./SelectWallet";
import useConnect from "./useConnect";
import useDisconnect from "./useDisconnect";

// Default styles that can be overridden by your app
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

export const Wallet = () => {
  const wallet = useMemo(() => new AIP1193Wrapper(WrapperType.LeoWallet), []);

  const { connect, publicKey } = useConnect(wallet);
  const { disconnect } = useDisconnect(wallet);
  console.log("wallet: ", wallet);

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
