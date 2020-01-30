import React from 'react';
import Counter from '../Counter';
import NumberFormat from 'react-number-format';
import "../../css/style.css";
import ContentLoader from "react-content-loader";

const MyLoader = ({width=140, height=20}) => (
  <ContentLoader speed={1.8} animate={true} viewBox={`0 0 380 ${height + 15}`} backgroundColor="#333">
    <rect x="0" y="0" rx="4" ry="4" width={width} height={height} />
  </ContentLoader>
)

const KusamaKeyStats = ({keyStats}) => {
  return (
    <div className="keyStats">
    <div className="keyStats-Container">
      <h4 style={{textAlign: "center", fontSize: 22}}>Key Stats</h4>
      <hr style={{margin: '5px 0'}}/>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Validators</p>
        <p className="keyStats-List-Content">
        {keyStats.validatorCount > 0 && keyStats.validatorTotalCount > 0 ?
        <span>{keyStats.validatorCount}/{keyStats.validatorTotalCount}</span>
        : <MyLoader />}
        </p>
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
        {keyStats.finalBlock > 0 ?
        <NumberFormat
          value={keyStats.finalBlock}
          displayType={'text'}
          thousandSeparator={true}
        />
        : <MyLoader />}
        </p>
      </div>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Epoch</p>
        <p className="keyStats-List-Content">
        {keyStats.sessionProgress > 0 && keyStats.sessionLength > 0 ?
        <span>{keyStats.sessionProgress}/{keyStats.sessionLength}</span>
        : <MyLoader />}
        </p>
      </div>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Era</p>
        <p className="keyStats-List-Content">
        {keyStats.eraProgress > 0 && keyStats.eraLength > 0 ?
        <span>{keyStats.eraProgress}/{keyStats.eraLength}</span>
        : <MyLoader />}
        </p>
      </div>
      <div className="keyStats-List">
        <p className="keyStats-List-Header">Total Issuance</p>
        <p className="keyStats-List-Content">
        {keyStats.totalIssued.length > 2 ? 
        <span>{keyStats.totalIssued}</span>
        : <MyLoader />}
        </p>
      </div>
    </div>
  </div>
  );
};

export default KusamaKeyStats;
