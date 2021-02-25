import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import UploadItem from './UploadItem'
import UploadQuestion from './UploadQuestion';

class UploadModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() {
        const store = '/home/store'
        const blog = '/home/blog'
        return (
            <div className="modalScreen">
                <div className="modal uploadModal">
                    <Switch>
                        <Route path="/home/store/upload" component={UploadItem}/>
                        <Route path="/home/blog/upload" component={UploadQuestion}/>
                    </Switch>
                </div>
                <Link to={(this.props.location.pathname === '/home/store/upload') ? store : blog}>
                    <span className="exitButton"></span>
                </Link>
                
            </div>
        )
    }
}

export default UploadModal