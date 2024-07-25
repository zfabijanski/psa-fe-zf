import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IOnChange, IAnswerTree } from "../Survey.types";

import SelectButton from "components/UI/SelectButton";

interface IProps extends IOnChange {
  children: IAnswerTree[];
  parentPath: string[];
  level: number;
  disabled: boolean;
  questionCode?: string;
}

const Container = styled.div`
  width: 100%;
`;

const Answers = styled.div<{ nesting: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  :not(:last-child) {
    padding-bottom: 24px;
  }
`;

const SurveyTree = (props: IProps) => {
  const answersRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<undefined | number>(undefined);

  const handleChange =
    (code: string, isMain: boolean, parentPath: string[]) => () =>
      props.onChange(code, isMain, parentPath)();

  const getActiveChildren = (children: IAnswerTree[]) =>
    children.filter((child) => child.isActive);

  useLayoutEffect(() => {
    if (answersRef && answersRef.current) {
      const newMaxHeight = Array.from(answersRef.current.children).reduce(
        (acc, elt) => {
          if (acc < elt.getBoundingClientRect().height) {
            return elt.getBoundingClientRect().height;
          }
          return acc;
        },
        0
      );
      setMaxHeight(newMaxHeight);
    }
  }, [answersRef]);

  return (
    <Container>
      <Answers nesting={props.level} ref={answersRef}>
        {props.children.map((elt, _, array) => (
          <SelectButton
            key={elt.code}
            onClick={handleChange(elt.code, elt.isMain, props.parentPath)}
            isApproved={elt.isApproved}
            isActive={elt.isActive}
            text={elt.label}
            disabled={props.disabled}
            height={maxHeight}
            count={array.length}
            questionCode={props.questionCode}
          />
        ))}
      </Answers>
      {getActiveChildren(props.children)
        .filter((child) => child.subanswers.length > 0)
        .map((child) => (
          <SurveyTree
            key={child.code}
            parentPath={[...props.parentPath, child.code]}
            level={props.level + 1}
            children={child.subanswers}
            onChange={props.onChange}
            disabled={props.disabled}
          />
        ))}
    </Container>
  );
};

export default SurveyTree;
