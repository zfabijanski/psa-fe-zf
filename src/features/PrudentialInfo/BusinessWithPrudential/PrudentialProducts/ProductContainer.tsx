import { FC, ReactNode, PropsWithChildren } from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import PruText from "../../../../components/UI/PruText/PruText";
import { showModal } from "slices/modal";

const Container = styled.div<Omit<IProps, "title" | "modalContent">>`
  border-radius: 7px;
  padding: 20px 0 20px 20px;
  :hover {
    background-color: ${({ theme }) => theme.colors.backgroundMain};
    cursor: pointer;
  }

  & > span {
    align-self: center;
  }

  & > div {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignContent }) => alignContent};
  }

  @media only screen and (max-width: 1280px) {
    grid-template-rows: 64px 1fr;
    & > span {
      font-size: 24px;
    }
  }

  @media only screen and (max-width: 1024px) {
    grid-template-rows: 100px 1fr;
  }
`;

type ModalContent = {
  header: MessageDescriptor;
  children: ReactNode;
  confirmText: string | MessageDescriptor;
};

interface IProps {
  title: string;
  alignContent?: "center" | "flex-start" | "flex-end";
  justifyContent?:
    | "space-between"
    | "space-around"
    | "center"
    | "flex-start"
    | "flex-end";
  modalContent: ModalContent;
}

const ProductContainer: FC<PropsWithChildren<IProps>> = ({
  children,
  title,
  alignContent,
  justifyContent,
  modalContent,
}) => {
  const dispatch = useDispatch();

  const openProductDetailsModal = (content: ModalContent) => () => {
    dispatch(
      showModal({
        modalTitleTrKey: content.header.id,
        modalContent: content.children,
      })
    );
  };

  return (
    <Container
      alignContent={alignContent}
      justifyContent={justifyContent}
      onClick={openProductDetailsModal(modalContent)}
    >
      <PruText fontSize={26}>
        <FormattedMessage id={title} />
      </PruText>
      <div>{children}</div>
    </Container>
  );
};

ProductContainer.defaultProps = {
  alignContent: "center",
};

export default ProductContainer;
