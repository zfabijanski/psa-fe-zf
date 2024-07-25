import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Icon } from "../../../../components/UI/Icon";
import { TypoBodyBold } from "../../../../components/UI/typography";
import { TDefaultThemeColor } from "../../../../theme/theme";

const TabDiv = styled.div<IProps>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  border: 1px solid
    ${({ theme, active, color }) => theme.newColors[active ? color : "gray10"]};
  border-bottom: 0;
  background: ${({ theme, active, color }) =>
    theme.newColors[active ? color : "white100"]};
  padding: 16px;

  span {
    color: ${({ theme, active, color }) =>
      theme.newColors[active ? "white100" : color]};
    align-items: center;
  }
`;

const TabText = styled.span`
  text-transform: uppercase;
`;

const RemoveIcon = styled(Icon)`
  margin-left: 18px; ;
`;

interface IProps {
  index: number;
  onClick?: () => void;
  onRemove?: (event: React.MouseEvent) => void;
  color: TDefaultThemeColor;
  active?: boolean;
  checked?: boolean;
}

export const Tab: React.FC<IProps> = ({
  index,
  onClick,
  onRemove,
  color,
  active,
  checked,
}) => (
  <TabDiv
    key={index}
    active={active}
    onClick={onClick}
    color={color}
    index={index}
  >
    <Icon name="file-text" color={active ? "white100" : color} />
    <TabText>
      <TypoBodyBold>
        <FormattedMessage
          id="calculator.illustrationNumber"
          values={{ number: index + 1 }}
        />
      </TypoBodyBold>
    </TabText>
    {checked && <Icon name="check" color={active ? "white100" : color} />}
    {onRemove && (
      <RemoveIcon
        name="trash-2"
        color={active ? "white100" : color}
        onClick={onRemove}
      />
    )}
  </TabDiv>
);
