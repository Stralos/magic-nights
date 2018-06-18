import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../Game';
import Home from '../Home';

class App extends React.Component {
  public render() {
    return (
      <div>
        <h1> Magic Nights! </h1>
        <Switch>
          <Route exact={true} path={'/'} component={Home}/>
          <Route exact={true} path={'/game'} component={Game}/>
        </Switch>
      </div>
    );
  }
}

export default App;
