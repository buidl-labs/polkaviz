import React from "react";

class Session extends React.Component {
  render() {
    let session = "session"
    if(this.props.isKusama){
      session = "epoch"
    }
    return (
      <div className="session">
        <p>
          {session} : {this.props.sessionProgress}/{this.props.sessionLength}
        </p>
      </div>
    );
  }
}

export default Session;
