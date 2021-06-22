import React, { lazy, ReactElement, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoadingOrError from '../components/Utils/LoadingOrError';
import Footer from './Footer/Footer';
import NavbarHeader from './Header/NavBarHeader';

const OnBoardingView = lazy(() => import('./Dashboard/Dashboard'));
const HomeView = lazy(() => import('./Home/HomeView'));
const NoMatchView = lazy(() => import('../components/Utils/NoMatchView'));

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Suspense fallback={<LoadingOrError />}>
          <NavbarHeader />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/dashboard" component={OnBoardingView} />
            <Route component={NoMatchView} />
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
