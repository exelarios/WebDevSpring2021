import React, { Component } from 'react'
import EntryPage from './EntryPage/EntryPage';
import SideNav from './SideNav/SideNav';
import Home from './Home/Home';
import RightSide from './RightSide/RightSide';
import Blog from './Blog/Blog';
import SearchBar from './SearchBar/SearchBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.EntryPage = React.createRef();
        this.state = { 
            active: true,
            activeEntryPage: false,
            homeActive: false,
            blogActive: true,
            sideNavActive: true,
            isTop: true
        }
    }

    openFirstPage = () => {
        this.setState({
            activeEntryPage: true,
            active: false
        })
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


    toggleHomePage = () => {
        this.setState({
            homeActive: true,
            blogActive: false
        })
    }

    toggleBlogPage = () => {
        this.setState({
            homeActive: false,
            blogActive: true
        })
    }

    componentDidMount() {
        document.addEventListener('scroll', () =>{
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
            <Router>
                <EntryPage ref={this.EntryPage} activeEntryPage={this.state.activeEntryPage}/>
                <div id="mainPage" style={{display: (this.state.active) ? 'block' : 'none'}}>
                    <SearchBar sideNavActive={this.state.sideNavActive} openSideNav={this.openSideNav} isTop={this.state.isTop} />
                    <SideNav openFirstPage={this.openFirstPage} sideNavActive={this.state.sideNavActive} toggleHomePage={this.toggleHomePage} toggleBlogPage={this.toggleBlogPage}/>
                    <div onClick={this.closeSideNav}id="mainContainer">
                        <div id="buffer"></div>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/blog" component={Blog}/>
                        </Switch>
                        <RightSide homeActive={this.state.homeActive} blogActive={this.state.blogActive}/>
                    </div>
                </div>
            </Router>
        )
    }
}

export default MainPage