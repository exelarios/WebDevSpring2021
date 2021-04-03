import React, { useState } from 'react'
import SideNav from './SideNav/SideNav';
import Home from './Home/Home';
import RightSide from './RightSide/RightSide';
import Blog from './Blog/Blog';
import SearchBar from './SearchBar/SearchBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import UploadModal from './RightSide/UploadModal';
import HomeCardModal from './Home/HomeCardModal';
import ThreadCardModal from './Blog/ThreadCardModal';
import ProfileModal from './RightSide/ProfileModal';

export const API_URL = 'http://localhost:5000'

function MainPage() {
    const [sideNavActive, setSideNavActive] = useState(false)
    const [isTop, setisTop] = useState(true)

    const closeSideNav = () => {
        setSideNavActive(false)
    }

    const openSideNav = () => {
        setSideNavActive(true)
    }

    const checkTop = e => {
        const valueisTop = e.target.scrollTop < 60
        setisTop(valueisTop)
    }
        
    const store = '/home/store/upload'
    const blog = '/home/blog/upload'

    return (
        <div id="mainPage" onScroll={checkTop}>
            <SearchBar sideNavActive={sideNavActive} openSideNav={openSideNav} isTop={isTop} />
            <SideNav sideNavActive={sideNavActive} />
            <div onClick={closeSideNav} id="mainContainer">
                <Route path="/home/store" component={Home}/>
                <Route path="/home/blog" component={Blog}/>
                <Route path="/home" component={RightSide}/>
            </div>
            <Switch>
                <Route exact path={(window.location.pathname === '/home/store/upload') ? store : blog} component={UploadModal}/>
                <Route path="/home/store/:id" render={({ match }) => (
                  <HomeCardModal match={match} />
                )}/>
                <Route path="/home/blog/:id" render={({ match }) => (
                  <ThreadCardModal match={match} />
                )}/>
                <Route path="/home/profile/:id" render={() => (
                  <ProfileModal />
                )}/>

            </Switch>
        </div>
    )
}

export default withRouter(MainPage)