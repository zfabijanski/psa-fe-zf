import React from "react";
import { Provider } from "react-redux";
import rootStore from "../AppStore";
import { BrowserRouter, Router } from "react-router-dom";
import { browserHistory } from "./router";

export function withProvider(Component: React.ComponentType) {
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <Router history={browserHistory}>
          <Component />
        </Router>
      </BrowserRouter>
    </Provider>
  );
}
