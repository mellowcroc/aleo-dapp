import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import React, { FC, useCallback } from "react";
import { WalletModalButton } from "@demox-labs/aleo-wallet-adapter-reactui";

export const SelectWallet: FC = () => {
  const { publicKey, wallet } = useWallet();

  return !publicKey ? (
    <WalletModalButton>Select Wallet</WalletModalButton>
  ) : (
    <p>${publicKey}</p>
  );
};
