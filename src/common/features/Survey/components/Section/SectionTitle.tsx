import styled from "styled-components";

interface ITitle {
  title: string;
}

const Title = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 26px;
  text-align: center;
  font-weight: 700;
`;

const SectionTitle = ({ title }: ITitle) => {
  return <Title>{title}</Title>;
};

export default SectionTitle;
