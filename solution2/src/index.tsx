import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CouncilsProvider from "./providers/councilsProvider/CouncilsProvider";
import Home from "./pages/home/Home";
import ROUTES from "./constants/routes";
import './index.css';

ReactDOM.render(
  <CouncilsProvider>
    <Router>
      <Switch>
        <Route exact path={ROUTES.index}>
          <Home />
        </Route>
        <Redirect to={ROUTES.index} />
      </Switch>
    </Router>
  </CouncilsProvider>,
  document.getElementById('root')
);
