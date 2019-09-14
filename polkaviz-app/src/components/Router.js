import React from "react";
import ValidatorApp from "./validator_components/ValidatorApp";
import App from "./App";
import NominatorApp from './nominator_components/NominatorApp'
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Router() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/val/:validatorAddress" component={ValidatorApp} />
          <Route exact path="/nom/:nominatorAddress" component={NominatorApp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
