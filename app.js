import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import { matchRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import proxy from 'express-http-proxy';

import axios from 'axios';
import RouteApp from './src/front/route';
import renderApp from './src/back/service/render';
import reducers from './src/front/reducers';

// const passport = require('passport');

// const cookieSession = require('cookie-session');
// const bluebird = require('bluebird');

// const mongoose = require('mongoose');
// const database = require('./src/back/config/database');
// const key = require('./src/back/config/key');

// mongoose.Promise = bluebird;
// mongoose.connect(database.url, { useNewUrlParser: true });
// mongoose.connection.on('connected', () => {
//   console.log('Connected to database');
// });
// mongoose.connection.on('error', (error) => {
//   console.log(error);
// });

const app = express();
const port = 3000;

app.use(compression({ level: 9 }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000 * 12,
//   keys: [key.cookie],
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// require('./src/back/service/auth')(passport);

// const api = require('./src/back/route');

// app.use('/api', api);

app.use('/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    // Handle potential security errors with google oauth flow to API server
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    },
  }));

app.use('/build', express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com/',
    headers: { Cookie: req.cookies || '' },
  });
  const store = createStore(reducers, applyMiddleware(reduxThunk.withExtraArgument(axiosInstance)));
  const promise = matchRoutes(RouteApp, req.path).map(({ route }) => (route.loadData ? route.loadData(store) : null));
  let preloadedState;
  const context = {};
  const content = () => renderApp(req, store, preloadedState, context);

  Promise.all(promise).then(() => {
    preloadedState = store.getState();
    if (context.notFound) {
      res.status(404);
    }
    if (context.url) {
      res.redirect(301, context.url);
    }
    res.send(content());
  }).catch((err) => {
    preloadedState = store.getState();
    res.status(err.response.status).send(content());
  });
});

app.listen(port, () => {
  console.log('Server Started');
});
