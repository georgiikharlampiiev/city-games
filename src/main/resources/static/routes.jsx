import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Statistic from "./view/statistic.jsx";
import MainApp from "./MainApp.jsx";
import { Games } from "./view/games.jsx";
import { GameView } from "./view/game-view.jsx";
import { GamePlay } from "./view/game-play.jsx";
import { GameEdit } from "./view/game-edit.jsx";
import { MyProfile } from "./view/myprofile.jsx";
import { About } from "./view/about.jsx";
import { Team } from "./view/team.jsx";

const routes = (
    <Route path="/" component={MainApp}>
        <IndexRoute component={Games}  />
        <Route path="statistic" component={Statistic} />
        <Route path="games" component={Games} />
        <Route path="myprofile" component={MyProfile} />
        <Route path="about" component={About} />
        <Route path="game-view/:gameId" component={GameView} />
        <Route path="game-play/:gameId" component={GamePlay} />
        <Route path="game-edit/:gameId" component={GameEdit} />
        <Route path="team" component={Team} />
    </Route>
);

export default routes;