import { useCallback, useState } from 'react';
import { LeoAIP1193Wrapper } from './aip1193';

const useConnect = (wallet: LeoAIP1193Wrapper) => {
  const [publicKey, setPublicKey] = useState();

  const connect = useCallback(async () => {
    try {
      await wallet.connect();
      console.log('wallet.publicKey: ', wallet.publicKey);
      setPublicKey(publicKey);
    } catch (err) {
      console.log(err);
    }
  }, [wallet, publicKey]);

  return { connect, publicKey };
};

export default useConnect;
