import React, { lazy, ReactElement, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import LoadingOrError from '../components/Utils/LoadingOrError';
import Footer from './Footer/Footer';
import NavbarHeader from './Header/NavBarHeader';
import ModalWallet from '../components/Modal';
import GlobalContext from '../contexts/GlobalContext';

const HomeView = lazy(() => import('./Home/HomeView'));
const OnBoardingView = lazy(() => import('./Dashboard/Dashboard'));
const NotificationView = lazy(() => import('./Notification/Notification'));
const NoMatchView = lazy(() => import('../components/Utils/NoMatchView'));

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12_000;
  return library;
}

export default function App(): ReactElement {
  return (
    <GlobalContext>
      <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
          <div className="flex flex-col h-screen">
            <Suspense fallback={<LoadingOrError />}>
              <ModalWallet />
              <NavbarHeader />
              <Switch>
                <Route exact path="/" component={HomeView} />
                <Route exact path="/dashboard" component={OnBoardingView} />
                <Route
                  exact
                  path="/notification"
                  component={NotificationView}
                />
                <Route component={NoMatchView} />
              </Switch>
            </Suspense>
            <Footer />
          </div>
        </BrowserRouter>
      </Web3ReactProvider>
    </GlobalContext>
  );
}
