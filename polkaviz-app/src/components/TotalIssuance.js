import React from "react";

class TotalIssuance extends React.Component {
  render() {
    return (
      <div className="totalissuance">
        <p>totalIssuance: {this.props.totalIssued}</p>
      </div>
    );
  }
}

export default TotalIssuance;
