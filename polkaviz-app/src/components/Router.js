import React from "react";
import ValidatorApp from "./validator_components/ValidatorApp";
import App from "./App";
import NominatorApp from './nominator_components/NominatorApp'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WsProvider, ApiPromise } from "@polkadot/api";


class Router extends React.Component {
  constructor() {
    super();
    this.latestBlockAuthor = undefined;
    this.state = {
      validators: [],
      lastAuthor: "",
      start: null,
      isloading:true,
      valtotalinfo:[]
    };
    this.ismounted = true
  }
  componentDidMount() {
    // console.log(this.props)
    this.createApi();
  }
  async createApi() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create(provider);
    await api.derive.chain.subscribeNewHead(block => {
      // console.log(`block #${block.author}`);
      const lastAuthor = block.author.toString();
      if(this.ismounted){
      this.setState({ lastAuthor });
      }
      const start = new Date();
      if(this.ismounted){
      this.setState({ start: start });
      }
    });

    await api.query.session.validators(validators => {
      const sessionValidators = validators.map(x => x.toString());
      if(this.ismounted){
      this.setState({ 
        validators: sessionValidators       
       });
      }
    });

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
    const start = async () => {
      let arr1 =[]
      let count =0
      await asyncForEach(this.state.validators, async (val) => {
        console.log(val,count++)
        let stakers = await api.derive.staking.info(val)
        let stakeinfo = JSON.parse(stakers)
        // console.log(stakeinfo.stakers.others)
        arr1.push({
          valname:val,
          valinfo:stakeinfo
          })
      });
      console.log('Done');
      console.log(arr1)
      if(this.ismounted){
      this.setState({
        valtotalinfo:arr1,
        isloading: false
      })
    }}
    start();  
  }
  componentWillUnmount(){
    this.ismounted=false
  }

render(){
  return (
    this.state.isloading ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div><div className="lds-text">Waiting for API to be connected.....</div></React.Fragment>) : 
      (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={props => 
              <App valtotalinfo={this.state.valtotalinfo} createApi={this.createApi} validators={this.state.validators} start={this.state.start} lastAuthor={this.state.lastAuthor}/>} />
          <Route exact path="/val/:validatorAddress" component={props => <ValidatorApp valtotalinfo={this.state.valtotalinfo}/>} />
          <Route exact path="/nom/:nominatorAddress" component={props => <NominatorApp valtotalinfo={this.state.valtotalinfo} />} />
        </Switch>
      </BrowserRouter>
    </div>
      )
  );
}
}
export default Router;
