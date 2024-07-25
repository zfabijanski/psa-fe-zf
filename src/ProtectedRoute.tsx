import React from "react";
import { connect } from "react-redux";
import { Route, RouteProps } from "react-router-dom";
import { RootState } from "./AppStore";
import { redirect } from "./utils/router";

interface IProps {
  isAuthenticated: boolean;
}

const ProtectedRoute = ({
  component,
  children,
  isAuthenticated,
  ...rest
}: IProps & RouteProps) => {
  const getChildrenAndRender = (): Partial<RouteProps> => {
    if (isAuthenticated) {
      if (children) {
        return { children };
      } else if (component) {
        return {
          render: (props) => React.createElement(component, props),
        };
      }
    }

    redirect("/landing", true);
    return {};
  };

  return <Route {...rest} {...getChildrenAndRender()} />;
};

const mapStateToProps = ({ auth }: RootState) => ({
  isAuthenticated: !!auth.info,
});

export default connect(mapStateToProps)(ProtectedRoute);
