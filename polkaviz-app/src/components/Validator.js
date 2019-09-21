import React from "react";
import Rectangle from "./Rectangle";
import Tail from "./Tail";

class Validator extends React.Component {
  // constructor(){
  //   super()
  //   this.state={
  //     nominators:[],
  //     totalnominators:0,
  //   }
  // }
  // // componentDidMount(){
  // //   this.createApi()
  // // }
  // // async createApi() {
  // //   const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
  // //   const api = await ApiPromise.create(provider);

  // //   const stakers = await api.derive.staking.info(this.props.validatorAddress);
  // //   // 5FbuxWQuCd3N9kosfTXY1v63xV5bNfSpNutuRvERAWm6fmzt
  // //   // console.log(JSON.stringify(stakers));
  // //   const value = JSON.parse(stakers);
  // //   this.totalvalue = value.stakers.total / Math.pow(10,15)
  // //   this.ownvalue = value.stakers.own /Math.pow(10,15)
  // //   if(value.stashId===value.controllerId)
  // //   {
  // //     if(this.ismounted){
  // //       this.setState({
  // //           showdifferent:false
  // //       })
  // //     }
  // //   }
  // //   if(this.ismounted){
  // //   this.setState({
  // //     nominators: value.stakers.others,
  // //     totalnominators: value.stakers.others.length,
  // //     datafetched:true
  // //   });
  // // }
  // //   // console.log(value.stakers.others.length);
  // // }
  // componentWillUnmount(){
  //   this.ismounted = false;
  // }
  render() {
    let totalvalue = this.props.valinfo.stakers.total / Math.pow(10, 15);
    let ownvalue = this.props.valinfo.stakers.own / Math.pow(10, 15);
    let totalbonded = 0;
    totalbonded = totalvalue.toFixed(3) - ownvalue.toFixed(3);
    let bondvalue = "";
    bondvalue =
      "Bonded: " +
      ownvalue.toString().slice(0, 5) +
      " (+ " +
      totalbonded.toString().slice(0, 5) +
      " ) DOT";
    let nomvalue = 0;
    nomvalue =
      "Backed by: " + this.props.valinfo.stakers.others.length + " nominators";
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
          valinfo={this.props.valinfo}
          bondvalue={bondvalue}
          nominators={nomvalue}
          history={this.props.history}
          totalinfo={this.props.totalinfo}
        />
      </React.Fragment>
    );
  }
}

export default Validator;
