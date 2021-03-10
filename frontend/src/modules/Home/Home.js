import React, { useEffect } from 'react'
import './Home.css';
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';
import { UserInfo } from '../UserInfoContext'

function Home({ fetchItems, setItems, items}) {
  const { homeFilter } = UserInfo()

  useEffect(() => {
    fetchItems(setItems)
  }, [])

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
        {items.filter(card => checkFilter(card)).map(item => {
          return (
            <Link key={item._id} to={`/home/store/${item._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <HomeCard key={item._id} cardTitle={item.name} cardPrice={item.price} sellerName={item.seller} image={item.thumbnail.images}/>
            </Link>
          )
        })}
      </div>
    </>
  )

}

export default Home