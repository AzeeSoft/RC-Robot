import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from '../../App';
import { TitlePage } from "./TitlePage";

ReactDOM.render(
  <App>
    <TitlePage />
  </App>,
  document.querySelector("#root")
); 