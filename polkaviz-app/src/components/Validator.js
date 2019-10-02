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
    let bondvalue = ""
    let nomvalue = 0

    if(!this.props.isMainWrapper && !this.props.isKusama){
    let totalvalue = this.props.valinfo.stakers.total / Math.pow(10,15)
    let ownvalue = this.props.valinfo.stakers.own /Math.pow(10,15)
    let totalbonded = 0
    totalbonded = totalvalue.toFixed(3)-ownvalue.toFixed(3)
    bondvalue = "Bonded: " + ownvalue.toString().slice(0,5) + " (+ " + totalbonded.toString().slice(0,5) +" ) DOT"
    nomvalue = "Backed by: " + this.props.valinfo.stakers.others.length + " nominators"
    }
    let x1 = this.props.x
    let y1 = this.props.y
    let x2 = this.props.x
    let y2 = this.props.y
    let color ="#9335A3"
    let opacity =1
    if(!this.props.isMainWrapper && !this.props.isKusama){
    if(this.props.intentions.includes(this.props.validatorAddress)){
      x1=((x1-window.innerWidth)/360*390)+window.innerWidth
      y1=((y1-window.innerHeight)/360*390)+window.innerHeight
      color="yellow"
      opacity=0
    }
  }
    return (
      <React.Fragment>
        <Tail
          x={x2 / 2}
          y={y2 / 2}
          angle={this.props.angle}
          opacity={opacity}
        />
        <Rectangle
          x={x1 / 2}
          y={y1 / 2}
          angle={this.props.angle}
          validatorAddress={this.props.validatorAddress}
          valinfo={this.props.valinfo}
          bondvalue={bondvalue}
          nominators={nomvalue}
          nominatorinfo={this.props.nominatorinfo}
          history={this.props.history}
          totalinfo={this.props.totalinfo}
          isMainWrapper={this.props.isMainWrapper}
          isKusama={this.props.isKusama}
          intentions={this.props.intentions}
          color={color}
        />
      </React.Fragment>
    );
  }
}

export default Validator;
