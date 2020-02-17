import React from 'react';
import {Text, Rect} from 'react-konva';

const SpecificInfo = ({ specificValidatorInfo, specificIntentionInfo, commonWidth }) => {
  const commonWidthUpdated = commonWidth / 2 - 120;
  const commonHeight = window.innerHeight / 2;
  return (
    <>
      <Text
        text={specificValidatorInfo && specificValidatorInfo.accountIdText}
        x={commonWidthUpdated}
        y={commonHeight - 100}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
        fontSize={24}
      />
      <Text
        text={
          specificValidatorInfo && specificValidatorInfo.nominatorsStakeText
        }
        x={commonWidthUpdated}
        y={commonHeight - 70}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={
          specificValidatorInfo && specificValidatorInfo.validatorSelfStakeText
        }
        x={commonWidthUpdated}
        y={commonHeight - 50}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={specificValidatorInfo && specificValidatorInfo.totalStakeText}
        x={commonWidthUpdated}
        y={commonHeight - 30}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={specificValidatorInfo && specificValidatorInfo.backersText}
        x={commonWidthUpdated}
        y={commonHeight - 10}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />

      {Object.keys(specificValidatorInfo).length > 0 && (
        <Rect
          x={commonWidthUpdated + 60}
          y={commonHeight + 90}
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
        x={commonWidthUpdated + 65}
        y={commonHeight + 100}
        fontFamily="Roboto Mono"
        fill="#000"
        fontSize={18}
      />

      <Text
        text={Object.keys(specificIntentionInfo).length > 0 && 'Account ID'}
        x={commonWidthUpdated + 20}
        y={commonHeight - 100}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
        fontSize={30}
      />
      <Text
        text={specificIntentionInfo && specificIntentionInfo.accountId}
        x={commonWidthUpdated + 20}
        y={commonHeight - 70}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={specificIntentionInfo && specificIntentionInfo.backersText}
        x={commonWidthUpdated + 20}
        y={commonHeight - 40}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
      <Text
        text={specificIntentionInfo && specificIntentionInfo.selfText}
        x={commonWidthUpdated + 20}
        y={commonHeight - 10}
        fontFamily="Roboto Mono"
        fill="#FFFFFF"
      />
    </>
  );
};

export default SpecificInfo;
