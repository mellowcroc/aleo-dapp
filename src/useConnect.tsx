import { useCallback, useState } from "react";
import { AIP1193Wrapper, WrapperType } from "./aip1193";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

const useConnect = (wallet: AIP1193Wrapper) => {
  const [publicKey, setPublicKey] = useState("");

  const connect = useCallback(async () => {
    try {
      await wallet.connect(
        DecryptPermission.UponRequest,
        WalletAdapterNetwork.Localnet
      );
      console.log("wallet.publicKey: ", wallet.publicKey);
      if (wallet.publicKey) {
        setPublicKey(wallet.publicKey);
      }
    } catch (err) {
      console.log(err);
    }
  }, [wallet]);

  return { connect, publicKey };
};

export default useConnect;
