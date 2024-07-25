import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import prudentialMailSignature from "../../../../../assets/images/prudential-mail-signature.png";
import { ISignature } from "../../../types";

const SignatureImage = styled.img`
  width: 300px;
  margin-bottom: 5px;
`;

const Position = styled.span`
  white-space: pre-wrap;
`;

const Signature: React.FC<ISignature> = (props) => {
  return (
    <div>
      <p>{props.text1}</p>
      {props.text2}
      <br />
      {props.name} {props.surname}
      <br />
      <Position>
        <FormattedMessage id={props.position} />
      </Position>
      <br />
      {props.phoneNumber}
      <br />
      {props.email}
      <br />
      {props.pageURL}
      <br />
      <SignatureImage src={prudentialMailSignature} alt="Prudential" />
    </div>
  );
};

export default Signature;
