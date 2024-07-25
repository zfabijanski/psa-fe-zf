import PageLayout from "../../layouts/PageLayout";
import { goBack, redirect } from "../../utils/router";
import Library from "./Library";

const LibraryContainer = () => {
  const handlePrevButtonClick = () => goBack();
  const handleNextButtonClick = () => redirect("/mail");

  return (
    <PageLayout
      footer={{
        leftSection: [
          { config: "prevButtonConfig", onClick: handlePrevButtonClick },
        ],
        rightSection: [
          {
            config: "getArrowNextConfig",
            message: "bottomButtonBar.email",
            onClick: handleNextButtonClick,
          },
        ],
      }}
      pageName="library.library"
    >
      <Library />
    </PageLayout>
  );
};

export default LibraryContainer;
