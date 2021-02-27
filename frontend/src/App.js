import './App.css';
import MainPage from './modules/MainPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import EntryPage from './modules/EntryPage/EntryPage';
import useLocalStorage from './modules/hooks/useLocalStorage';

function App() {
  const [token, setToken] = useLocalStorage('token')

  return (
    <Router>
      <div className="App">
        <Route
          exact
          path="/"
          render={() => {
              return <Redirect to="/home/store" />
          }}
        />
        <Switch>
          <Route
           path="/home" 
           render={() => (
              <MainPage token={token} setToken={setToken}/>
            )}/>
          <Route 
            path="/entry" 
            render={() => (
              <EntryPage setToken={setToken}/>
            )}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
