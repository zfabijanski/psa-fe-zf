import React, { FC } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { AxisContainer } from "../../../commons/AxisContainer";
import { getLegendCells } from "./getLegendCells";

interface IProps {
  rangeFrom: number;
  rangeTo: number;
  value: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  position: relative;
  align-self: end;
  height: 70px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  margin: 0px 20px 10px;

  @media only screen and (max-width: 1024px) {
    align-self: center;
  }
`;

const Legend = styled.div<{ gridNum: number }>`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: ${({ gridNum }) => `repeat(${gridNum}, 1fr)`};
  user-select: none;

  span {
    font-size: 16px;
  }

  @media only screen and (max-width: 1280px) {
    span {
      font-size: 13px;
    }
  }

  @media only screen and (max-width: 1024px) {
    span {
      position: absolute;
      left: -2px;
    }
  }
`;

const TimeLine: FC<IProps> = ({ rangeFrom, rangeTo, value, onChange }) => {
  const intl = useIntl();
  const gridNum = rangeTo - rangeFrom + 1;

  const createDots = () => {
    const count = rangeTo - rangeFrom;

    return [
      Array(count)
        .fill(0)
        .map((_, i) => (
          <Dot key={i} style={{ left: `${(i / count) * 100}%` }} />
        )),
      <Dot key={rangeTo} style={{ left: "100%" }} />,
    ];
  };

  return (
    <Container>
      <AxisContainer>
        <Slider>
          <Dots>
            <Arrow
              style={{
                left: `${((value - rangeFrom) / (rangeTo - rangeFrom)) * 100}%`,
              }}
            />
            {createDots()}
          </Dots>
          <input
            type="range"
            value={value}
            min={rangeFrom}
            max={rangeTo}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        </Slider>
      </AxisContainer>
      <Legend gridNum={gridNum}>
        {getLegendCells(
          rangeFrom,
          rangeTo,
          intl.formatMessage({
            id: "commissionSystem.basicCommission.years",
          })
        )}
      </Legend>
    </Container>
  );
};

export default TimeLine;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid ${({ theme }) => theme.newColors.gray100}};
  position: absolute;
  bottom: 35px;
  transform: translateX(-50%);
`;

const Dot = styled.span`
  position: absolute;
  top: 50%;
  margin-top: -2.5px;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: #2f2f2f;

  &:last-of-type {
    width: 0;
    height: 0;
    border: solid;
    border-radius: 0;
    background-color: transparent;
    border-top: 5px solid transparent;
    border-left: 10px solid #2f2f2f;
    border-bottom: 5px solid transparent;
    border-right: none;
    margin-top: -5px;
    margin-left: -5px;
  }
`;

const Dots = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 95%;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  height: 36px;
  border-radius: 15px;
  align-items: center;
  background: #f3f3f3;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    width: 95%;
    margin: auto;
    height: 1px;
    background-color: #2f2f2f;
  }

  & input {
    appearance: none;
    width: 100%;
    background-color: transparent;
  }

  & input::-webkit-slider-thumb {
    appearance: none;
    box-sizing: content-box;
    border: solid 20px ${({ theme }) => theme.newColors.primary100};
    background-color: ${({ theme }) => theme.newColors.white100};
    border-radius: 50%;
    height: 15px;
    width: 15px;
    position: relative;
  }
`;
