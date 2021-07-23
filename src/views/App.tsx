import React, {
  lazy,
  useEffect,
  useState,
  ReactElement,
  Suspense,
} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import LoadingOrError from '../components/Utils/LoadingOrError';
import Footer from './Footer/Footer';
import NavbarHeader from './Header/NavBarHeader';
import ModalWallet from '../components/Modal/Modal';
import ModalAuthentication from '../components/Modal/ModalAuthentication';
import GlobalContext from '../contexts/GlobalContext';
import { useEagerConnect, useInactiveListener } from '../hooks';

const HomeView = lazy(() => import('./Home/HomeView'));
const OnBoardingView = lazy(() => import('./Dashboard/Dashboard'));
const DashboardPreview = lazy(() => import('./Dashboard/DashboardPreview'));
const NotificationView = lazy(() => import('./Notification/Notification'));
const NoMatchView = lazy(() => import('../components/Utils/NoMatchView'));
const PrivacyPolicy = lazy(() => import('./Footer/PrivacyPolicy'));
const AboutUs = lazy(() => import('./Footer/AboutUs'));

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

export function App(): ReactElement {
  const { connector } = useWeb3React<Web3Provider>();
  const [activatingConnector, setActivatingConnector] = useState<any>({});

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector({});
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <GlobalContext>
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Suspense fallback={<LoadingOrError />}>
            <ModalWallet />
            <ModalAuthentication />
            <NavbarHeader />
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route
                exact
                path="/dashboard-preview"
                component={DashboardPreview}
              />
              <Route exact path="/dashboard" component={OnBoardingView} />
              <Route exact path="/notification" component={NotificationView} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/about-us" component={AboutUs} />
              <Route component={NoMatchView} />
            </Switch>
            <Footer />
          </Suspense>
        </div>
      </BrowserRouter>
    </GlobalContext>
  );
}

export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
