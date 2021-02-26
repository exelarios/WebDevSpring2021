import React, { Component } from 'react'
import FilterBox from './FilterBox'
import UploadModal from './UploadModal'
import './RightSide.css'
import { Route, Link } from 'react-router-dom'

class RightSide extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef();
        this.state = {
        }
    }

    render() {
        const store = '/home/store/upload'
        const blog = '/home/blog/upload'
        return (
            <>
                <div className="rightside">
                    <div>
                        <FilterBox />
                        <Link to={(this.props.location.pathname === '/home/store') ? store : blog}>
                            <button id="homeUpload" className="uploadItem siteButton">Upload</button>
                        </Link>
                    </div>
                    <div id="userInfo">
                        <p>Account:</p>
                        <p>[nickname]</p>
                    </div>
                </div>
            </>
          )
    }
  }

export default RightSide