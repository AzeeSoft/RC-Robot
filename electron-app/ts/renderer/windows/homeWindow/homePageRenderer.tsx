import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from '../../App';
import { HomePage } from './HomePage';

ReactDOM.render(
  <App>
    <HomePage />
  </App>,
  document.querySelector("#root")
); 