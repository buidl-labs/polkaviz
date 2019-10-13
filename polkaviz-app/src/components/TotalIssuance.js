import React from 'react'

class TotalIssuance extends React.Component {
    render() {
      return (
        <div className="totalissuance">
          <p>
            Total Issuance: {this.props.totalIssued} K
          </p>
        </div>
      );
    }
  }
  
  export default TotalIssuance;
  