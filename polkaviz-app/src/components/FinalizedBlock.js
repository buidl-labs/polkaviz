import React from "react";
import NumberFormat from "react-number-format";

class FinalizedBlock extends React.Component {
  render() {
    return (
      <div className="finalizedblock">
        <p>block:&nbsp;</p>
        <NumberFormat
          value={this.props.finalblock}
          displayType="text"
          thousandSeparator
        />
      </div>
    );
  }
}

export default FinalizedBlock;
