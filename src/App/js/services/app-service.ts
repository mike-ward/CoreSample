import { cssStylesAdd, cssStylesInject } from './css-service';
import { buildRoutes } from './route-service';

export function startApp() {
  // language=css
  cssStylesAdd(
    `body{line-height:1.25}
    .bold{font-weight:bold}
    .italic{font-style:italic}
    .page-title{font-weight:bold;font-size:32px;margin-bottom:0.5em;}`);

  cssStylesInject();
  buildRoutes();
} 