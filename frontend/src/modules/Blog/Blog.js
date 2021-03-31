import React, { useCallback, useRef, useState } from 'react';
import './Blog.css';
import ThreadCard from './ThreadCard';
import { Link } from 'react-router-dom';
import { UserInfo, BlogPageNumberUpdate } from '../UserInfoContext';
import LoadingAnimation from "../../5.svg";


function Blog() {
  const { blogFilter, blogLoading, blogHasMore, threads } = UserInfo();
  const setPageNumber = BlogPageNumberUpdate()
  const observe = useRef();

  const lastBookElementRef = useCallback(node => {
    if(blogLoading) return;
    if(observe.current) observe.current.disconnect()
    observe.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && blogHasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if(node) observe.current.observe(node);
  }, [blogLoading, blogHasMore]);

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
        {threads.filter(card => checkFilter(card)).map((thread, index) => {
          if(threads.length === index + 1) {
            return (
              <Link ref={lastBookElementRef} key={thread._id} to={`/home/blog/${thread._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <ThreadCard title={ thread.title } author={ thread.postBy } topic={ thread.topic } summary={ thread.body }/>
              </Link>
            )
          } else {
            return (
              <Link key={thread._id} to={`/home/blog/${thread._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <ThreadCard key={thread._id} title={ thread.title } author={ thread.postBy } topic={ thread.topic } summary={ thread.body }/>
              </Link>
            )
          }
        }).reverse()}
      </div>
      {blogLoading ? (
        <div className="container loadPage">
          <img src={LoadingAnimation}></img>
          Loading...
        </div>
        ) : (null)
      }
    </>
  );
}

export default Blog