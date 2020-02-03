import React from 'react';
import {Text, Rect} from 'react-konva';

const SpecificInfo = ({ specificValidatorInfo, specificIntentionInfo }) => {
  return (
    <>
      <Text
        text={specificValidatorInfo && specificValidatorInfo.accountIdText}
        x={window.innerWidth - 680}
        y={window.innerHeight - 500}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
        fontSize={24}
      />
      <Text
        text={
          specificValidatorInfo && specificValidatorInfo.nominatorsStakeText
        }
        x={window.innerWidth - 670}
        y={window.innerHeight - 470}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={
          specificValidatorInfo && specificValidatorInfo.validatorSelfStakeText
        }
        x={window.innerWidth - 650}
        y={window.innerHeight - 450}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={specificValidatorInfo && specificValidatorInfo.totalStakeText}
        x={window.innerWidth - 660}
        y={window.innerHeight - 430}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={specificValidatorInfo && specificValidatorInfo.backersText}
        x={window.innerWidth - 650}
        y={window.innerHeight - 410}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />

      {Object.keys(specificValidatorInfo).length > 0 && (
        <Rect
          x={window.innerWidth - 620}
          y={window.innerHeight - 315}
          width={100}
          height={50}
          cornerRadius={4.69457}
          fill={'#fff'}
          shadowOffsetY={5}
          shadowOffsetX={5}
          shadowBlur={5}
          shadowColor="#ddd"
          shadowOpacity={0.5}
          onMouseOver={() => {
            document.body.style.cursor = 'pointer';
          }}
        />
      )}
      <Text
        onClick={() => {
          window.open(
            `https://polkanalytics.com/#/kusama/validator/${specificValidatorInfo.validatorAddress}`,
          );
        }}
        onMouseOver={() => {
            document.body.style.cursor = 'pointer';
        }}
        onMouseDown={() => {
            document.body.style.cursor = 'default';
        }}
        text={Object.keys(specificValidatorInfo).length > 0 && 'Explore'}
        x={window.innerWidth - 610}
        y={window.innerHeight - 300}
        fontFamily="Roboto Mono"
        fill="#000"
        fontSize={18}
      />

      <Text
        text={Object.keys(specificIntentionInfo).length > 0 && 'Account ID'}
        x={window.innerWidth - 655}
        y={window.innerHeight - 510}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
        fontSize={30}
      />
      <Text
        text={specificIntentionInfo && specificIntentionInfo.accountId}
        x={window.innerWidth - 650}
        y={window.innerHeight - 470}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={specificIntentionInfo && specificIntentionInfo.backersText}
        x={window.innerWidth - 650}
        y={window.innerHeight - 450}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={specificIntentionInfo && specificIntentionInfo.selfText}
        x={window.innerWidth - 650}
        y={window.innerHeight - 430}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
    </>
  );
};

export default SpecificInfo;
