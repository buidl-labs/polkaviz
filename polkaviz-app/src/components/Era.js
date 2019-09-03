import React from "react";


class Era extends React.Component {
  render() {
    return (
      <div className="era">
        <p>
          era : {this.props.eraProgress}/{this.props.eraLength}
        </p>
      </div>
    );
  }
}

export default Era;
