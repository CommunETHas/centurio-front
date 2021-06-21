import React, { lazy, ReactElement, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import LoadingOrError from '../components/Utils/LoadingOrError';

const OnBoardingView = lazy(() => import('./OnBoarding/OnBoardingView'));
const HomeView = lazy(() => import('./Home/HomeView'));
const NoMatchView = lazy(() => import('../components/Utils/NoMatchView'));

export default function App(): ReactElement {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Switch>
          <Route exact path="/" component={OnBoardingView} />
          <Route exact path="/home" component={HomeView} />
          <Route path="*" component={NoMatchView} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
