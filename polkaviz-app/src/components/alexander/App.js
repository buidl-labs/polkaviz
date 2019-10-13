import React from "react";
import Relay from "../Relay";
import { Stage, Layer } from "react-konva";
import Validator from "../Validator";
import BlockAnimation from "./BlockAnimation";
import Bottombar from "../Bottombar";
import { withRouter } from 'react-router-dom';
import { WsProvider, ApiPromise } from "@polkadot/api";
import NominatorApp from "./nominator_components/NominatorApp";
import ValidatorApp from "./validator_components/ValidatorApp";



class App extends React.Component {
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
      intentions: [],
      validatorsandintentions: [],
      validatorandintentionloading: true,
      totalIssued:""
    };
    this.elapsed = 0;
    this.kusamaelapsed = 0;
    this.ismounted = true;
  }
//   shouldComponentUpdate(nextProps, nextState){
//     return this.props.lastAuthor !== nextProps.lastAuthor || this.props.bottombarobject !== nextProps.bottombarobject
// }
  componentDidMount(){
    this.createApi()
  }

  async createApi() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create({ provider });

    const balance = await api.query.balances.totalIssuance()
    const totalIssued = (balance.toString() / Math.pow(10, 18)).toFixed(3)
    if (this.ismounted) {
      this.setState({
          totalIssued:totalIssued
      })
    }
    // console.log((balance.toString() / Math.pow(10, 18)).toFixed(3))
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
      if (this.ismounted) {
        this.setState({
          validators: sessionValidators,
          isloading: false
        });
      }
    });

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

      let totalValidators = await api.query.staking.validatorCount();
      // console.log("this", totalValidators.words["0"], totalValidators);
      if (this.ismounted) {
        this.setState({
          totalValidators: totalValidators.words["0"]
        });
      }

      const intentions = await api.query.staking.validators();
      // console.log(JSON.parse(JSON.stringify(intentions)));
      const allvals = JSON.parse(JSON.stringify(intentions))[0];
      // allvals.forEach(ele => {
      //   this.state.validators.forEach(val => {

      //   })
      // })
      const arr2 = arr1.map(ele => ele.valname);
      const arr3 = allvals.filter(e => !arr2.includes(e));
      const intentionstotalinfo = await Promise.all(
        arr3.map(val => api.derive.staking.info(val))
      );
      const arr4 = JSON.parse(JSON.stringify(intentionstotalinfo)).map(info => {
        return {
          valname: info.accountId,
          valinfo: info
        };
      });
      console.log(arr4)
      // let arr5 = this.state.validators.push(arr4);
      let arr5 = [...arr1, ...arr4];
      // console.log(arr4, arr5);
      // this.setState({
      //   validatorsandintentions:arr5
      // })
      // const ans = await api.derive.staking.info("DdFp1EWazfocKdYuCinGyNCPAQRYr6LDkwURG7k9vQg51WS")
      // console.log(JSON.parse(JSON.stringify(ans)))

      if (this.ismounted) {
        // console.log("arr1",arr1)
        this.setState(
          {
            validatorsandintentions: arr5,
            valtotalinfo: arr1,
            intentions: arr3,
            validatorandintentionloading: false
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
      if (this.ismounted) {
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
    let pathArray = window.location.href.split('/');
    console.log(!pathArray[5])
    let arr = this.state.validators;
    if(this.state.validatorsandintentions.length !== 0 ){
    arr = this.state.validatorsandintentions;
        }    // console.log(arr)
    const intentionsarr = this.state.intentions
    let bottombarobject = {
        bottombarinfo: this.state.bottombarinfo,
        finalblock: this.state.finalblock,
        validatorcount: this.state.totalValidators,
        totalIssued:this.state.totalIssued.toString() + " K"
      };

    // console.log(this.state.validatorsandintentions)
    // console.log(this.state.lastAuthor,this.state.validators,this.state.valtotalinfo)
    // console.log(this.state.validators.indexOf(this.state.lastAuthor))
    // const validatortext = "Validators: " + this.state.validators.length + "/" + this.state.totalvalidators
    // const arr1 = [1,2,3,4,5,6,7,8]
    return (
      this.state.validators.length === 0 ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div></React.Fragment>) : 
      (
        <React.Fragment>
        {!pathArray[5] && 
        
      <div className="container">

        <div className="heading">
          <h2>Alexander Network</h2>
        </div>

        <div className="intentions">
          <div>Next Up:</div>
          {intentionsarr.length === 0 ? <div className="inten">no addresses found</div> :
          intentionsarr.map((ele,index) => {
            return (
            <div className="inten" key={index}>
              <span className="valsign"></span>
              {ele.toString().slice(0,8) + "......" + ele.toString().slice(-8)}
            </div>
            )
          })
          }
        </div>

        <div className="relay-circle">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
            {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
              {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
              {arr.map((person, index) => (
                <Validator
                  key={index}
                  validatorAddress={this.state.validatorsandintentions ? person.valname : undefined}
                  valinfo={this.state.validatorsandintentions ? person.valinfo : undefined}
                  totalinfo={this.state.validatorsandintentions ? this.state.valtotalinfo : undefined}
                  nominatorinfo={this.state.validatorsandintentions ? this.state.nominatorinfo : undefined}
                  angle={180 - (index * 360) / arr.length}
                  history={this.props.history}
                  intentions={this.state.intentions}
                  x={
                    window.innerWidth +
                    360 *
                      Math.cos((90 - 1 - (index * 360) / arr.length) * 0.0174533)
                  }
                  y={
                    window.innerHeight +
                    360 *
                      Math.sin((90 - 1 - (index * 360) / arr.length) * 0.0174533)
                  }
                />
              ))}
              {/* {console.log(this.state.bottombarobject.finalblock)}
              {console.log(this.state.previousBlock)} */}
              {this.state.previousBlock !== undefined && this.state.validators.indexOf(this.state.lastAuthor)!==-1 && <BlockAnimation
                key={this.state.validators.indexOf(this.state.lastAuthor)}
                angle={
                  180 -
                  (this.state.validators.indexOf(this.state.lastAuthor) * 360) /
                    arr.length
                }
                x1={
                  window.innerWidth / 2 +
                  100 *
                    Math.cos(
                      (90 -
                        (this.state.validators.indexOf(this.state.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                y1={
                  window.innerHeight / 2 +
                  100 *
                    Math.sin(
                      (90 -
                        (this.state.validators.indexOf(this.state.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                x2={
                  window.innerWidth / 2 +
                  160 *
                    Math.cos(
                      (90 -
                        (this.state.validators.indexOf(this.state.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                y2={
                  window.innerHeight / 2 +
                  160 *
                    Math.sin(
                      (90 -
                        (this.state.validators.indexOf(this.state.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
              />}
              <Relay x={window.innerWidth} y={window.innerHeight} />
              
            </Layer>
          </Stage>
        </div>
        <div className="bottombar">
          <Bottombar start={this.state.start} activevalidators={this.state.validators.length} validatorcount={this.state.validatorcount} bottombarobject ={bottombarobject}/>
        </div>
      </div>}

      {pathArray[5] === "validator" ? <ValidatorApp
                    valtotalinfo={this.state.valtotalinfo}
                    intentions={this.state.intentions}
                    validatorsandintentions={this.state.validatorsandintentions}
                    validatorandintentionloading={this.state.validatorandintentionloading}
                  />: undefined}

      {pathArray[5] === "nominator" ? <NominatorApp
                    valtotalinfo={this.state.valtotalinfo}
                    nominatorinfo={this.state.nominatorinfo}
                    intentions={this.state.intentions}
                    validatorsandintentions={this.state.validatorsandintentions}
                    validatorandintentionloading={this.state.validatorandintentionloading}
                  /> : undefined}
      </React.Fragment>


      )
    );
  }
}

export default withRouter(App);
