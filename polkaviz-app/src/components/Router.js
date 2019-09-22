import React from "react";
import ValidatorApp from "./validator_components/ValidatorApp";
import App from "./App";
import NominatorApp from "./nominator_components/NominatorApp";
import { Route, Switch, HashRouter } from "react-router-dom";
import { WsProvider, ApiPromise } from "@polkadot/api";

class Router extends React.Component {
  constructor() {
    super();
    this.latestBlockAuthor = undefined;
    this.state = {
      validators: [],
      lastAuthor: "",
      start: null,
      isloading: true,
      valtotalinfo: [],
      apipromise: "",
      bottombarinfo: {
        eraLength: 0,
        eraProgress: 0,
        sessionLength: 0,
        sessionProgress: 0
      },
      totalValidators: 0,
      finalblock: 0,
      previousBlock: undefined,
      nominatorinfo:[],
    };
    this.elapsed = 0;
    this.ismounted = true;
  }
  componentDidMount() {
    // console.log(this.props)
    this.createApi();
    this.interval = setInterval(() => {
      // console.log(this.state.elapsed, this.props.counter);
      this.tick()
    }, 1000);
  }
  tick() {
    // console.log("here " + this.props.start)
    this.elapsed = new Date() - this.state.start
    console.log('elapsed'+ this.elapsed)
    if (this.state.previousBlock !== undefined && this.elapsed > 3000 ) {
      this.setState({previousBlock: undefined})
    }
  }
  async createApi() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create(provider);
    await api.derive.chain.subscribeNewHead(block => {
      // console.log(`block #${block.author}`);
      const lastAuthor = block.author.toString();
      if (this.ismounted) {
        this.setState({ lastAuthor: lastAuthor, apipromise: api });
      }
      const start = new Date();
      const blockNumber = block.number.toString();
      if (this.ismounted) {
        this.setState({ start: start, finalblock: blockNumber, previousBlock: blockNumber });
      }
    });

    await api.query.session.validators(validators => {
      const sessionValidators = validators.map(x => x.toString());
      if (this.ismounted) {
        this.setState({
          validators: sessionValidators
        });
      }
    });

    // async function asyncForEach(array, callback) {
    //   for (let index = 0; index < array.length; index++) {
    //     await callback(array[index], index, array);
    //   }
    // }
    // const start = async () => {
    //   let arr1 =[]
    //   let count =0
    //   await asyncForEach(this.state.validators, async (val) => {
    //     console.log(val,count++)
    //     let stakers = await api.derive.staking.info(val)
    //     let stakeinfo = JSON.parse(stakers)
    //     // console.log(stakeinfo.stakers.others)
    //     arr1.push({
    //       valname:val,
    //       valinfo:stakeinfo
    //       })
    //   });

    let totalValidators = await api.query.staking.validatorCount();
    console.log("this", totalValidators.words["0"], totalValidators);
    if (this.ismounted) {
      this.setState({
        totalValidators: totalValidators.words["0"]
      });
    }

    const start = async () => {
      let arr1 = [];

      const validatorstotalinfo = await Promise.all(
        this.state.validators.map(val => api.derive.staking.info(val))
      );
      console.log("hi", JSON.parse(validatorstotalinfo[0]));
      arr1 = validatorstotalinfo.map(info => {
        return {
          valname: info.accountId,
          valinfo: JSON.parse(info)
        };
      });

      // this.state.validators.map(async (val) => {
      //   console.log(val,count++)
      //   // let stakers = await api.derive.staking.info(val)
      //   // let stakeinfo = JSON.parse(stakers)
      //   // // console.log(stakeinfo.stakers.others)

      //   // arr1.push({
      //   //   valname:val,
      //   //   valinfo:stakeinfo
      //   //   })
      // })
      if (this.ismounted) {
        console.log("arr1",arr1)
        this.setState(
          {
            valtotalinfo: arr1,
            isloading: false
          },() => this.getnominators()
        );
      }
    };

    //   console.log('Done');
    //   console.log(arr1)
    //   if(this.ismounted){
    //   this.setState({
    //     valtotalinfo:arr1,
    //     isloading: false
    //   })
    // }}
    start();

    await api.derive.session.info(header => {
      // console.log(`eraLength #${header.eraLength}`);
      // console.log(`eraProgress #${header.eraProgress}`);
      // console.log(`sessionLength #${header.sessionLength}`);
      // console.log(`sessionProgress #${header.sessionProgress}`);
      const eraLength = header.eraLength.toString();
      const eraProgress = header.eraProgress.toString();
      const sessionLength = header.sessionLength.toString();
      const sessionProgress = header.sessionProgress.toString();
      if (this.ismounted) {
        this.setState({
          bottombarinfo: {
            eraLength: eraLength,
            eraProgress: eraProgress,
            sessionLength: sessionLength,
            sessionProgress: sessionProgress
          }
        });
      }
    });

    // await api.derive.chain.bestNumberFinalized(header => {
    //   // console.log(`Chain is at block: #${header}`);
    //   if (this.ismounted) {
    //     this.setState({ finalblock: header.toString() });
    //   }
    // });
  }

  getnominators = async () => {
    let arr = [];
    console.log("valtotal", this.state.valtotalinfo);
    this.state.valtotalinfo.forEach(ele => {
      console.log(ele);
      ele.valinfo.stakers.others.forEach(nom => {
        arr.push(nom.who);
      });
    });

    console.log("here are unfiltered", arr);
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    let nominators = arr.filter(onlyUnique);
    console.log("total", nominators);

    const nominatorstotalinfo = await Promise.all(
      nominators.map(val => this.state.apipromise.derive.staking.info(val))
    );

    // let nominatorinfo = nominators.map(async nom => {
    //   let nominfo = await this.state.apipromise.derive.staking.info(nom)
    //   console.log(nominfo)
    //   return(JSON.parse(nominfo))
    // })
    console.log("nominfo",nominatorstotalinfo)
    let arr2 = nominatorstotalinfo.map(nom => JSON.parse(nom))
    this.setState({
      nominatorinfo:arr2
    })

  };



  componentWillUnmount() {
    this.ismounted = false;
    clearInterval(this.interval);
  }

  render() {
    console.log("route", this.state.bottombarinfo);
    console.log("nom",this.state.nominatorinfo)
    let bottombarobject = {
      bottombarinfo: this.state.bottombarinfo,
      finalblock: this.state.finalblock,
      validatorcount: this.state.totalValidators
    };
    return this.state.isloading ? (
      <React.Fragment>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <div className="lds-text">Waiting for API to be connected.....</div>
      </React.Fragment>
    ) : (
      <div className="container">
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={props => (
                <App
                  valtotalinfo={this.state.valtotalinfo}
                  createApi={this.createApi}
                  validators={this.state.validators}
                  start={this.state.start}
                  lastAuthor={this.state.lastAuthor}
                  api={this.state.apipromise}
                  validatorcount={this.state.totalValidators}
                  bottombarobject={bottombarobject}
                  nominatorinfo={this.state.nominatorinfo}
                  previousBlock={this.state.previousBlock}
                />
              )}
            />
            <Route
              exact
              path="/val/:validatorAddress"
              component={props => (
                <ValidatorApp valtotalinfo={this.state.valtotalinfo} valiiinfo={0+1+2+3+4}/>
              )}
            />
            <Route
              exact
              path="/nom/:nominatorAddress"
              component={props => (
                <NominatorApp
                  valtotalinfo={this.state.valtotalinfo}
                  api={this.state.apipromise}
                  nominatorinfo={this.state.nominatorinfo}
                />
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
export default Router;
