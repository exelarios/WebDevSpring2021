import React, { Component } from 'react'
import EntryPage from './EntryPage/EntryPage';
import SideNav from './SideNav/SideNav';
import Home from './Home/Home';
import RightSide from './RightSide/RightSide';
import Blog from './Blog/Blog';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.EntryPage = React.createRef();
        this.state = { 
            active: true,
            activeEntryPage: false,
            homeActive: false,
            blogActive: true,
        }
    }

    openFirstPage = () => {
        this.setState({
            activeEntryPage: true,
            active: false
        })
    }

    render() {
        return (
            <>
                <EntryPage ref={this.EntryPage} activeEntryPage={this.state.activeEntryPage}/>
                <div id="MainPage" style={{display: (this.state.active) ? 'block' : 'none'}}>
                    <SideNav openFirstPage={this.openFirstPage} />
                    <Home />
                    <Blog />
                    <RightSide />
                </div>
            </>
        )
    }
}

export default MainPage