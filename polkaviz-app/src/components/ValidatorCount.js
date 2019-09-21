import React from "react";

class ValidatorCount extends React.Component {
  render() {
    return (
      <div className="validatorcount">
        <p>
          Validators: {this.props.activeValidators}/{this.props.totalValidators}
        </p>
      </div>
    );
  }
}

export default ValidatorCount;
