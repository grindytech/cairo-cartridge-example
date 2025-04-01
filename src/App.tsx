import { StarknetProvider } from './providers/StarknetProvider';
import { ConnectWallet } from './components/ConnectWallet';
import { SignTransaction } from './components/SignTransaction';

function App() {
  return (
    <StarknetProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Cartridge Controller Demo</h1>
        <ConnectWallet />
        <SignTransaction />
      </div>
    </StarknetProvider>
  );
}

export default App;