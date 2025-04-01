import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { useEffect, useState } from 'react';
import ControllerConnector from '@cartridge/connector/controller';

export function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const controller = connectors[0] as ControllerConnector;
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (!address) return;
    controller.username()?.then((n) => setUsername(n));
  }, [address, controller]);

  return (
    <div style={{ padding: '20px' }}>
      {address ? (
        <div style={{ marginBottom: '10px' }}>
          <p>Account: {address.slice(0, 6)}...{address.slice(-4)}</p>
          {username && <p>Username: {username}</p>}
          <button
            onClick={() => disconnect()}
            style={{ padding: '8px 16px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => connect({ connector: controller })}
          style={{ padding: '8px 16px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}