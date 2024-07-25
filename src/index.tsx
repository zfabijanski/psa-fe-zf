import { createRoot } from "react-dom/client";
import App from "./App";
import { withProvider } from "./utils/redux";
import { loadCurrentVersion } from "./utils/version";

loadCurrentVersion();

const rootElement = document.getElementById("root") || document.body;
const root = createRoot(rootElement);

const AppWithProviders = () => withProvider(App);

root.render(<AppWithProviders />);
