import { FormattedMessage, MessageDescriptor } from "react-intl";
import styled from "styled-components";

const WrappingDiv = styled.div`
  max-width: 1140px;
  padding: 0 20px;
  margin: 96px auto;
`;

export const Header = styled.h1`
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  padding-bottom: 48px;
  margin-bottom: 48px;
  color: ${({ theme }) => theme.newColors.neutral100Default};
  border-bottom: 1px solid ${({ theme }) => theme.newColors.gray30};
  width: 100%;
`;

const SubHeader = styled.h3`
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  color: ${({ theme }) => theme.newColors.neutral100Default};
`;

const List = styled.ul`
  font-size: 20px;
  line-height: 24px;
  list-style-type: disc;
  list-style-position: outside;
  margin-left: 14px;
  padding-left: 14px;
  color: ${({ theme }) => theme.newColors.gray100};

  li {
    margin-top: 24px;
  }
`;

/* FIXME: tymczasowo trzymamy drugą taką samą deklarację typu; trzeba zrobić aby była jedna */
export interface IFormalInfoContentProps {
  header: MessageDescriptor;
  subheader: MessageDescriptor;
  list: MessageDescriptor[];
}

const FormalInfoContent = (props: IFormalInfoContentProps) => (
  <WrappingDiv>
    <Header>
      <FormattedMessage
        id={props.header.id}
        defaultMessage={props.header.defaultMessage}
      />
    </Header>
    <SubHeader>
      <FormattedMessage
        id={props.subheader.id}
        defaultMessage={props.subheader.defaultMessage}
      />
    </SubHeader>
    <List>
      {props.list.map((element, idx) => (
        <li key={idx}>
          <FormattedMessage
            id={element.id}
            defaultMessage={element.defaultMessage}
          />
        </li>
      ))}
    </List>
  </WrappingDiv>
);

export default FormalInfoContent;
