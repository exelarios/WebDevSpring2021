import './App.css';
import MainPage from './modules/MainPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import EntryPage from './modules/EntryPage/EntryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
                return <Redirect to="/home/store" />
            }}
          />
          <Route path="/home" component={MainPage}/>
          <Route path="/entry" component={EntryPage}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
