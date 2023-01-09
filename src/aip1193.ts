import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base/types";
import EventEmitter from "eventemitter3";

export const enum WrapperType {
  LeoWallet = "LeoWallet",
  AIP1193Wallet = "AIP1193Wallet",
}

export interface AIP1193Events {
  connect(publicKey: string): void;
  disconnect(): void;
}

export class AIP1193Wrapper extends EventEmitter<AIP1193Events> {
  private _leoWalletAdapter: LeoWalletAdapter | null;
  private _type: WrapperType;

  constructor(type: WrapperType) {
    super();
    this._type = type;
    if (type === WrapperType.LeoWallet) {
      this._leoWalletAdapter = new LeoWalletAdapter({
        appName: "New Leo Demo App",
      });
      this._leoWalletAdapter?.on("connect", (publicKey) => {
        console.log("connected: ", publicKey);
        this.emit("connect", publicKey);
      });
      this._leoWalletAdapter?.on("disconnect", () => {
        console.log("disconnected");
        this.emit("disconnect");
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
