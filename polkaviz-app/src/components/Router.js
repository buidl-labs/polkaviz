import React from 'react';
import App from './alexander/App';
import { Route, Switch, HashRouter } from 'react-router-dom';
// import { WsProvider, ApiPromise } from "@polkadot/api";
import MainWrapper from './MainWrapper';
import KusamaApp from './kusama/KusamaApp';
// import {NavLink} from "react-router-dom"

class Router extends React.Component {
  // constructor() {
  //   super();
  //   this.latestBlockAuthor = undefined;
  //   this.state = {
  //     validators: [],
  //     lastAuthor: "",
  //     start: null,
  //     isloading: true,
  //     valtotalinfo: [],
  //     bottombarinfo: {
  //       eraLength: 0,
  //       eraProgress: 0,
  //       sessionLength: 0,
  //       sessionProgress: 0
  //     },
  //     totalValidators: 0,
  //     finalblock: 0,
  //     previousBlock: undefined,
  //     nominatorinfo: [],
  //     intentions: [],
  //     validatorsandintentions: [],
  //     validatorandintentionloading: true,

  //     kusamavalidators: [],
  //     kusamalastAuthor: "",
  //     kusamastart: null,
  //     kusamaisloading: true,
  //     kusamavaltotalinfo: [],
  //     kusamabottombarinfo: {
  //       eraLength: 0,
  //       eraProgress: 0,
  //       sessionLength: 0,
  //       sessionProgress: 0
  //     },
  //     kusamatotalValidators: 0,
  //     kusamafinalblock: 0,
  //     kusamapreviousBlock: undefined,
  //     kusamaintentions: []
  //   };
  //   this.elapsed = 0;
  //   this.kusamaelapsed = 0;
  //   this.ismounted = true;
  // }
  // componentDidMount() {
  //   // console.log(this.props)

  // this.createApi();
  // this.createApi2();
  // this.interval = setInterval(() => {
  //   // console.log(this.state.elapsed, this.props.counter);
  //   this.tick();
  // }, 1000);
  // this.kusamainterval = setInterval(() => {
  //   // console.log(this.state.elapsed, this.props.counter);
  //   this.kusamatick();
  // }, 1000);
  // }
  // tick() {
  //   // console.log("here " + this.props.start)
  //   this.elapsed = new Date() - this.state.start;
  //   // console.log('elapsed'+ this.elapsed)
  //   if (this.state.previousBlock !== undefined && this.elapsed > 3000) {
  //     this.setState({ previousBlock: undefined });
  //   }
  // }

  // kusamatick() {
  //   // console.log("here " + this.props.start)
  //   this.kusamaelapsed = new Date() - this.state.kusamastart;
  //   // console.log('elapsed'+ this.elapsed)
  //   if (
  //     this.state.kusamapreviousBlock !== undefined &&
  //     this.kusamaelapsed > 3000
  //   ) {
  //     this.setState({ kusamapreviousBlock: undefined });
  //   }
  // }

  // async createApi2() {
  //   let provider = new WsProvider("wss://kusama-rpc.polkadot.io");
  //   const apinew = await ApiPromise.create({ provider });

  //   // const intentions = await apinew.query.staking.validators()
  //   // console.log(JSON.parse(JSON.stringify(intentions)))

  //   // this.setState({
  //   //   intentions: JSON.parse(JSON.stringify(intentions))
  //   // })

  //   await apinew.derive.chain.subscribeNewHeads(block => {
  //     // console.log(`block #${block.author}`);
  //     const lastAuthor = block.author.toString();
  //     if (this.ismounted) {
  //       this.setState({ kusamalastAuthor: lastAuthor });
  //     }
  //     const start = new Date();
  //     const blockNumber = block.number.toString();
  //     if (this.ismounted) {
  //       this.setState({
  //         kusamastart: start,
  //         kusamafinalblock: blockNumber,
  //         kusamapreviousBlock: blockNumber
  //       });
  //     }
  //   });

  //   await apinew.query.session.validators(validators => {
  //     // console.log(validators)
  //     const sessionValidators = validators.map(x => x.toString());
  //     // console.log(sessionValidators)
  //     if (this.ismounted) {
  //       this.setState({
  //         kusamavalidators: sessionValidators,
  //         kusamaisloading: false
  //       });
  //     }
  //   });

  //   const start = async () => {
  //     let arr1 = [];
  //     // console.log(JSON.stringify(valinfo))
  //     const validatorstotalinfo = await Promise.all(
  //       this.state.kusamavalidators.map(val => apinew.derive.staking.info(val))
  //     );

