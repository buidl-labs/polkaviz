import React from 'react';
import Rectangle from '../Rectangle';
import Tail from '../Tail';

class Validator extends React.Component {
  render() {
    let bondvalue = '';
    let nomvalue = 0;
    let commission = '';
    // console.log("thispropsintentions", this.props.intentions)
    if (!this.props.isMainWrapper && this.props.valinfo !== undefined) {
      bondvalue = 'Bonded: No Data found';
      nomvalue = 'Backed by: No Data found';
      if (!this.props.isKusama) {
        let totalvalue =
          parseInt(this.props.valinfo.stakers.total) / Math.pow(10, 15);
        let ownvalue =
          parseInt(this.props.valinfo.stakers.own) / Math.pow(10, 15);
        let totalbonded = 0;
        if (this.props.intentions.includes(this.props.validatorAddress)) {
          totalvalue = parseInt(this.props.valinfo.stakingLedger.total);
          ownvalue = parseInt(this.props.valinfo.stakingLedger.total);
        }
        console.log(
          'totalbonded: ' +
            totalbonded +
            ' totalvalue: ' +
            totalvalue +
            ' ownvalue: ' +
            ownvalue,
        );
        // console.log('totalbonded: '+ parseInt(totalbonded) + ' totalvalue: '+ parseInt(totalvalue) + ' ownvalue: ' + parseInt(ownvalue));

        totalbonded = totalvalue.toFixed(3) - ownvalue.toFixed(3);
        bondvalue =
          'Bonded: ' +
          ownvalue.toString().slice(0, 5) +
          ' (+ ' +
          totalbonded.toString().slice(0, 5) +
          ' ) DOT';
        nomvalue =
          'Backed by: ' +
          this.props.valinfo.stakers.others.length +
          ' nominators';
      }
      if (!this.props.intentions) {
        if (this.props.isKusama) {
          let value =
            this.props.valinfo.stakingLedger.active / Math.pow(10, 12);
          if (value > 1000) {
            value = value / Math.pow(10, 3);
            value = value.toFixed(3);
            // value = value.split(".")[0]
            value = value + 'k';
          } else value = value.toFixed(3);
          // console.log(value)
          bondvalue = 'Bonded: ' + value.toString() + ' KSM';

          //TODO: Recheck calculation for commission
          let commissionvalue = this.props.valinfo.validatorPrefs.commission;
          commissionvalue = commissionvalue / Math.pow(10, 12);
          commissionvalue = commissionvalue.toFixed(3);
          commission = 'commission: ' + commissionvalue + ' KSM';
        }
      }

      if (this.props.intentions.length > 0) {
        bondvalue = `Self Stake ${parseInt(this.props.valinfo.stakers.own / 10 ** 12,).toFixed(3)} KSM`;
        nomvalue = 'Backed by: ' +
        this.props.valinfo.stakers.others.length +
        ' nominators';
      }
    }
    let x1 = this.props.x;
    let y1 = this.props.y;
    let x2 = this.props.x;
    let y2 = this.props.y;
    let color = '#C31169';
    let opacity = 1;
    if (!this.props.isKusama) {
      color = '#9335A3';
    }
    if (!this.props.isMainWrapper) {
      if (this.props.intentions) {
        x1 = ((x1 - window.innerWidth) / 360) * 420 + window.innerWidth;
        y1 = ((y1 - window.innerHeight) / 360) * 420 + window.innerHeight;
        color = 'yellow';
        opacity = 0;
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
          commission={commission}
          nominatorinfo={this.props.nominatorinfo}
          history={this.props.history}
          totalinfo={this.props.totalinfo}
          isMainWrapper={this.props.isMainWrapper}
          isKusama={this.props.isKusama}
          intentions={this.props.intentions}
          color={color}
          onIntentionHover={this.props.onIntentionHover}
        />
      </React.Fragment>
    );
  }
}

export default Validator;
