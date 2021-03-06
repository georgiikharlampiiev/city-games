import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Statistic from "./view/statistic.jsx";
import MainApp from "./MainApp.jsx";
import App from "./view/app.jsx";


const routes = (
    <Route path="/" component={MainApp}>
        <IndexRoute component={App}  />
        <Route path="statistic" component={Statistic} />
        <Route path="users" component={App} />
    </Route>
);

export default routes;