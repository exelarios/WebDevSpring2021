import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Blog.css';
import ThreadCard from './ThreadCard';
import { UserInfo } from '../UserInfoContext'

import { API_URL } from '../MainPage';

function Blog() {
  const [threads, setThreads] = useState([]);
  const { token } = UserInfo()

  useEffect(() => {
    fetchThreads()
  }, [])

  const fetchThreads = async () => {
    const settings = {
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
      }
    }

    axios.get(API_URL + '/api/items/search', 
      settings)
      .then(response => {
        setThreads(response.data.items)
      }, (error) => {
        console.error(error)
      })
  };
  
  return (
    <>
      <div className="container" id="blogPage">
        {threads.map(thread => {
            return (
              <Link key={thread._id} to={`/home/blog/${thread._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <ThreadCard title={ thread.name } author={ thread.seller } topic={ thread.category } summary={ thread.description }/>
              </Link>
            )
        })}
      </div>
    </>
  );
  
}

export default Blog