import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import CouncillorsProvider from "./providers/councillorsProvider/CouncillorsProvider";
import CouncilsProvider from "./providers/councilsProvider/CouncilsProvider";
import CouncilsPage from "./pages/councils/CouncilsPage";
import CouncillorsPage from "./pages/councillors/CouncillorsPage";
import ROUTES from "./constants/routes";
import theme from "./theme";
import './index.css';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CouncillorsProvider>
      <CouncilsProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path={ROUTES.index}>
              <CouncillorsPage />
            </Route>
            <Route exact path={ROUTES.councillors}>
              <CouncillorsPage />
            </Route>
            <Route exact path={ROUTES.councils}>
              <CouncilsPage />
            </Route>
            <Redirect to={ROUTES.index} />
          </Switch>
        </Router>
      </CouncilsProvider>
    </CouncillorsProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
