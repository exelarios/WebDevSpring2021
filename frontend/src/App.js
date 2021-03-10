import './App.css';
import MainPage from './modules/MainPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import EntryPage from './modules/EntryPage/EntryPage';
import { UserInfoProvider } from './modules/UserInfoContext'

function App() {

  return (
    <Router>
      <UserInfoProvider>
        <div className="App">
          <Switch>
            <Route path="/entry" component={EntryPage}/>
            <Route path="/home" component={MainPage}/>
            <Route
              exact
              path="/"
              render={() => {
                  return <Redirect to="/entry" />
              }}
            />
          </Switch>
        </div>
      </UserInfoProvider>
    </Router>
  );
}


export default App;
