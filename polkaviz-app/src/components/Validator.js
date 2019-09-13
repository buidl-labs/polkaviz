import React from "react";
import Rectangle from "./Rectangle";
import Tail from "./Tail";
import { WsProvider, ApiPromise } from "@polkadot/api";


class Validator extends React.Component {
  constructor(){
    super()
    this.state={
      nominators:[],
      totalnominators:0
    }
    this.totalvalue=0
    this.ownvalue=0
  }
  componentDidMount(){
    this.createApi()
  }
  async createApi() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create(provider);

    const stakers = await api.derive.staking.info(this.props.validatorAddress);
    // 5FbuxWQuCd3N9kosfTXY1v63xV5bNfSpNutuRvERAWm6fmzt
    // console.log(JSON.stringify(stakers));
    const value = JSON.parse(stakers);
    this.totalvalue = value.stakers.total / Math.pow(10,15)
    this.ownvalue = value.stakers.own /Math.pow(10,15)
    if(value.stashId===value.controllerId)
    {
        this.setState({
            showdifferent:false
        })
    }
    this.setState({
      nominators: value.stakers.others,
      totalnominators: value.stakers.others.length
    });
    // console.log(value.stakers.others.length);
  }
  render() {

    let totalbonded = 0
    totalbonded = this.totalvalue.toFixed(3)-this.ownvalue.toFixed(3)
    let bondvalue = "bonded: " + this.ownvalue.toString().slice(0,5) + " (+ " + totalbonded.toString().slice(0,5) +" ) DOT"
    let nomvalue = 0
    nomvalue = "backed by " + this.state.totalnominators + " nominators"

    return (
      <React.Fragment>
        <Tail
          x={this.props.x / 2}
          y={this.props.y / 2}
          angle={this.props.angle}
        />
        <Rectangle
          x={this.props.x / 2}
          y={this.props.y / 2}
          angle={this.props.angle}
          validatorAddress={this.props.validatorAddress}
          bondvalue={bondvalue}
          nominators={nomvalue}
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

export default Validator;
