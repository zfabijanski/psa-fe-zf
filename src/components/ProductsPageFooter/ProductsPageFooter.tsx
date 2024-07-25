import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Footer from "../../layouts/components/Footer/Footer";
import PruButton from "../../components/UI/PruButton/PruButton";
import { IddReportName } from "../../features/Products/types";
import { getArrowNextConfig } from "../../utils/buttonsPropsFactory";
import { redirect, RoutePath } from "../../utils/router";

export interface IProductPageFooterProps {
  isNeedsAnalysisDone?: boolean;
  prevButtonVisible?: boolean;
  onPrevButtonClick?: () => void;
  onOpenConfirmModal?: (onConfirm: () => void) => void;
  haveIdd?: boolean;
  onEAppButtonClick?: () => void;
  footerBlockerVisible?: boolean;
  onFooterBlockerClick?: () => void;
}

export const ProductsPageFooter: React.FC<IProductPageFooterProps> = ({
  isNeedsAnalysisDone,
  prevButtonVisible = true,
  onPrevButtonClick = () => undefined,
  onOpenConfirmModal,
  haveIdd = false,
  onEAppButtonClick = () => undefined,
  footerBlockerVisible,
  onFooterBlockerClick,
}) => {
  const handleOnClick = (redirectTo: RoutePath) => () => {
    if (onOpenConfirmModal) {
      onOpenConfirmModal(() => redirect(redirectTo));
    } else {
      redirect(redirectTo);
    }
  };

  const iddUrl = haveIdd
    ? { pathname: "/report-idd", state: { report: IddReportName.IDD } }
    : "/adequacy-idd";

  return (
    <Footer
      footerBlockerVisible={footerBlockerVisible}
      onFooterBlockerClick={onFooterBlockerClick}
      leftSection={
        prevButtonVisible && [
          {
            config: "prevButtonConfig",
            onClick: onPrevButtonClick,
          },
        ]
      }
      rightSection={
        <>
          <PruButton buttonType="secondary" onClick={handleOnClick("/library")}>
            <FormattedMessage id={"bottomButtonBar.library"} />
          </PruButton>
          <PruButton buttonType="secondary" onClick={onEAppButtonClick}>
            <FormattedMessage id={"bottomButtonBar.application"} />
          </PruButton>
          <Link to={iddUrl} key={"idd"}>
            <PruButton
              buttonType="secondary"
              icon={haveIdd ? "check" : null}
              iconPosition="right"
            >
              <FormattedMessage id={"idd.title"} />
            </PruButton>
          </Link>
          {isNeedsAnalysisDone !== undefined && (
            <Link to="/apk" key={"apk"}>
              <PruButton
                buttonType="secondary"
                icon={isNeedsAnalysisDone ? "check" : null}
                iconPosition="right"
              >
                <FormattedMessage id={"apk.title"} />
              </PruButton>
            </Link>
          )}
          <PruButton
            {...getArrowNextConfig("bottomButtonBar.email")}
            onClick={handleOnClick("/mail")}
          />
        </>
      }
    />
  );
};

export default ProductsPageFooter;
