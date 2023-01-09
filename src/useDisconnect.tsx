import { useCallback } from 'react';
import { LeoAIP1193Wrapper } from './aip1193';

const useDisconnect = (wallet: LeoAIP1193Wrapper) => {
  const disconnect = useCallback(async () => {
    try {
      await wallet.disconnect();
      console.log('wallet.publicKey: ', wallet.publicKey);
    } catch (err) {
      console.log(err);
    }
  }, [wallet]);

  return { disconnect };
};

export default useDisconnect;
