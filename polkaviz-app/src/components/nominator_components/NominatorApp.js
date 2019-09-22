import React from "react";
// import { WsProvider, ApiPromise } from "@polkadot/api";
import { Stage, Layer, Arc, Circle, Text } from "react-konva";
import Validators from "./Validators";
import {withRouter} from 'react-router-dom'
import NomBottombar from './NomBottombar'

class NominatorApp extends React.Component {
  constructor() {
    super();
    this.latestBlockAuthor = undefined;
    this.state = {
      validators: [],
      nominator: [],
      controllerId: "",
      valbacked: [],
      totalbonded: 0,
      nominatorvalue: {
        controllerId:0
      },
      showValidatorAddress:false,
      isloading: true
    };
    this.ismounted = true;
  }
  componentDidMount() {
    console.log("nom",this.props)
    this.start()
    // this.createApi()
  }

   start() {
    let arr1 = [];
    let bonded = 0;
    // await asyncForEach(this.state.validators, async val => {
    //   console.log(val, count++);
    //   let stakers = await api.derive.staking.info(val);
    //   let stakeinfo = JSON.parse(stakers);
    //   console.log(stakeinfo.stakers.others);
    //   stakeinfo.stakers.others.forEach(ele => {
    //     if (ele.who === this.props.match.params.nominatorAddress) {
    //       arr1.push(val);
    //       bonded += ele.value / Math.pow(10, 15);
    //     }
    //   });

    // });
    // console.log(this.props.location.state.totalinfo)
    this.props.valtotalinfo.forEach( (ele) => {
      ele.valinfo.stakers.others.forEach( (nom) => {
        if (nom.who === this.props.match.params.nominatorAddress) {
          arr1.push(ele);
          bonded += nom.value / Math.pow(10, 15);
        }
      });
    });

    let nominatorvalue = ""
    this.props.nominatorinfo.forEach( (ele) => {
      if(ele.accountId === this.props.match.params.nominatorAddress)
      {
        nominatorvalue = ele.controllerId
      }
    })

    console.log("Done",nominatorvalue);
    console.log(arr1);
    if(this.ismounted){
    this.setState({
      valbacked: arr1,
      totalbonded: bonded,
      controllerId: nominatorvalue
    },() => {
      this.setState({isloading:false})
    });
  }
  }


  // async createApi() {
  //   //  const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
  //   //  const api = await ApiPromise.create(provider);
  //    const stakers = await this.props.api.derive.staking.info(this.props.match.params.nominatorAddress)
  //   //  "5F7RKWLXYMPvDi7Z5vW75QUHKnN4D4DY9RzFhgzfMeVNEswE"

  //   //  vals = 5CnDngcL3NE8x1rdxrmDWEjmgLrPm5KBsCy8uTqRQCRWx74m
  //   //         5Enp67VYwLviZWuyf2XfM5mJXgTWHaa45podYXhUhDCUeYfg

  //    const value = JSON.parse(stakers);
  //    console.log(value, value.controllerId);
  //   if(this.ismounted){
  //    this.setState({
  //     controllerId: value.controllerId
  //   });
  // }
  //   // await api.query.session.validators(validators => {
  //   //   const sessionValidators = validators.map(x => x.toString());
  //   //   if(this.ismounted){
  //   //   this.setState({ validators: sessionValidators });
  //   //   }
  //   // });
  //   console.log(this.state.nominator, this.state.validators);

  //   // async function asyncForEach(array, callback) {
  //   //   for (let index = 0; index < array.length; index++) {
  //   //     await callback(array[index], index, array);
  //   //   }
  //   // }

  


  // }
  componentWillUnmount(){
    this.ismounted = false;
  }

  handleOnMouseOver = () => {
    this.setState({showValidatorAddress: true})
  }
  handleOnMouseOut = () => {
    this.setState({showValidatorAddress: false})
  }


  BackbtnhandleOnMouseOver = () => {
    document.body.style.cursor = "pointer";
  }
  BackbtnhandleOnMouseOut = () => {
    document.body.style.cursor = "default";
  }

  handleClick = () => {
    document.body.style.cursor = "default";
    this.props.history.push({
      pathname:"/",
      state:{totalinfo:this.props.totalinfo,
      valinfo:this.props.valinfo,
      // nominatorinfo:this.props.nominatorinfo
    }
  })
}


  render() {
    
    console.log("nomvalue",this.state.nominatorvalue)
    let nominatorname =
      "Nominator: " + this.props.match.params.nominatorAddress;
    let stashname =
      this.state.controllerId.toString().slice(0, 8) +
      "......" +
      this.state.controllerId.toString().slice(-8);
    let controllername = "Controller: " + stashname;
    let bondvalue =
      "bonded: " + this.state.totalbonded.toString().slice(0, 5) + " DOT";

      let valtext = this.props.match.params.nominatorAddress.toString().slice(0,8) + "......" + this.props.match.params.nominatorAddress.toString().slice(-8)

    let arr = this.state.valbacked;
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log("valstate",this.state.showValidatorAddress)
    return this.state.isloading ? (
      <React.Fragment>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        {/* <div className="lds-text" style={{ left: "42%" }}>
          Fetching Validators.....
        </div> */}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="back-arrow" onClick={this.handleClick} onMouseOver={this.BackbtnhandleOnMouseOver} onMouseOut={this.BackbtnhandleOnMouseOut}>
         &#8592;
        </div>
        <div className="valheading">
          <h2>{nominatorname}</h2>
        </div>
        <Stage width={width} height={height}>
          <Layer>
            <Validators
              allvals={arr}
              rect_x={width / 2}
              circ_x={width / 2 - 200}
              circ_y={height / 2}
              totalinfo={this.props.valtotalinfo}
              // valinfo={this.props.valinfo}
              history={this.props.history}
            />
            <Arc
              x={width - 2}
              y={height / 2}
              innerRadius={height / 2 - 25}
              outerRadius={height / 2 - 24}
              rotation={90}
              angle={180}
              stroke="#97A1BF"
              strokeWidth={4}
            />

            <Circle
              x={width / 2 - 200}
              y={height / 2}
              radius={7}
              fill="white"
              onMouseOver={this.handleOnMouseOver}
              onMouseOut={this.handleOnMouseOut}
            />
            {/* <Text
              text={nominatorname}
              x={68}
              y={71}
              fill="#FFFFFF"
              fontSize={20}
            /> */}
            {/* <Text
              text={controllername}
              x={width / 30}
              y={height - height / 30}
              fill="#FFFFFF"
              fontSize={17}
            />
            <Text
              text={bondvalue}
              x={width / 3}
              y={height - height / 30}
              fill="#FFFFFF"
              fontSize={17}
            /> */}
             {this.state.showValidatorAddress && 
      <Text text={valtext} 
        x={width/2-200} 
        y={height/2-18} 
        fill="#FFFFFF" />   }
          </Layer>
        </Stage>
        <div className="nombottombar">
          <NomBottombar controllername={controllername} bondvalue={bondvalue} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(NominatorApp);
