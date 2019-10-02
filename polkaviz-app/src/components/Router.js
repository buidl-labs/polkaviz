import React from "react";
import ValidatorApp from "./alexander/validator_components/ValidatorApp";
import App from "./alexander/App";
import NominatorApp from "./alexander/nominator_components/NominatorApp";
import { Route, Switch, HashRouter } from "react-router-dom";
import { WsProvider, ApiPromise } from "@polkadot/api";
import MainWrapper from "./MainWrapper";
import KusamaApp from './kusama/KusamaApp'
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
      bottombarinfo: {
        eraLength: 0,
        eraProgress: 0,
        sessionLength: 0,
        sessionProgress: 0
      },
      totalValidators: 0,
      finalblock: 0,
      previousBlock: undefined,
      nominatorinfo: [],
      intentions:[],
      finalvalue:[],

      kuvalidators: [],
      kulastAuthor: "",
      kustart: null,
      kuisloading: true,
      kuvaltotalinfo: [],
      kubottombarinfo: {
        eraLength: 0,
        eraProgress: 0,
        sessionLength: 0,
        sessionProgress: 0
      },
      kutotalValidators: 0,
      kufinalblock: 0,
      kupreviousBlock: undefined,
      kuintentions: []
    };
    this.elapsed = 0;
    this.kuelapsed = 0;
    this.ismounted = true;
  }
  componentDidMount() {
    // console.log(this.props)
    
    this.createApi();
    this.createApi2();
    this.interval = setInterval(() => {
      // console.log(this.state.elapsed, this.props.counter);
      this.tick();
    }, 1000);
    this.kuinterval = setInterval(() => {
      // console.log(this.state.elapsed, this.props.counter);
      this.kutick();
    }, 1000);
  }
  tick() {
    // console.log("here " + this.props.start)
    this.elapsed = new Date() - this.state.start;
    // console.log('elapsed'+ this.elapsed)
    if (this.state.previousBlock !== undefined && this.elapsed > 3000) {
      this.setState({ previousBlock: undefined });
    }
  }

  kutick() {
    // console.log("here " + this.props.start)
    this.kuelapsed = new Date() - this.state.kustart;
    // console.log('elapsed'+ this.elapsed)
    if (this.state.kupreviousBlock !== undefined && this.kuelapsed > 3000) {
      this.setState({ kupreviousBlock: undefined });
    }
  }

  async createApi2() {


  let provider = new WsProvider("wss://kusama-rpc.polkadot.io");
  const apinew = await ApiPromise.create({ provider });
  
  // const intentions = await apinew.query.staking.validators()
  // console.log(JSON.parse(JSON.stringify(intentions)))
  
  // this.setState({
  //   intentions: JSON.parse(JSON.stringify(intentions))
  // })

    await apinew.derive.chain.subscribeNewHeads(block => {
      // console.log(`block #${block.author}`);
      const lastAuthor = block.author.toString();
      if (this.ismounted) {
        this.setState({ kulastAuthor: lastAuthor});
      }
      const start = new Date();
      const blockNumber = block.number.toString();
      if (this.ismounted) {
        this.setState({
          kustart: start,
          kufinalblock: blockNumber,
          kupreviousBlock: blockNumber
        });
      }
    });

    await apinew.query.session.validators(validators => {
      // console.log(validators)
      const sessionValidators = validators.map(x => x.toString());
      // console.log(sessionValidators)
      if (this.ismounted) {
        this.setState({
          kuvalidators: sessionValidators
        });
      }
    });


    let totalValidators = await apinew.query.staking.validatorCount();
    // console.log("this", totalValidators.words["0"], totalValidators);
    if (this.ismounted) {
      this.setState({
        kutotalValidators: totalValidators.words["0"]
      });
    }

    const start = async () => {
      let arr1 = [];
      // console.log(JSON.stringify(valinfo))
      const validatorstotalinfo = await Promise.all(
        this.state.kuvalidators.map(val => apinew.derive.staking.info(val))
      );

      arr1 = JSON.parse(JSON.stringify(validatorstotalinfo)).map(info => {
        // console.log(info);
        return {
          valname: info.accountId,
          valinfo: info
        };
      });

      // const infyui = await apinew.query.session.intentions(val => {
      //   console.log(JSON.stringify(val))
      // })
      // console.log(JSON.stringify(infyui))

      if (this.ismounted) {
        // console.log("arr1",arr1)
        this.setState(
          {
            kuvaltotalinfo: arr1,
            kuisloading: false
          }
          // () => this.getnominators2()
        );
      }
    };

    start();

    // console.log(intentions.toJSON())
    await apinew.derive.session.info(header => {
      // console.log(`eraLength #${header.eraLength}`);
      // console.log(`eraProgress #${header.eraProgress}`);
      // console.log(`sessionLength #${header.sessionLength}`);
      // console.log(`sessionProgress #${header.sessionProgress}`);
      const eraLength = header.eraLength.toString();
      const eraProgress = header.eraProgress.toString();
      const sessionLength = header.sessionLength.toString();
      const sessionProgress = header.sessionProgress.toString();
      // console.log(eraLength,eraProgress,sessionLength,sessionProgress)
      if (this.ismounted) {
        this.setState({
          kubottombarinfo: {
            eraLength: eraLength,
            eraProgress: eraProgress,
            sessionLength: sessionLength,
            sessionProgress: sessionProgress
          }
        },
        // () => this.createApi()
        );
      }
    });

  }

  // getnominators2 = async () => {
  //   let arr = [];
  //   // console.log("valtotal", this.state.valtotalinfo);
  //   this.state.kuvaltotalinfo.forEach(ele => {
  //     console.log(ele);
  //     ele.valinfo.stakers.others.forEach(nom => {
  //       arr.push(nom.who);
  //     });
  //   });

  //   // console.log("here are unfiltered", arr);
  //   function onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  //   }

  //   let nominators = arr.filter(onlyUnique);
  //   // console.log("total", nominators);

  //   const nominatorstotalinfo = await Promise.all(
  //     nominators.map(val => this.state.apipromise.derive.staking.info(val))
  //   );

  //   let arr2 = JSON.parse(JSON.stringify(nominatorstotalinfo));
  //   this.setState({
  //     kunominatorinfo: arr2
  //   });
  // };

  async createApi() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create({ provider });
    // console.log(api.derive.chain.subscribeNewHeads())
    await api.derive.chain.subscribeNewHeads(block => {
      // console.log(`block #${block.author}`);
      const lastAuthor = block.author.toString();
      if (this.ismounted) {
        this.setState({ lastAuthor: lastAuthor });
      }
      const start = new Date();
      const blockNumber = block.number.toString();
      if (this.ismounted) {
        this.setState({
          start: start,
          finalblock: blockNumber,
          previousBlock: blockNumber
        });
      }
    });

    await api.query.session.validators(validators => {
      // console.log(validators)
      const sessionValidators = validators.map(x => x.toString());
      // console.log(sessionValidators)
      if (this.ismounted) {
        this.setState({
          validators: sessionValidators
        });
      }
    });


    let totalValidators = await api.query.staking.validatorCount();
    // console.log("this", totalValidators.words["0"], totalValidators);
    if (this.ismounted) {
      this.setState({
        totalValidators: totalValidators.words["0"]
      });
    }

    const start = async () => {
      let arr1 = [];
      // console.log(JSON.stringify(valinfo))
      const validatorstotalinfo = await Promise.all(
        this.state.validators.map(val => api.derive.staking.info(val))
      );
      arr1 = JSON.parse(JSON.stringify(validatorstotalinfo)).map(info => {
        // console.log(info)
        return {
          valname: info.accountId,
          valinfo: info
        };
      });




const intentions = await api.query.staking.validators()
console.log(JSON.parse(JSON.stringify(intentions)))
const allvals = JSON.parse(JSON.stringify(intentions))[0]
console.log(allvals)
// allvals.forEach(ele => {
//   this.state.validators.forEach(val => {
    
//   })
// })
const arr2 = arr1.map(ele => ele.valname)
console.log(this.state.validators)
const arr3 = allvals.filter(e => !arr2.includes(e))
console.log(arr3)
const intentionstotalinfo = await Promise.all(
  arr3.map(val => api.derive.staking.info(val))
);
const arr4 = JSON.parse(JSON.stringify(intentionstotalinfo)).map(info => {
  return {
    valname: info.accountId,
    valinfo: info
  };
});
// let arr5 = this.state.validators.push(arr4);
let arr5 = [...arr1,...arr4]
console.log(arr4,arr5)
// this.setState({
//   finalvalue:arr5
// })
// const ans = await api.derive.staking.info("DdFp1EWazfocKdYuCinGyNCPAQRYr6LDkwURG7k9vQg51WS")
// console.log(JSON.parse(JSON.stringify(ans)))


      if (this.ismounted) {
        // console.log("arr1",arr1)
        this.setState(
          {
            finalvalue:arr5,
            valtotalinfo: arr1,
            intentions: arr3,
            isloading: false
          },
          () => getnominators()
        );
      }
    };

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

    const getnominators = async () => {
      let arr = [];
      // console.log("valtotal", this.state.valtotalinfo);
      this.state.valtotalinfo.forEach(ele => {
        // console.log(ele);
        ele.valinfo.stakers.others.forEach(nom => {
          arr.push(nom.who);
        });
      });
  
      // console.log("here are unfiltered", arr);
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
  
      let nominators = arr.filter(onlyUnique);
      // console.log("total", nominators);
  
      const nominatorstotalinfo = await Promise.all(
        nominators.map(val => api.derive.staking.info(val))
      );
  
      let arr2 = JSON.parse(JSON.stringify(nominatorstotalinfo));
      if(this.ismounted){
      this.setState({
        nominatorinfo: arr2
      });
    }
      // console.log(arr2)
    };

  }

  

  componentWillUnmount() {
    this.ismounted = false;
    clearInterval(this.interval);
  }

  render() {
    
    // console.count("hi")
    let loadingdone = false
    if(!this.state.isloading && !this.state.kuisloading){
      loadingdone = true
    }
    // console.table(this.state.isloading,this.state.kuisloading,loadingdone)
    let bottombarobject = {
      bottombarinfo: this.state.bottombarinfo,
      finalblock: this.state.finalblock,
      validatorcount: this.state.totalValidators
    };
    let bottombarobject2 = {
      bottombarinfo: this.state.kubottombarinfo,
      finalblock: this.state.kufinalblock,
      validatorcount: this.state.kutotalValidators
    };
    return !loadingdone ? (
      <React.Fragment>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        {/* <div className="lds-text">Waiting for API to be connected.....</div> */}
      </React.Fragment>
    ) : (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <MainWrapper
                valtotalinfo={this.state.valtotalinfo}
                // createApi={this.createApi}
                validators={this.state.validators}
                start={this.state.start}
                lastAuthor={this.state.lastAuthor}
                validatorcount={this.state.totalValidators}
                bottombarobject={bottombarobject}
                nominatorinfo={this.state.nominatorinfo}
                previousBlock={this.state.previousBlock}
                kuvaltotalinfo={this.state.kuvaltotalinfo}
                kucreateApi={this.createApi2}
                kuvalidators={this.state.kuvalidators}
                kustart={this.state.kustart}
                kulastAuthor={this.state.kulastAuthor}
                kuvalidatorcount={this.state.kutotalValidators}
                kubottombarobject={bottombarobject2}
                kunominatorinfo={this.state.kunominatorinfo}
                kupreviousBlock={this.state.kupreviousBlock}
              />
            )}
          />
          <Route
            exact
            path="/alexander"
            render={props => (
              <App
                valtotalinfo={this.state.valtotalinfo}
                createApi={this.createApi}
                validators={this.state.validators}
                start={this.state.start}
                lastAuthor={this.state.lastAuthor}
                validatorcount={this.state.totalValidators}
                bottombarobject={bottombarobject}
                nominatorinfo={this.state.nominatorinfo}
                previousBlock={this.state.previousBlock}
                intentions={this.state.intentions}
                finalvalue={this.state.finalvalue}
              />
            )}
          />
          <Route
            exact
            path="/kusama"
            render={props => (
              <KusamaApp
                valtotalinfo={this.state.kuvaltotalinfo}
                createApi={this.createApi2}
                validators={this.state.kuvalidators}
                start={this.state.kustart}
                lastAuthor={this.state.kulastAuthor}
                validatorcount={this.state.kutotalValidators}
                bottombarobject={bottombarobject2}
                nominatorinfo={this.state.kunominatorinfo}
                previousBlock={this.state.kupreviousBlock}
              />
            )}
          />
          <Route
            exact
            path="/alexander/validator/:validatorAddress"
            render={props => (
              <ValidatorApp valtotalinfo={this.state.valtotalinfo} />
            )}
          />
          <Route
            exact
            path="/alexander/nominator/:nominatorAddress"
            render={props => (
              <NominatorApp
                valtotalinfo={this.state.valtotalinfo}
                nominatorinfo={this.state.nominatorinfo}
              />
            )}
          />
        </Switch>
      </HashRouter>
    );
  }
}
export default Router;
