import {
  DecryptPermission,
  WalletAdapterNetwork
} from "@demox-labs/aleo-wallet-adapter-base/types";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import SafeEventEmitter from "@metamask/safe-event-emitter";

export const enum WrapperType {
  LeoWallet = "NO_DECRYPT",
  UponRequest = "DECRYPT_UPON_REQUEST",
}

export const enum RPCErrorCode {
  UserRejectedRequest = 4001,
  Unauthorized = 4100,
  UnsupportedMethod = 4200,
  Disconnected = 4900,
  ChainDisconnected = 4901,
}

export interface SimpleEventEmitter {
  // add listener
  on(event: string, listener: any): void;
  // add one-time listener
  once(event: string, listener: any): void;
  // remove listener
  removeListener(event: string, listener: any): void;
  // removeListener alias
  off(event: string, listener: any): void;
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface ProviderMessage {
  type: string;
  data: unknown;
}

export interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export interface AIP1193 extends SimpleEventEmitter {
  publicKey: string;
  connect(): Promise<void>
  disconnect(): Promise<void>
}

export class LeoAIP1193Wrapper extends SafeEventEmitter implements AIP1193 {
  private _leoWalletAdapter: LeoWalletAdapter | null;
  private _type: WrapperType;
  private _decryptPermission: DecryptPermission;
  private _network: WalletAdapterNetwork;

  constructor(type: WrapperType,
    decryptPermission: DecryptPermission,
    network: WalletAdapterNetwork
  ) {
    super();
    this._type = type;
    this._decryptPermission = decryptPermission;
    this._network = network;
    if (type === WrapperType.LeoWallet) {
      this._leoWalletAdapter = new LeoWalletAdapter({
        appName: "New Leo Demo App",
      });
    } else {
      this._leoWalletAdapter = null;
    }
  }
  request(args: RequestArguments) {
  }

  get publicKey() {
    if (this._type === WrapperType.LeoWallet) {
      return this._leoWalletAdapter?.publicKey || '';
    }
    return '';
  }

  async connect(): Promise<void> {
    if (this._type === WrapperType.LeoWallet) {
      try {
        await this._leoWalletAdapter?.connect(this._decryptPermission, this._network);
        this.emit("connect", { publicKey: this._leoWalletAdapter?.publicKey });
      } catch (e: any) {
        this.emit("disconnect", {
          message: `Unable to connect: ${e}`,
          code: RPCErrorCode.Disconnected,
          data: { },
        })
      }
    }
  }

  async disconnect(): Promise<void> {
    if (this._type === WrapperType.LeoWallet) {
      this._leoWalletAdapter?.disconnect();
      this.emit("disconnect", {
        message: `Successfully disconnected`,
        code: RPCErrorCode.Disconnected,
        data: { },
      })
    }
  }
}
