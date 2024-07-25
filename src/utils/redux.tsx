import React from "react";
import { Provider } from "react-redux";
import rootStore from "../AppStore";

export function withProvider(Component: React.ComponentType) {
  return (
    <Provider store={rootStore}>
      <Component />
    </Provider>
  );
}
