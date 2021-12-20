import AppLayout from "components/layouts/AppLayout";
import DefaultLayout from "components/layouts/DefaultLayout";
import { Provider as AuthProvider } from "next-auth/client";
import { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.min.css";
import { store, StoreContext } from "stores/store";
import "styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

const POLLING_INTERVAL = 12000;

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider session={pageProps.session}>
      <StoreContext.Provider value={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <DefaultLayout>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </DefaultLayout>
        </Web3ReactProvider>
      </StoreContext.Provider>
    </AuthProvider>
  );
};

export default App;
