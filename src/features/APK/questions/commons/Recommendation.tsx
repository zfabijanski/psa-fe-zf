import { FC, PropsWithChildren } from "react";
import styled from "styled-components/macro";
import { formatCurrency } from "../../../../utils/transformers";

interface IProps {
  title?: string;
  amount?: number;
  textAlign?: "left" | "center";
}

const Recommendation: FC<PropsWithChildren<IProps>> = (props) => {
  return (
    <Wrapper textAlign={props.textAlign}>
      {props.children || (
        <>
          <p>{props.title}</p>
          <Bolded>{formatCurrency(props.amount)}</Bolded>
        </>
      )}
    </Wrapper>
  );
};

export default Recommendation;

const Wrapper = styled.div<Pick<IProps, "textAlign">>`
  padding: 32px;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "center")};
  color: ${({ theme }) => theme.newColors.white100};
  background-color: ${({ theme }) => theme.newColors.primary100};
  font-size: 20px;
  line-height: 24px;
`;

const Bolded = styled.span`
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
`;
