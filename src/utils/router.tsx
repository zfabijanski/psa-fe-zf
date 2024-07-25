import { createBrowserHistory, createMemoryHistory } from "history";
import React from "react";
import styled, { StyledComponent } from "styled-components";

export const browserHistory = createBrowserHistory({
  basename: process.env.NODE_ENV !== "test" ? "/psao" : "/",
});
export const memoryHistory = createMemoryHistory();

export type RoutePath =
  | "/"
  | "/about-prudential"
  | "/business-with-prudential"
  | "/business-with-prudential-slides"
  | "/apk"
  | "/calculator"
  | "/adequacy"
  | "/adequacy-idd"
  | "/bop"
  | "/report-bop"
  | "/idd"
  | "/report-idd"
  | "/create"
  | "/history"
  | "/library"
  | "/meeting"
  | "/mail"
  | "/landing";

export const redirect = (
  to: RoutePath,
  shouldChangeBrowserHistory?: boolean,
  params?: object
) => {
  const routingParams = { fromApp: true, ...params };
  if (shouldChangeBrowserHistory) {
    browserHistory.replace(to, routingParams);
  }
  memoryHistory.push(to, routingParams);
};

export const goBack = () => {
  memoryHistory.goBack();
};

const injectRedirect =
  (to: RoutePath, onClick?: React.MouseEventHandler) =>
  (event: React.MouseEvent) => {
    if (typeof onClick === "function") {
      onClick(event);
    }
    redirect(to);
  };

export type RedirectHoC<P extends { onClick?: React.MouseEventHandler }> = (
  C: React.ComponentType<P>,
  to: RoutePath
) => React.ComponentType<P>;

/**
 * HoC injecting redirect to onClick prop
 *
 * @param C - Component (has to use/pass to children "onClick" prop)
 * @param to - Path to redirect to
 *
 * @example
 * interface SpecificProps {
 *   foo?: string;
 * }
 * interface Props extends SpecificProps {
 *   onClick?: React.MouseEventHandler;
 * }
 * const Button: React.FC<Props> = ({ foo, onClick, children }) => (
 *   <button onClick={onClick}>
 *     {foo}
 *     {children}
 *   </button>
 * );
 * const Home = (withRedirect as RedirectHoC<Props>)(Button, "/");
 * const Foo = (withRedirect as RedirectHoC<React.ComponentProps<typeof Button>>)(Button, "/foo");
 */
export const withRedirect: RedirectHoC<
  object & { onClick?: React.MouseEventHandler }
> =
  (C, to) =>
  ({ onClick, ...props }) => {
    return <C {...props} onClick={injectRedirect(to, onClick)} />;
  };

export type PointerHoC<P extends object> = (
  C: React.ComponentType<P>
) => StyledComponent<React.ComponentType<P>, any, {}, never>;

export const withPointer: PointerHoC<object> = (C) => styled(C)`
  cursor: pointer;
`;

export type LinkHoC<P extends { onClick?: React.MouseEventHandler }> = (
  C: React.ComponentType<P>,
  to: RoutePath
) => StyledComponent<React.ComponentType<P>, any, {}, never>;

/**
 * HoC injecting redirect to onClick prop and adding "cursor: pointer" css
 *
 * @param C - Component (has to use/pass to children "onClick" prop)
 * @param to - Path to redirect to
 *
 * @example
 * interface SpecificProps {
 *   foo?: string;
 * }
 * interface Props extends SpecificProps {
 *   onClick?: React.MouseEventHandler;
 * }
 * const Button: React.FC<Props> = ({ foo, onClick, children }) => (
 *   <button onClick={onClick}>
 *     {foo}
 *     {children}
 *   </button>
 * );
 * const Home = (withLink as LinkHoC<Props>)(Button, "/");
 * const Foo = (withLink as LinkHoC<React.ComponentProps<typeof Button>>)(Button, "/foo");
 */
export const withLink: LinkHoC<object> = (C, to) =>
  withPointer(withRedirect(C, to));
