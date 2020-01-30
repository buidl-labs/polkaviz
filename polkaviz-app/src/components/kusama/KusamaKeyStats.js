import React from 'react';
import Counter from '../Counter';
import NumberFormat from 'react-number-format';
import "../../css/style.css";

const KusamaKeyStats = ({keyStats}) => {
  return (
    <div className="keyStats">
    <div className="keyStats-Container">
      <h4 style={{textAlign: "center", fontSize: 22}}>Key Stats</h4>
      <hr style={{margin: '5px 0'}}/>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Validators</p>
        <p className="keyStats-List-Content">{keyStats.validatorCount}/{keyStats.validatorTotalCount}</p>
      </div>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Last Block</p>
        <p className="keyStats-List-Content">
          <Counter start={keyStats.lastBlockCounter} />
        </p>
      </div>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Block</p>
        <p className="keyStats-List-Content">
        <NumberFormat
          value={keyStats.finalBlock}
          displayType={'text'}
          thousandSeparator={true}
        />
        </p>
      </div>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Epoch</p>
        <p className="keyStats-List-Content">
        {keyStats.sessionProgress}/
        {keyStats.sessionLength}
        </p>
      </div>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Era</p>
        <p className="keyStats-List-Content">
        {keyStats.eraProgress}/{keyStats.eraLength}
        </p>
      </div>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Total Issuance</p>
        <p className="keyStats-List-Content">{keyStats.totalIssued}</p>
      </div>
    </div>
  </div>
  );
};

export default KusamaKeyStats;
