import React from "react";
import Counter from "./Counter";
import FinalizedBlock from "./FinalizedBlock";
import Session from "./Session";
import Era from "./Era";
import ValidatorCount from './ValidatorCount'
import { WsProvider, ApiPromise } from "@polkadot/api";

class Bottombar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eraProgress: 0,
      eraLength: 0,
      currentIndex: 0,
      lastLengthChange: 0,
      sessionLength: 0,
      sessionsPerEra: 0,
      sessionProgress: 0,
      totalValidators: 0
    };
    this.mounted = true;
  }
  componentDidMount() {
    this.createApi2();
    this.createApi3();
  }
  async createApi2() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create(provider);
    let totalValidators = await api.query.staking.validatorCount()
    console.log("this",totalValidators.words["0"],totalValidators)
    if(this.mounted){
      this.setState({
        totalValidators:totalValidators.words["0"]
      })
    }
    await api.derive.session.info(header => {
      // console.log(`eraLength #${header.eraLength}`);
      // console.log(`eraProgress #${header.eraProgress}`);
      // console.log(`sessionLength #${header.sessionLength}`);
      // console.log(`sessionProgress #${header.sessionProgress}`);
      const eraLength = header.eraLength.toString();
      const eraProgress = header.eraProgress.toString();
      const sessionLength = header.sessionLength.toString();
      const sessionProgress = header.sessionProgress.toString();
      if(this.mounted){
      this.setState({
        eraLength: eraLength,
        eraProgress: eraProgress,
        sessionLength: sessionLength,
        sessionProgress: sessionProgress
      });
    }
    });
  }
  async createApi3() {
    const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
    const api = await ApiPromise.create(provider);
    await api.derive.chain.bestNumberFinalized(header => {
      // console.log(`Chain is at block: #${header}`);
      if(this.mounted){
      this.setState({ finalblock: header.toString() });
      }
    });

  }

  componentWillUnmount(){
    this.mounted = false;
  }
  render() {
    return (
      <React.Fragment>
        <ValidatorCount 
          totalValidators={this.state.totalValidators}
          activeValidators={this.props.activevalidators} />
        <Counter start={this.props.start} />
        <FinalizedBlock finalblock={this.state.finalblock} />
        <Session
          sessionProgress={this.state.sessionProgress}
          sessionLength={this.state.sessionLength}
        />
        <Era
          eraLength={this.state.eraLength}
          eraProgress={this.state.eraProgress}
        />
      </React.Fragment>
    );
  }
}

export default Bottombar;
