import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Forecast } from './pages/Forecast';
import { Weather } from './pages/Weather';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Weather />
              </Route>
              <Route exact path="/forecast">
                <Forecast />
              </Route>
            </Switch>
          </Router>
        </div>
      </MuiPickersUtilsProvider>
    </QueryClientProvider>
  );
}

export default App;
