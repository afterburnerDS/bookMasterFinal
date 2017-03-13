import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Chrome from './components/chrome';
import Home from './components/home';
import Board from './components/board';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Chrome}>
            <IndexRoute component={Home} />
            <Route path="/board/:boardId" component={Board} />
        </Route>
    </Router>
);
