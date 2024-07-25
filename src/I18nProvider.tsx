import moment from "moment";
import "moment/locale/pl";
import { FC, PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { Locale, TranslationMessages } from "slices/translations";
import { RootState } from "./AppStore";

const setMomentJsLocale = (locale: Locale) => {
  moment.locale(locale);
  moment.relativeTimeThreshold("M", 12);
};

interface IProps {
  locale: Locale;
  messages: TranslationMessages;
}

const I18nProvider: FC<PropsWithChildren<IProps>> = (props) => {
  const { locale, messages, children } = props;
  return (
    <IntlProvider
      onError={!!process.env.REACT_APP_INTL_DEBUG ? undefined : () => {}}
      locale={locale}
      messages={messages}
      key={locale}
    >
      {children}
    </IntlProvider>
  );
};

const mapStateToProps = (state: RootState): IProps => {
  const currentLocale = state.translations.currentLocale;
  setMomentJsLocale(currentLocale);
  return {
    locale: currentLocale,
    messages: state.translations.translations[currentLocale],
  };
};

export default connect(mapStateToProps)(I18nProvider);
