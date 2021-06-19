import React, { lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingOrError from "./LoadingOrError";

const Home = lazy(() => import("./Home/HomeView"));

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
