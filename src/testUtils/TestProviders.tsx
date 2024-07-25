import { render, RenderOptions } from "@testing-library/react";
import { FC, PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import GlobalStyles from "theme/globalStyles";
import { theme } from "theme/theme";
import rootStore, { configureStore, rootReducer as reducer } from "AppStore";
import { BrowserRouter } from "react-router-dom";
import { Modal } from "components/UI/Modal";
import { IntlProvider } from "react-intl";
import { plMessages } from "translations/pl";
import I18nProvider from "I18nProvider";

interface TestProvidersProps {
  store?: typeof rootStore;
  renderModal?: boolean;
  realIntlProvider?: boolean;
}

export const addTestProviders =
  ({
    store = configureStore({ reducer }),
    renderModal = true,
    // @TODO: update tests to use realIntlProvider everywhere
    realIntlProvider = false,
  }: TestProvidersProps): FC<PropsWithChildren<{}>> =>
  ({ children }) => {
    const TranslationsProvider = realIntlProvider ? IntlProvider : I18nProvider;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <TranslationsProvider locale="pl" messages={plMessages}>
              <Normalize />
              <GlobalStyles />
              {children}
              {renderModal && <Modal />}
            </TranslationsProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  };

const customRender = (
  ui: ReactElement,
  options: Omit<RenderOptions, "options"> = {},
  testProviderOptions: TestProvidersProps = {}
) => render(ui, { wrapper: addTestProviders(testProviderOptions), ...options });

export * from "@testing-library/react";

// override render method
export { customRender as render };
