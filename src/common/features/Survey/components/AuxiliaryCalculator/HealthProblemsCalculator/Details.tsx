import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";
import ScrollableContainer from "components/UI/ScrollableContainer/ScrollableContainer";

export interface IDetailsProps {
  details: string[];
  image: string;
}

export const Details = (props: IDetailsProps) => {
  return (
    <ScrollableContainer>
      <Container>
        <Image src={props.image} alt={""} />
        <List>
          {props.details.map((elt) => (
            <Li key={elt}>
              <FormattedMessage id={elt} />
            </Li>
          ))}
        </List>
      </Container>
    </ScrollableContainer>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Image = styled.img`
  margin: 20px;
`;

const List = styled.ul`
  text-align: left;
`;

const Li = styled.li`
  margin-bottom: 15px;
`;
