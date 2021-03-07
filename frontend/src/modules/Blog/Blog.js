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

    axios.get(API_URL + '/api/posts/search', 
      settings)
      .then(response => {
        setThreads(response.data.posts)
      }, (error) => {
        console.error(error)
        return []
      })
  };
  
  return (
    <>
      <div className="container" id="blogPage">
        {threads.map(thread => {
            return (
              <Link key={thread._id} to={`/home/blog/${thread._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <ThreadCard title={ thread.title } author={ thread.postBy } topic={ thread.topic } summary={ thread.body }/>
              </Link>
            )
        })}
      </div>
    </>
  );
  
}

export default Blog