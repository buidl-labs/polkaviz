import React from "react";
import Relay from "./Relay";
import { Stage, Layer } from "react-konva";
import Validator from "./Validator";
import BlockAnimation from "./alexander/BlockAnimation";
import BlockAnimationNew from "./kusama/BlockAnimation-new";
import { withRouter } from "react-router-dom";
import { WsProvider, ApiPromise } from "@polkadot/api";


class MainWrapper extends React.Component {
  constructor() {
    super();
    this.latestBlockAuthor = undefined;
    this.state = {
      validators: [],
      lastAuthor: "",
      start: null,
      isloading: true,
      previousBlock: undefined,

      kusamavalidators: [],
      kusamalastAuthor: "",
      kusamastart: null,
      kusamaisloading: true,
      kusamapreviousBlock: undefined,
    };
    this.elapsed = 0;
    this.kusamaelapsed = 0;
    this.ismounted = true;
  }

  componentDidMount(){
    this.createApi2()
    this.createApi()
    // document.getElementById("mySidenav").style.display="none";
    // document.getElementsByClassName("opennav")[0].style.display="none"
  }

  async createApi2() {
    let provider = new WsProvider("wss://kusama-rpc.polkadot.io");
    const apinew = await ApiPromise.create({ provider });

    await apinew.derive.chain.subscribeNewHeads(block => {
      // console.log(`block #${block.author}`);
      const lastAuthor = block.author.toString();
      if (this.ismounted) {
        this.setState({ kusamalastAuthor: lastAuthor });
      }
      const start = new Date();
      const blockNumber = block.number.toString();
      if (this.ismounted) {
        this.setState({
          kusamastart: start,
          kusamafinalblock: blockNumber,
          kusamapreviousBlock: blockNumber
        });
      }
    });

    await apinew.query.session.validators(validators => {
      // console.log(validators)
      const sessionValidators = validators.map(x => x.toString());
      // console.log(sessionValidators)
      if (this.ismounted) {
        this.setState({
          kusamavalidators: sessionValidators,
          kusamaisloading: false
        });
      }
    });

  }


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
      if (this.ismounted) {
        this.setState({
          validators: sessionValidators,
          isloading: false
        });
      }
    });

  }






  componentWillUnmount() {
    this.ismounted = false;
    // document.getElementById("mySidenav").style.display="block";
    // document.getElementsByClassName("opennav")[0].style.display="block"
  }










  handleOnMouseOverstage1 = () => {
    document.body.style.cursor = "pointer";
    document.getElementById("alexandertext").classList.remove("animatereverse")
    document.getElementById("alexandertext").classList.add("animate")
  }
  handleOnMouseOverstage2 = () => {
    document.body.style.cursor = "pointer";
    document.getElementById("kusamatext").classList.remove("animatereverse")
    document.getElementById("kusamatext").classList.add("animate")
  }
  handleOnMouseOutstage1 = () => {
    document.body.style.cursor = "default";
    document.getElementById("alexandertext").classList.remove("animate")
    document.getElementById("alexandertext").classList.add("animatereverse")
   }
   handleOnMouseOutstage2 = () => {
    document.body.style.cursor = "default";
    document.getElementById("kusamatext").classList.remove("animate")
    document.getElementById("kusamatext").classList.add("animatereverse")
   }
  alexanderClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/alexander",
      state:{totalinfo:this.props.totalinfo,
      valinfo:this.props.valinfo,
    }
}
  )}
  kusamaClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/kusama",
      state:{totalinfo:this.props.totalinfo,
      valinfo:this.props.valinfo,
    }
})
setInterval(() => {
  window.location.reload()      
}, 1000);
}

  render() {
    let arr = this.state.validators;
    console.log(arr)
    // if(this.props.validatorsandintentions.length !== 0 ){
    // arr = this.props.validatorsandintentions;
    //     }
    const arr2 = this.state.kusamavalidators;
    let loadingdone = false;
    if (!this.state.isloading && !this.state.kusamaisloading) {
      loadingdone = true;
    }
    // const validatortext = "Validators: " + this.props.validators.length + "/" + this.props.totalvalidators
    // const arr1 = [1,2,3,4,5,6,7,8]
    return (
     
      !loadingdone ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div></React.Fragment>) :
      (
        <div>
          <div className="mainwrapper-text">
            <h1>Polkaviz</h1>
            <h2>Visualization efforts on Polkadot Network</h2>
          </div>
      <div className="mainWrapper">
        
        <div className="container">
          <div className="headingmainwrapper1" id="alexandertext">
            <h2>Alexander Network</h2>
          </div>
          <div className="relay-circle">
            {this.props.isloading ? <p className="alexanderconnecting">Please wait while we connect to alexander network</p>:
            <Stage 
            width={window.innerWidth/2} 
            height={window.innerHeight} 
            onClick={this.alexanderClick} 
            onMouseOver={() => this.handleOnMouseOverstage1()} 
            onMouseOut={() => this.handleOnMouseOutstage1()} >
              
              <Layer>
                {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
                {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
                {arr.map((person, index) => (
                  <Validator
                    key={index}
                    validatorAddress={undefined}
                    valinfo={undefined}
                    totalinfo={undefined}
                    nominatorinfo={undefined}
                    angle={180 - (index * 360) / arr.length}
                    history={this.props.history}
                    x={
                      window.innerWidth/2 +
                      360 *
                        Math.cos(
                          (90 - 1 - (index * 360) / arr.length) * 0.0174533
                        )
                    }
                    y={
                      window.innerHeight -200 +
                      360 *
                        Math.sin(
                          (90 - 1 - (index * 360) / arr.length) * 0.0174533
                        )
                    }
                    isMainWrapper={true}
                    // intentions={this.props.intentions}
                  />
                ))}
                {/* {console.log(this.props.bottombarobject.finalblock)}
              {console.log(this.props.previousBlock)} */}
                {this.state.previousBlock !== undefined && this.state.validators.indexOf(this.state.lastAuthor)!==-1 && (
                  <BlockAnimation
                    key={this.state.validators.indexOf(this.state.lastAuthor)}
                    angle={
                      180 -
                      (this.state.validators.indexOf(this.state.lastAuthor) *
                        360) /
                        arr.length
                    }
                    x1={
                      window.innerWidth / 4 +
                      100 *
                        Math.cos(
                          (90 -
                            (this.state.validators.indexOf(
                              this.state.lastAuthor
                            ) *
                              360) /
                              arr.length) *
                            0.0174533
                        )
                    }
                    y1={
                      window.innerHeight / 2  - 100 +
                      100 *
                        Math.sin(
                          (90 -
                            (this.state.validators.indexOf(
                              this.state.lastAuthor
                            ) *
                              360) /
                              arr.length) *
                            0.0174533
                        )
                    }
                    x2={
                      window.innerWidth / 4 +
                      160 *
                        Math.cos(
                          (90 -
                            (this.state.validators.indexOf(
                              this.state.lastAuthor
                            ) *
                              360) /
                              arr.length) *
                            0.0174533
                        )
                    }
                    y2={
                      window.innerHeight / 2 -100 +
                      160 *
                        Math.sin(
                          (90 -
                            (this.state.validators.indexOf(
                              this.state.lastAuthor
                            ) *
                              360) /
                              arr.length) *
                            0.0174533
                        )
                    }
                  />
                )}
                <Relay x={window.innerWidth/2} y={window.innerHeight - 200} id="alexanderRelay"/>
              </Layer>
            </Stage>
            }
          </div>
        </div>



        <div className="right-stage">
        {this.state.kusamaisloading ? <p className="kusamaconnecting">Please Wait while we connect to Kusama Network</p>:
        <React.Fragment>
        <div className="headingmainwrapper2" id="kusamatext">
            <h2>Kusama Network</h2>
          </div>
         <Stage width={window.innerWidth/2} 
         height={window.innerHeight - 200} 
         onClick={this.kusamaClick} 
         onMouseOver={() => this.handleOnMouseOverstage2()} 
         onMouseOut={() => this.handleOnMouseOutstage2()} >
              <Layer>
                {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
                {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
                {arr2.map((person, index) => (
                  <Validator
                    key={index}
                    // validatorAddress={this.props.kuvaltotalinfo[index].valname}
                    // valinfo={this.props.kuvaltotalinfo[index].valinfo}
                    totalinfo={undefined}
                    nominatorinfo={undefined}
                    angle={180 - (index * 360) / arr2.length}
                    history={this.props.history}
                    x={
                      window.innerWidth/2 +
                      360 *
                        Math.cos(
                          (90 - 1 - (index * 360) / arr2.length) * 0.0174533
                        )
                    }
                    y={
                      window.innerHeight - 200 +
                      360 *
                        Math.sin(
                          (90 - 1 - (index * 360) / arr2.length) * 0.0174533
                        )
                    }
                    isMainWrapper={true}
                    isKusama={true}
                  />
                ))}
                {/* {console.log(this.props.bottombarobject.finalblock)}
              {console.log(this.props.previousBlock)} */}
                {this.state.kusamapreviousBlock !== undefined && (
                  <BlockAnimationNew
                    key={this.state.kusamavalidators.indexOf(this.state.kusamalastAuthor)}
                    angle={
                      180 -
                      (this.state.kusamavalidators.indexOf(this.state.kusamalastAuthor) *
                        360) /
                        arr2.length
                    }
                    x1={
                      window.innerWidth / 4 +
                      100 *
                        Math.cos(
                          (90 -
                            (this.state.kusamavalidators.indexOf(
                              this.state.kusamalastAuthor
                            ) *
                              360) /
                              arr2.length) *
                            0.0174533
                        )
                    }
                    y1={
                      window.innerHeight / 2 -100 +
                      100 *
                        Math.sin(
                          (90 -
                            (this.state.kusamavalidators.indexOf(
                              this.state.kusamalastAuthor
                            ) *
                              360) /
                              arr2.length) *
                            0.0174533
                        )
                    }
                    x2={
                      window.innerWidth / 4 +
                      160 *
                        Math.cos(
                          (90 -
                            (this.state.kusamavalidators.indexOf(
                              this.state.kusamalastAuthor
                            ) *
                              360) /
                              arr2.length) *
                            0.0174533
                        )
                    }
                    y2={
                      window.innerHeight / 2 -100 +
                      160 *
                        Math.sin(
                          (90 -
                            (this.state.kusamavalidators.indexOf(
                              this.state.kusamalastAuthor
                            ) *
                              360) /
                              arr2.length) *
                            0.0174533
                        )
                    }
                  />
                )}
                <Relay x={window.innerWidth/2} y={window.innerHeight-200} isKusama={true}/>
              </Layer>
            </Stage>
            </React.Fragment>
        }
          </div>
        </div>
        </div>
      )
    );
  }
}

export default withRouter(MainWrapper);