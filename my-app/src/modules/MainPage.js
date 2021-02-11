import React, { Component } from 'react'
import EntryPage from './EntryPage/EntryPage';
import SideNav from './SideNav/SideNav';
import Home from './Home/Home';
import RightSide from './RightSide/RightSide';
import Blog from './Blog/Blog';
import SearchBar from './SearchBar/SearchBar';

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
            <>
                <EntryPage ref={this.EntryPage} activeEntryPage={this.state.activeEntryPage}/>
                <div id="MainPage" style={{display: (this.state.active) ? 'block' : 'none'}}>
                    <SearchBar sideNavActive={this.state.sideNavActive} openSideNav={this.openSideNav} isTop={this.state.isTop} />
                    <SideNav openFirstPage={this.openFirstPage} sideNavActive={this.state.sideNavActive}/>
                    <div onClick={this.closeSideNav}id="mainContainer">
                        <div id="buffer"></div>
                        <Home />
                        <Blog />
                        <RightSide />
                    </div>
                </div>
            </>
        )
    }
}

export default MainPage