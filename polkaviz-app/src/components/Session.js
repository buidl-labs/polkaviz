import React from "react";

class Session extends React.Component {
  render() {
    return (
      <div className="session">
        <p>
          session : {this.props.sessionProgress}/{this.props.sessionLength}
        </p>
      </div>
    );
  }
}

export default Session;
