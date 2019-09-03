import React from "react";

class FinalizedBlock extends React.Component {
  render() {
    return (
      <div className="finalizedblock">
        <p>finalized: {this.props.finalblock} </p>
      </div>
    );
  }
}

export default FinalizedBlock;