  //     arr1 = JSON.parse(JSON.stringify(validatorstotalinfo)).map(info => {
  //       // console.log(info);
  //       return {
  //         valname: info.accountId,
  //         valinfo: info
  //       };
  //     });

  //     // const infyui = await apinew.query.session.intentions(val => {
  //     //   console.log(JSON.stringify(val))
  //     // })
  //     // console.log(JSON.stringify(infyui))

  //     if (this.ismounted) {
  //       // console.log("arr1",arr1)
  //       this.setState(
  //         {
  //           kusamavaltotalinfo: arr1,
  //           kusamaisloading: false
  //         }
  //         // () => this.getnominators2()
  //       );
  //     }
  //     let totalValidators = await apinew.query.staking.validatorCount();
  //     // console.log("this", totalValidators.words["0"], totalValidators);
  //     if (this.ismounted) {
  //       this.setState({
  //         kusamatotalValidators: totalValidators.words["0"]
  //       });
  //     }
  //   };

  //   start();

  //   // console.log(intentions.toJSON())
  //   await apinew.derive.session.info(header => {
  //     // console.log(`eraLength #${header.eraLength}`);
  //     // console.log(`eraProgress #${header.eraProgress}`);
  //     // console.log(`sessionLength #${header.sessionLength}`);
  //     // console.log(`sessionProgress #${header.sessionProgress}`);
  //     const eraLength = header.eraLength.toString();
  //     const eraProgress = header.eraProgress.toString();
  //     const sessionLength = header.sessionLength.toString();
  //     const sessionProgress = header.sessionProgress.toString();
  //     // console.log(eraLength,eraProgress,sessionLength,sessionProgress)
  //     if (this.ismounted) {
  //       this.setState(
  //         {
  //           kusamabottombarinfo: {
  //             eraLength: eraLength,
  //             eraProgress: eraProgress,
  //             sessionLength: sessionLength,
  //             sessionProgress: sessionProgress
  //           }
  //         }
  //         // () => this.createApi()
  //       );
  //     }
  //   });
  // }

  // // getnominators2 = async () => {
  // //   let arr = [];
  // //   // console.log("valtotal", this.state.valtotalinfo);
  // //   this.state.kusamavaltotalinfo.forEach(ele => {
  // //     console.log(ele);
  // //     ele.valinfo.stakers.others.forEach(nom => {
  // //       arr.push(nom.who);
  // //     });
  // //   });

  // //   // console.log("here are unfiltered", arr);
  // //   function onlyUnique(value, index, self) {
  // //     return self.indexOf(value) === index;
  // //   }

  // //   let nominators = arr.filter(onlyUnique);
  // //   // console.log("total", nominators);

  // //   const nominatorstotalinfo = await Promise.all(
  // //     nominators.map(val => this.state.apipromise.derive.staking.info(val))
  // //   );

  // //   let arr2 = JSON.parse(JSON.stringify(nominatorstotalinfo));
  // //   this.setState({
  // //     kusamanominatorinfo: arr2
  // //   });
  // // };

  // async createApi() {
  //   const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
  //   const api = await ApiPromise.create({ provider });
  //   // console.log(api.derive.chain.subscribeNewHeads())
  //   await api.derive.chain.subscribeNewHeads(block => {
  //     // console.log(`block #${block.author}`);
  //     const lastAuthor = block.author.toString();
  //     if (this.ismounted) {
  //       this.setState({ lastAuthor: lastAuthor });
  //     }
  //     const start = new Date();
  //     const blockNumber = block.number.toString();
  //     if (this.ismounted) {
  //       this.setState({
  //         start: start,
  //         finalblock: blockNumber,
  //         previousBlock: blockNumber
  //       });
  //     }
  //   });

  //   await api.query.session.validators(validators => {
  //     // console.log(validators)
  //     const sessionValidators = validators.map(x => x.toString());
  //     if (this.ismounted) {
  //       this.setState({
  //         validators: sessionValidators,
  //         isloading: false
  //       });
  //     }
  //   });

  //   const start = async () => {
  //     let arr1 = [];
  //     // console.log(JSON.stringify(valinfo))
  //     const validatorstotalinfo = await Promise.all(
  //       this.state.validators.map(val => api.derive.staking.info(val))
  //     );
  //     arr1 = JSON.parse(JSON.stringify(validatorstotalinfo)).map(info => {
  //       // console.log(info)
  //       return {
  //         valname: info.accountId,
  //         valinfo: info
  //       };
  //     });

