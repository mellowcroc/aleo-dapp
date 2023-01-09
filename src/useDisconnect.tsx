import { useCallback, useState } from "react";
import { AIP1193Wrapper, WrapperType } from "./aip1193";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

const useDisconnect = (wallet: AIP1193Wrapper) => {
  const disconnect = useCallback(async () => {
    try {
      await wallet.disconnect();
      console.log("wallet.publicKey: ", wallet.publicKey);
    } catch (err) {
      console.log(err);
    }
  }, [wallet]);

  return { disconnect };
};

export default useDisconnect;
