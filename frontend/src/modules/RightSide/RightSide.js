import React from 'react';
import FilterBox from './FilterBox';
import './RightSide.css';
import { Link } from 'react-router-dom';
import { UserInfo } from '../UserInfoContext';

function RightSide() {

    const { name } = UserInfo();
    const store = '/home/store/upload'
    const blog = '/home/blog/upload'

    return (
        <>
            <div className="rightside">
                <div>
                    <FilterBox />
                    <Link to={(window.location.pathname === '/home/store') ? store : blog}>
                        <button id="homeUpload" className="uploadItem siteButton">Upload</button>
                    </Link>
                </div>
                <div id="userInfo">
                    <p>Hello, </p>
                    <p>{name}</p>
                </div>
            </div>
        </>
        )
  }

export default RightSide