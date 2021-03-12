import React, { useEffect } from 'react';
import './Blog.css';
import ThreadCard from './ThreadCard';
import { Link } from 'react-router-dom';
import { UserInfo } from '../UserInfoContext'

function Blog({ fetchThreads, setThreads, threads }) {
  const { blogFilter } = UserInfo();

  useEffect(() => {
    fetchThreads(setThreads)
  }, [])

  const checkFilter = card => {
    let boolean = true;
    for(let i = 0; i < blogFilter.length; i++) {
      if(blogFilter[i].checked) {
        boolean = false;
        break;
      }
    }
    
    if(!boolean) {
      blogFilter.forEach(item => {
        if(item.checked && card.topic === item.category) {
          boolean = true;
        }
      })
    }
    return boolean
  }
  
  return (
    <>
      <div className="container" id="blogPage">
        {threads.filter(card => checkFilter(card)).map(thread => {
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