  //     let totalValidators = await api.query.staking.validatorCount();
  //     // console.log("this", totalValidators.words["0"], totalValidators);
  //     if (this.ismounted) {
  //       this.setState({
  //         totalValidators: totalValidators.words["0"]
  //       });
  //     }

  //     const intentions = await api.query.staking.validators();
  //     // console.log(JSON.parse(JSON.stringify(intentions)));
  //     const allvals = JSON.parse(JSON.stringify(intentions))[0];
  //     // allvals.forEach(ele => {
  //     //   this.state.validators.forEach(val => {

  //     //   })
  //     // })
  //     const arr2 = arr1.map(ele => ele.valname);
  //     const arr3 = allvals.filter(e => !arr2.includes(e));
  //     const intentionstotalinfo = await Promise.all(
  //       arr3.map(val => api.derive.staking.info(val))
  //     );
  //     const arr4 = JSON.parse(JSON.stringify(intentionstotalinfo)).map(info => {
  //       return {
  //         valname: info.accountId,
  //         valinfo: info
  //       };
  //     });
  //     // let arr5 = this.state.validators.push(arr4);
  //     let arr5 = [...arr1, ...arr4];
  //     // console.log(arr4, arr5);
  //     // this.setState({
  //     //   validatorsandintentions:arr5
  //     // })
  //     // const ans = await api.derive.staking.info("DdFp1EWazfocKdYuCinGyNCPAQRYr6LDkwURG7k9vQg51WS")
  //     // console.log(JSON.parse(JSON.stringify(ans)))

  //     if (this.ismounted) {
  //       // console.log("arr1",arr1)
  //       this.setState(
  //         {
  //           validatorsandintentions: arr5,
  //           valtotalinfo: arr1,
  //           intentions: arr3,
  //           validatorandintentionloading: false
  //         },
  //         () => getnominators()
  //       );
  //     }
  //   };

  //   start();

  //   await api.derive.session.info(header => {
  //     // console.log(`eraLength #${header.eraLength}`);
  //     // console.log(`eraProgress #${header.eraProgress}`);
  //     // console.log(`sessionLength #${header.sessionLength}`);
  //     // console.log(`sessionProgress #${header.sessionProgress}`);
  //     const eraLength = header.eraLength.toString();
  //     const eraProgress = header.eraProgress.toString();
  //     const sessionLength = header.sessionLength.toString();
  //     const sessionProgress = header.sessionProgress.toString();
  //     if (this.ismounted) {
  //       this.setState({
  //         bottombarinfo: {
  //           eraLength: eraLength,
  //           eraProgress: eraProgress,
  //           sessionLength: sessionLength,
  //           sessionProgress: sessionProgress
  //         }
  //       });
  //     }
  //   });

  //   const getnominators = async () => {
  //     let arr = [];
  //     // console.log("valtotal", this.state.valtotalinfo);
  //     this.state.valtotalinfo.forEach(ele => {
  //       // console.log(ele);
  //       ele.valinfo.stakers.others.forEach(nom => {
  //         arr.push(nom.who);
  //       });
  //     });

  //     // console.log("here are unfiltered", arr);
  //     function onlyUnique(value, index, self) {
  //       return self.indexOf(value) === index;
  //     }

  //     let nominators = arr.filter(onlyUnique);
  //     // console.log("total", nominators);

  //     const nominatorstotalinfo = await Promise.all(
  //       nominators.map(val => api.derive.staking.info(val))
  //     );

  //     let arr2 = JSON.parse(JSON.stringify(nominatorstotalinfo));
  //     if (this.ismounted) {
  //       this.setState({
  //         nominatorinfo: arr2
  //       });
  //     }
  //     // console.log(arr2)
  //   };
  // }

  componentWillUnmount() {
    this.ismounted = false;
    clearInterval(this.interval);
  }

  /* Set the width of the side navigation to 250px */
  // openNav = () => {
  //   document.getElementsByClassName("nav-grid")[0].style.display = "grid";
  //   document.getElementById("mySidenav").style.width = "25%";
  //   document.getElementById("main").style.opacity="0.5";
  // };

  // /* Set the width of the side navigation to 0 */
  // closeNav = () => {
  //   document.getElementsByClassName("nav-grid")[0].style.display = "none";
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.opacity="1";
  // };
  // handleNavClick = () => {
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.opacity="1";
  // }
  // handleNavClickKusama = () => {
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.opacity="1";
  //   setInterval(() => {
  //     window.location.reload()
  //   }, 1000);

  // }

