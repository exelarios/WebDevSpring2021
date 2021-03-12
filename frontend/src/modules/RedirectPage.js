import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import EntryPage from './EntryPage/EntryPage';
import MainPage from './MainPage';
import { UserInfo } from './UserInfoContext'

function RedirectPage() {
    const { token } = UserInfo()

    return (
        <Switch>
            <Route path="/home" component={MainPage}/>
            <Route path="/entry" component={EntryPage}/>
            <Route
              exact
              path="/"
              render={() => {
                  return (token === "none") ? <Redirect to="/entry" /> : <Redirect to="/home/store" />
              }}
            />
        </Switch>
    )
}

export default RedirectPage