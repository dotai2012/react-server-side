import React, { Component } from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';

import RouteApp from '../../front/route';

export default function (req, store, preloadedState, context) {
  const helmet = Helmet.renderStatic();
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.path}>
          {renderRoutes(RouteApp)}
      </StaticRouter>
    </Provider>,
  );
  return `<!DOCTYPE html><!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]--><!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]--><!--[if IE 8]><html class="no-js lt-ie9"><![endif]--><!--[if gt IE 8]><!--><html class=no-js><!--<![endif]--><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><title>${helmet.title.toString()}</title><meta name=description content><meta name=viewport content="width=device-width, initial-scale=1"><base href=/><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css"></head><body><!--[if lt IE 7]><p class=browsehappy>You are using an <strong>outdated</strong> browser. Please <a href=#>upgrade your browser</a> to improve your experience.</p><![endif]--><body><div><div id=root>${content}</div></div></body><script>
  // WARNING: See the following for security issues around embedding JSON in HTML:
  // http://redux.js.org/recipes/ServerRendering.html#security-considerations
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
</script><script src=./build/bundle.js></script><script src=./build/vendor.js></script></body></html>`;
}
