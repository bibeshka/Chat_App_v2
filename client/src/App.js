import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Navigator from './components/Navigator';

const App = () => {

  return (
    <Router>
      <div>
        <Navigator />
        <Route path="/" exact component={Home} />
        <Route path="/chat" exact component={Chat} />
      </div>
    </Router>
  );
}

export default App;
