import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserInfoProvider } from './modules/UserInfoContext'
import RedirectPage from './modules/RedirectPage';

function App() {

  return (
    <Router>
      <UserInfoProvider>
        <div className="App">
          <RedirectPage />
        </div>
      </UserInfoProvider>
    </Router>
  );
}


export default App;