  render() {
    let pathArray = window.location.href.split('/');
    console.log(pathArray);
    // console.log(window.location.pathname,window.location.search)
    // var pathArray = window.location.href.split('/');
    // console.log(pathArray)
    // console.count("hi")
    // let loadingdone = false;
    // if (!this.state.isloading || !this.state.kusamaisloading) {
    //   loadingdone = true;
    // }
    // // console.table(this.state.isloading,this.state.kusamaisloading,loadingdone)
    // let bottombarobject = {
    //   bottombarinfo: this.state.bottombarinfo,
    //   finalblock: this.state.finalblock,
    //   validatorcount: this.state.totalValidators
    // };
    // let bottombarobject2 = {
    //   bottombarinfo: this.state.kusamabottombarinfo,
    //   finalblock: this.state.kusamafinalblock,
    //   validatorcount: this.state.kusamatotalValidators
    // };
    return (
      //  !loadingdone ? (
      //   <React.Fragment>
      //     <div className="lds-ripple">
      //       <div></div>
      //       <div></div>
      //     </div>
      //   </React.Fragment>
      // ) :
      <React.Fragment>
        <HashRouter>
          {/* {pathArray[4]!=="" ? */}
          {/* <React.Fragment>
            <div className="nav-grid">
              <div className="nav-empty-space" onClick={this.closeNav}></div>
        <div id="mySidenav" className="sidenav">
          <div className="closebtn" onClick={this.closeNav}>
            &times;
          </div>
          <h2>Polkaviz</h2>
          <NavLink exact to = "/" className = "navlink" onClick={this.handleNavClick}>Home</NavLink>
          <NavLink to = "/alexander" className = "navlink" onClick={this.handleNavClick}>Alexander Network</NavLink>
          <NavLink to = "/kusama" className = "navlink" onClick={this.handleNavClickKusama}>Kusama Network</NavLink>
        </div>

        </div>
        <span onClick={this.openNav} className="opennav"> &#9776; </span>
          </React.Fragment> */}
          {/* : undefined} */}
          <div id="main">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <MainWrapper
                  // valtotalinfo={this.state.valtotalinfo}
                  // createApi={this.createApi}
                  // validators={this.state.validators}
                  // start={this.state.start}
                  // lastAuthor={this.state.lastAuthor}
                  // validatorcount={this.state.totalValidators}
                  // bottombarobject={bottombarobject}
                  // nominatorinfo={this.state.nominatorinfo}
                  // previousBlock={this.state.previousBlock}
                  // isloading={this.state.isloading}
                  // intentions={this.state.intentions}
                  // validatorsandintentions={this.state.validatorsandintentions}
                  // kusamavaltotalinfo={this.state.kusamavaltotalinfo}
                  // kusamacreateApi={this.createApi2}
                  // kusamavalidators={this.state.kusamavalidators}
                  // kusamastart={this.state.kusamastart}
                  // kusamalastAuthor={this.state.kusamalastAuthor}
                  // kusamavalidatorcount={this.state.kusamatotalValidators}
                  // kusamabottombarobject={bottombarobject2}
                  // kusamanominatorinfo={this.state.kusamanominatorinfo}
                  // kusamapreviousBlock={this.state.kusamapreviousBlock}
                  // kusamaisloading={this.state.kusamaisloading}
                  />
                )}
              />
              <Route
                path="/alexander"
                render={props => (
                  <App
                  // valtotalinfo={this.state.valtotalinfo}
                  // createApi={this.createApi}
                  // validators={this.state.validators}
                  // start={this.state.start}
                  // lastAuthor={this.state.lastAuthor}
                  // validatorcount={this.state.totalValidators}
                  // // bottombarobject={bottombarobject}
                  // nominatorinfo={this.state.nominatorinfo}
                  // previousBlock={this.state.previousBlock}
                  // intentions={this.state.intentions}
                  // validatorsandintentions={this.state.validatorsandintentions}
                  />
                )}
              />
              <Route
                exact
                path="/kusama"
                render={props => (
                  <KusamaApp
                  // valtotalinfo={this.state.kusamavaltotalinfo}
                  // createApi={this.createApi2}
                  // validators={this.state.kusamavalidators}
                  // start={this.state.kusamastart}
                  // lastAuthor={this.state.kusamalastAuthor}
                  // validatorcount={this.state.kusamatotalValidators}
                  // bottombarobject={bottombarobject2}
                  // nominatorinfo={this.state.kusamanominatorinfo}
                  // previousBlock={this.state.kusamapreviousBlock}
                  // kusamaisloading={this.state.kusamaisloading}
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
