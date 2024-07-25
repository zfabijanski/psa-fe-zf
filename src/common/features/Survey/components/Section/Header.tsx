import styled from "styled-components";
import { IHeader } from "../../Survey.types";
import { addNonBreakingSpace } from "utils/formatters";
import { WhiteSpace } from "utils/types";
import { ModalInfoIcon } from "components/UI/ModalInfoIcon";
import { TypoBodyRegular, TypoH4 } from "components/UI/typography";

const StyledHeader = styled.div`
  width: 100%;
`;

const Question = styled.div`
  grid-area: Title;
  margin-bottom: 8px;
  gap: 12px;
  display: flex;
  justify-content: space-between;
`;

const Prompt = styled(TypoBodyRegular)`
  grid-area: Hint;
  margin-bottom: 24px;
`;

const getFormattedText = (content: string) =>
  `<div style="text-align: justify;">${content.replaceAll("	", " ")}</div>`;

export const Header = ({ question, prompt, tooltip }: IHeader) => {
  return (
    <StyledHeader>
      <Question>
        <TypoH4>
          <span
            dangerouslySetInnerHTML={{
              __html: addNonBreakingSpace(
                question,
                WhiteSpace.NonBreakingSpace
              ),
            }}
          />
        </TypoH4>
        {tooltip && (
          <ModalInfoIcon modalHtml={getFormattedText(tooltip)} width={20} />
        )}
      </Question>
      <Prompt>
        <span dangerouslySetInnerHTML={{ __html: prompt }} />
      </Prompt>
    </StyledHeader>
  );
};

export default Header;
