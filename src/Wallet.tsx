import React, { FC, useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletModal,
  WalletModalProvider,
} from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { RequestViewKey } from "./RequestViewKey";
import { SignMessage } from "./SignMessage";
import { DecryptMessage } from "./DecryptMessage";
import { WalletConnectButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import { SelectWallet } from "./SelectWallet";

// Default styles that can be overridden by your app
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

export const Wallet: FC = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Localnet}
      autoConnect
    >
      <WalletModalProvider>
        <SelectWallet />
        <WalletConnectButton />
        <SignMessage />
        <DecryptMessage />
        <RequestViewKey />
      </WalletModalProvider>
    </WalletProvider>
  );
};
