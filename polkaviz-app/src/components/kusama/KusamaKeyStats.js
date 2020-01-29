import React from 'react';
import './keystats.css';
const KusamaKeyStats = ({
  activeValidators = '--',
  totalValidators = '--',
}) => {
  return (
    <div className={'box'}>
      <div>
        <p className="content">
          validators: {activeValidators}/
          {totalValidators === 0 ? '--' : totalValidators}
        </p>
      </div>
    </div>
  );
};

export default KusamaKeyStats;
