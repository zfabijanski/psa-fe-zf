import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { redirect } from "./utils/router";
import { LoginState, useInitQuery } from "slices/auth";

const ProtectedRoute = ({ component, children, ...rest }: RouteProps) => {
  const { data } = useInitQuery();

  const getChildrenAndRender = (): Partial<RouteProps> => {
    if (data?.loginState === LoginState.Success) {
      if (children) {
        return { children };
      } else if (component) {
        return {
          render: (props) => React.createElement(component, props),
        };
      }
    }

    redirect("/landing", true);
    return { render: () => React.createElement("div", rest) };
  };

  return <Route {...rest} {...getChildrenAndRender()} />;
};

export default ProtectedRoute;
