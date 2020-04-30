// Emergency fix for alexander deprecation
import React from 'react';
import App from './alexander/App';
import { Route, Switch, HashRouter } from 'react-router-dom';
// import { WsProvider, ApiPromise } from "@polkadot/api";
import MainWrapper from './Homeview/HomeMainWrapper';
import KusamaApp from './kusama/KusamaApp';
// import {NavLink} from "react-router-dom"

class Router extends React.Component {
  componentWillUnmount() {
    this.ismounted = false;
    clearInterval(this.interval);
  }

  render() {
    let pathArray = window.location.href.split('/');
    console.log(pathArray);
    return (
      <React.Fragment>
        <HashRouter>
          <div id="main">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <MainWrapper
                  />
                )}
              />
              <Route
                path="/westend"
                render={props => (
                  <App
                  />
                )}
              />
              <Route
                exact
                path="/kusama"
                render={props => (
                  <KusamaApp
                  />
                )}
              />
              {/* <Route
                exact
                path="/alexander/validator/:validatorAddress"
                render={props => (
                  <ValidatorApp
                    valtotalinfo={this.state.valtotalinfo}
                    intentions={this.state.intentions}
                    validatorsandintentions={this.state.validatorsandintentions}
                    validatorandintentionloading={this.state.validatorandintentionloading}
                  />
                )}
              />
              <Route
                exact
                path="/alexander/nominator/:nominatorAddress"
                render={props => (
                  <NominatorApp
                    valtotalinfo={this.state.valtotalinfo}
                    nominatorinfo={this.state.nominatorinfo}
                    intentions={this.state.intentions}
                    validatorsandintentions={this.state.validatorsandintentions}
                    validatorandintentionloading={this.state.validatorandintentionloading}
                  />
                )}
              /> */}
            </Switch>
          </div>
        </HashRouter>
      </React.Fragment>
    );
  }
}
export default Router;
