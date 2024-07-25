import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import AppRoutes from "./AppRoutes";

import { TypoH2, TypoH4, TypoTitle } from "components/UI/typography";
import PageLayout from "layouts/PageLayout";
import ConfirmModalContainer from "./components/UI/ConfirmModal/ConfirmModalContainer";
import ErrorMessage from "./components/UI/ErrorMessage";
import FullscreenSpinnerContainer from "./components/UI/FullscreenSpinner/FullscreenSpinnerContainer";
import { Modal } from "./components/UI/Modal";
import OneTab from "./features/OneTab/OneTab";
import I18nProvider from "./I18nProvider";
import { init } from "./services/init";
import { initSession } from "./services/login";
import { getTranslations, Locale, Status } from "slices/translations";
import { getApiVersion } from "./services/versions";
import { RootState } from "./AppStore";
import GlobalStyles from "./theme/globalStyles";
import { theme } from "./theme/theme";
import { IApiError } from "utils/api";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "slices/fullscreenSpinner";
import { redirect } from "utils/router";

interface IProps {
  getTranslations: (locale: Locale) => void;
  initSession: (onErrorCallback: (error: IApiError) => void) => void;
  getApiVersion: () => void;
  showFullscreenSpinner: () => void;
  hideFullscreenSpinner: () => void;
  init: () => void;
  translationsStatus: Status;
  dictionariesStatus: Status;
}

const AppContainer = styled.div`
  min-width: 1024px;
  min-height: 300px;
  height: 100%;
  width: 100%;
`;
const AppErrorContainer = styled(AppContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 16vh;
`;

function App(props: IProps) {
  const [apiError, setApiError] = useState<IApiError>();

  useEffect(() => {
    props.showFullscreenSpinner();
    props.getApiVersion();

    Promise.resolve()
      .then(() => props.getTranslations(Locale.PL))
      .then(() => props.initSession(setApiError))
      .then(() => props.init())
      .then(() => redirect("/", true))
      .catch((err) => {
        const error: IApiError = err?.toJSON?.() ?? err;

        if (error && error.status !== 401) {
          setApiError(error);
        }
      })
      .finally(() => props.hideFullscreenSpinner());

    // It should mimic componentDidMount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <I18nProvider>
        <Normalize />
        <GlobalStyles />

        {apiError ? (
          <PageLayout>
            <AppErrorContainer>
              <TypoTitle>{apiError.status}</TypoTitle>
              <TypoH2>{apiError.message}</TypoH2>
              <TypoH4>{apiError.uuid}</TypoH4>
            </AppErrorContainer>
          </PageLayout>
        ) : (
          <AppContainer>
            <ConfirmModalContainer />
            <FullscreenSpinnerContainer />
            <div id="modal" />
            {props.translationsStatus === Status.Error && (
              <ErrorMessage message="Nie udało się wczytać aplikacji. Jeżeli potrzebujesz pomocy skontaktuj się z help-desk pod numerem: 459-595-100." />
            )}
            {props.dictionariesStatus === Status.Error && (
              <ErrorMessage message="Nie udało się uruchomić aplikacji. Jeżeli potrzebujesz pomocy skontaktuj się z help-desk pod numerem: 459-595-100." />
            )}
            {props.translationsStatus === Status.Loaded && (
              <OneTab>
                <AppRoutes />
                <Modal />
              </OneTab>
            )}
          </AppContainer>
        )}
      </I18nProvider>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ translations, dictionaries }: RootState) => ({
  translationsStatus: translations.status,
  dictionariesStatus: dictionaries.status,
});

const mapDispatchToProps = {
  getTranslations,
  getApiVersion,
  initSession,
  init,
  showFullscreenSpinner,
  hideFullscreenSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
