import React, { Component } from 'react'
import SideNav from './SideNav/SideNav';
import Home from './Home/Home';
import RightSide from './RightSide/RightSide';
import Blog from './Blog/Blog';
import SearchBar from './SearchBar/SearchBar';
import { Route } from 'react-router-dom';
import axios from 'axios'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sideNavActive: true,
            isTop: true,
            items: null
        }
    }

    closeSideNav = () => {
        this.setState({
            sideNavActive: false
        })
    }

    openSideNav = () => {
        this.setState({
            sideNavActive: true
        })
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 30
            if(isTop !== this.state.isTop) {
                this.setState({
                    isTop: isTop
                })
            }
        });
    }


    render() {
        return (
            <div id="mainPage">
                <SearchBar sideNavActive={this.state.sideNavActive} openSideNav={this.openSideNav} isTop={this.state.isTop} />
                <SideNav sideNavActive={this.state.sideNavActive} toggleHomePage={this.toggleHomePage} toggleBlogPage={this.toggleBlogPage}/>
                <div onClick={this.closeSideNav}id="mainContainer">
                    <div id="buffer"></div>
                    <Route path="/home/store" component={Home}/>
                    <Route path="/home/blog" component={Blog}/>
                    <Route path="/home" component={RightSide}/>
                </div>
            </div>
        )
    }
}

export default MainPage