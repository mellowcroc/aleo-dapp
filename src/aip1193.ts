import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base/types";

export const enum WrapperType {
  LeoWallet = "NO_DECRYPT",
  UponRequest = "DECRYPT_UPON_REQUEST",
}

export class AIP1193Wrapper {
  private _leoWalletAdapter: LeoWalletAdapter | null;
  private _type: WrapperType;

  constructor(type: WrapperType) {
    this._type = type;
    if (type === WrapperType.LeoWallet) {
      this._leoWalletAdapter = new LeoWalletAdapter({
        appName: "New Leo Demo App",
      });
    } else {
      this._leoWalletAdapter = null;
    }
  }

  get publicKey() {
    if (this._type === WrapperType.LeoWallet) {
      return this._leoWalletAdapter?.publicKey;
    }
    return null;
  }

  async connect(
    decryptPermission: DecryptPermission,
    network: WalletAdapterNetwork
  ): Promise<void> {
    if (this._type === WrapperType.LeoWallet) {
      await this._leoWalletAdapter?.connect(decryptPermission, network);
    }
  }

  async disconnect(): Promise<void> {
    if (this._type === WrapperType.LeoWallet) {
      this._leoWalletAdapter?.disconnect();
    }
  }
}
