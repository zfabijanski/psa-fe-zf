import React from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteChildrenProps,
  Router,
  Switch,
} from "react-router-dom";
import AdequacyIdd from "./features/AdequacyIdd";
import APK from "./features/APK";
import BOP from "./features/BOP";
import BopReport from "./features/BOP/Report";
import Calculator from "./features/Calculator";
import IDD from "./features/IDD";
import IddReport from "./features/IDD/Report";
import Landing from "./features/Landing/Landing";
import Library from "./features/Library";
import Mail from "./features/Mail";
import MeetingHistory from "./features/Meeting/History";
import MeetingStart from "./features/Meeting/Start";
import Products from "./features/Products";
import AboutPrudential from "./features/PrudentialInfo/AboutPrudential";
import BusinessWithPrudentialSlides from "./features/PrudentialInfo/BusinessWithPrudential";
import BusinessWithPrudential from "./features/PrudentialInfo/BusinessWithPrudential/StartPage";
import Start from "./features/Start";
import ProtectedRoute from "./ProtectedRoute";
import { RootState } from "./AppStore";
import { Status } from "slices/dictionaries";
import { memoryHistory } from "./utils/router";

interface IProps {
  dictionariesStatus: Status;
  bopListsStatus: Status;
}

const AppRoutes: React.FC<IProps> = (props) => {
  const renderLandingOrRedirect = (
    routeComponentProps: RouteChildrenProps<any>
  ): React.ReactNode => {
    const state = routeComponentProps.location.state as Record<string, unknown>;
    console.log("#@#@#@#@#@", state, state.fromApp);

    return !!state && !!state.fromApp ? <Landing /> : <Redirect to="/" />;
  };

  return (
    <Switch>
      <ProtectedRoute path="/" exact={true}>
        <Router history={memoryHistory}>
          <Switch>
            <ProtectedRoute path="/" exact={true} component={Start} />
            <ProtectedRoute path="/calculator" component={Calculator} />
            <ProtectedRoute path="/create" component={MeetingStart} />
            <ProtectedRoute path="/history" component={MeetingHistory} />
            <ProtectedRoute path="/library" component={Library} />
            <ProtectedRoute path="/mail" component={Mail} />
            <ProtectedRoute path="/meeting" component={Products} />
            <ProtectedRoute path="/adequacy-idd" component={AdequacyIdd} />
            <ProtectedRoute path="/bop" component={BOP} />
            <ProtectedRoute path="/report-bop" component={BopReport} />
            <ProtectedRoute path="/apk" component={APK} />
            <ProtectedRoute path="/idd" component={IDD} />
            <ProtectedRoute path="/report-idd" component={IddReport} />
            <ProtectedRoute
              path="/about-prudential"
              component={AboutPrudential}
            />
            <ProtectedRoute
              path="/business-with-prudential"
              component={BusinessWithPrudential}
            />
            <ProtectedRoute
              path="/business-with-prudential-slides"
              component={BusinessWithPrudentialSlides}
            />
          </Switch>
        </Router>
      </ProtectedRoute>
      <Route path="/landing" children={renderLandingOrRedirect} />
      <Redirect to="/" />
    </Switch>
  );
};

const mapStateToProps = ({ dictionaries, bopDropdownLists }: RootState) => ({
  dictionariesStatus: dictionaries.status,
  bopListsStatus: bopDropdownLists.status,
});

export default connect(mapStateToProps)(AppRoutes);
