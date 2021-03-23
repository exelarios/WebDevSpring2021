import React, { useCallback, useRef } from 'react'
import './Home.css';
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { UserInfo, StorePageNumberUpdate } from '../UserInfoContext'
import LoadingAnimation from '../../5.svg'


function Home() {
  const { homeFilter, storeLoading, storeHasMore, items } = UserInfo()
  const setPageNumber = StorePageNumberUpdate()
  
  const observer = useRef()

  const lastBookElementRef = useCallback(node => {
      if(storeLoading) return 
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && storeHasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1)
        }
      })
      if(node) observer.current.observe(node)
  }, [storeLoading, storeHasMore])

  const checkFilter = card => {
    let boolean = true;
    for(let i = 0; i < homeFilter.length; i++) {
      if(homeFilter[i].checked) {
        boolean = false
        break
      }
    }
    
    if(!boolean) {
      homeFilter.forEach(item => {
        if(item.checked && card.category === item.category) {
          boolean = true
        }
      })
    }
    return boolean
  }

  return (
    <>
      <div className="container" id="homePage">
        {items.filter(card => checkFilter(card)).map((item, index) => {
          if(items.length === index + 1) {
            return (
              <Link ref={lastBookElementRef} key={item._id} to={`/home/store/${item._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <HomeCard key={item._id} cardTitle={item.name} cardPrice={item.price} sellerName={item.seller} sellerPhoto={item.thumbnail.main} image={item.thumbnail.images}/>
              </Link>
            )
          } else {
            return (
              <Link key={item._id} to={`/home/store/${item._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <HomeCard key={item._id} cardTitle={item.name} cardPrice={item.price} sellerName={item.seller} sellerPhoto={item.thumbnail.main} image={item.thumbnail.images}/>
              </Link>
            )
          }
        })}
      </div>
      {storeLoading ? (
          <div className="container loadPage">
              <img src={LoadingAnimation}></img>
              Loading...
          </div>
          ) : (null)
      }
    </>
  )

}

export default Home