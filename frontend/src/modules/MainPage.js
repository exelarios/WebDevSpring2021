import React, { useState, useEffect } from 'react'
import SideNav from './SideNav/SideNav';
import Home from './Home/Home';
import RightSide from './RightSide/RightSide';
import Blog from './Blog/Blog';
import SearchBar from './SearchBar/SearchBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import UploadModal from './RightSide/UploadModal';
import HomeCardModal from './Home/HomeCardModal';
import ThreadCardModal from './Blog/ThreadCardModal';

export const API_URL = 'http://localhost:5000'

function MainPage() {
    const [sideNavActive, setSideNavActive] = useState(true)
    const [isTop, setisTop] = useState(true)

    

    const closeSideNav = () => {
        setSideNavActive(false)
    }

    const openSideNav = () => {
        setSideNavActive(true)
    }

    const checkTop = () => {
        const valueisTop = window.scrollY < 30
        setisTop(valueisTop)
    }

    useEffect(() => {
        window.addEventListener('scroll', checkTop);

        return function cleanup() {
            window.removeEventListener('scroll', checkTop)
        }
    }, []) 
        
    

    const store = '/home/store/upload'
    const blog = '/home/blog/upload'

    return (
        <div id="mainPage">
            <SearchBar sideNavActive={sideNavActive} openSideNav={openSideNav} isTop={isTop} />
            <SideNav sideNavActive={sideNavActive} />
            <div onClick={closeSideNav}id="mainContainer">
                <div id="buffer"></div>
                <Route exact path="/home/store" component={Home}/>
                <Route exact path="/home/blog" component={Blog}/>
                <Route path="/home" component={RightSide}/>
            </div>
            <Switch>
                <Route exact path={(window.location.pathname === '/home/store/upload') ? store : blog} component={UploadModal}/>
                <Route path="/home/store/:id" render={({ match }) => (
                    <HomeCardModal match={match} />
                )}/>
                <Route path="/home/blog/:id" component={ThreadCardModal} />
            </Switch>
        </div>
    )
}

export default withRouter(MainPage)