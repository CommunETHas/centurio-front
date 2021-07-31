import React, { lazy, ReactElement, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoadingOrError from '../components/Utils/LoadingOrError';
import Footer from './Footer/Footer';
import NavbarHeader from './Header/NavBarHeader';
import ModalWallet from '../components/Modal/Modal';
import ModalAuthentication from '../components/Modal/ModalAuthentication';
import InterfaceContext from '../contexts/InterfaceContext';
import EthContext from '../contexts/EthContext';
import NoWeb3Modal from '../components/Modal/NoWeb3Modal';

const HomeView = lazy(() => import('./Home/HomeView'));
const OnBoardingView = lazy(() => import('./Dashboard/Dashboard'));
const DashboardPreview = lazy(() => import('./Dashboard/DashboardPreview'));
const NotificationView = lazy(() => import('./Notification/Notification'));
const NoMatchView = lazy(() => import('../components/Utils/NoMatchView'));
const PrivacyPolicy = lazy(() => import('./Footer/PrivacyPolicy'));
const AboutUs = lazy(() => import('./Footer/AboutUs'));

export function App(): ReactElement {
  return (
    <InterfaceContext>
      <EthContext>
        <BrowserRouter>
          <div className="flex flex-col h-screen">
            <Suspense fallback={<LoadingOrError />}>
              <ModalWallet />
              <ModalAuthentication />
              <NoWeb3Modal />
              <NavbarHeader />
              <Switch>
                <Route exact path="/" component={HomeView} />
                <Route
                  exact
                  path="/dashboard-preview"
                  component={DashboardPreview}
                />
                <Route exact path="/dashboard" component={OnBoardingView} />
                <Route
                  exact
                  path="/notification"
                  component={NotificationView}
                />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                <Route exact path="/about-us" component={AboutUs} />
                <Route component={NoMatchView} />
              </Switch>
              <Footer />
            </Suspense>
          </div>
        </BrowserRouter>
      </EthContext>
    </InterfaceContext>
  );
}

export default function () {
  return <App />;
}
