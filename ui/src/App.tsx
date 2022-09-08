import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { ConnectedWeb3 } from "contexts";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "routes";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectedWeb3>
        {
          // @ts-ignore
          <BrowserRouter>{renderRoutes()}</BrowserRouter>
        }
      </ConnectedWeb3>
    </Web3ReactProvider>
  );
}

export default App;
