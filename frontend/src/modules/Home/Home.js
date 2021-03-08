import React, { useState, useEffect } from 'react'
import './Home.css';
import HomeCard from './HomeCard';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { UserInfo } from '../UserInfoContext'

function Home() {
  const [items, setItems] = useState([]);
  const { token, homeFilter } = UserInfo()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    let secondResponse = []
    let index = 0
    const settings = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

  const firstResponse = await axios.get('http://localhost:5000/api/items/search',
    settings)
    .then(response => {
      console.log(response.data.items)
      return response.data.items
    }, (error) => {
      console.error(error)
      return []
    })

    if(firstResponse !== undefined) {
      firstResponse.forEach(item => {
        secondResponse[index] = axios.get(`http://localhost:5000/api/users/${item.seller}`, settings)
        index++
      })
    }

    axios.all(secondResponse).then(axios.spread((...responses) => {
      for(let counter = 0; counter < responses.length; counter++) {
        firstResponse[counter].seller = `${responses[counter].data.firstName} ${responses[counter].data.lastName}`
      }
      setItems(firstResponse)
    })).catch(errors => {
      console.error(errors)
    })
  }

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
              <HomeCard key={item._id} cardTitle={item.name} cardPrice={item.price} sellerName={item.seller}/>
            </Link>
          )
        })}
      </div>
    </>
  )

}

export default Home