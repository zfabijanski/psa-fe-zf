import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { redirect } from "./utils/router";
import { LoginState, useInitQuery } from "slices/auth";

const CustomRedirectToLanding = () => {
  useEffect(() => {
    redirect("/landing", true);
  }, []);

  return null;
};

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

    return {
      render: () => <CustomRedirectToLanding />,
    };
  };

  return <Route {...rest} {...getChildrenAndRender()} />;
};

export default ProtectedRoute;
