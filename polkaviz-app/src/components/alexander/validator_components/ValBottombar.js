import React from "react";

class ValBottombar extends React.Component {
  render() {
    return (
      <>
        <div className="totalbonded">{this.props.totalbondedtext}</div>
        <div className="selfbonded">{this.props.selfbondedtext}</div>
        <div className="nominatorbonded">{this.props.nominatorbondedtext}</div>
      </>
    );
  }
}

export default ValBottombar;
