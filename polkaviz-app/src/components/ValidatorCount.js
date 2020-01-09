import React from 'react';

class ValidatorCount extends React.Component {
  render() {
    return (
      <div className="validatorcount">
        <p>
          validators: {this.props.activeValidators}/{this.props.totalValidators}
        </p>
      </div>
    );
  }
}

export default ValidatorCount;
