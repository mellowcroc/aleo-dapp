import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import React, { FC, useCallback } from "react";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";

export const RequestViewKey: FC = () => {
  const { wallet, publicKey } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const viewKey = await (
      wallet?.adapter as LeoWalletAdapter
    ).requestViewKey();
    alert("View key: " + viewKey);
  }, [wallet, publicKey]);

  return (
    <WalletMultiButton onClick={onClick} disabled={!publicKey}>
      Request view Key
    </WalletMultiButton>
  );
};
