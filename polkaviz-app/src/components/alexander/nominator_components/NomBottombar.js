import React from "react";

class NomBottombar extends React.Component {
  render() {
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    return (
      <>
        <div className="controllername">{this.props.controllername}</div>
        <div className="bondvalue">{this.props.bondvalue}</div>
      </>
    );
  }
}

export default NomBottombar;
