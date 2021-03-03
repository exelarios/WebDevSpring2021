import React, { useState, useEffect } from 'react'
import './Home.css';
import HomeCard from './HomeCard';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { UserInfo } from '../UserInfoContext'

function Home() {
  const [items, setItems] = useState([]);
  const { token } = UserInfo()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    let secondResponse = []
    let index = 0
    const settings = {
        headers: {
            "Content-Type": "application/json",
<<<<<<< HEAD
            Authorization: "Bearer " + token
=======
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzg4NzBiMzEyNTkwNzVmYjQ3MDUxNCIsImlhdCI6MTYxNDM4NDQ3MSwiZXhwIjoxNjE0NDcwODcxfQ.ddB0NlNVNemn9FntIvpNT6-Y19ffLP-OLXx31gFP3jU"
>>>>>>> e0304679790c273f2ad2a1d748b82bfb47bf2b7f
        }
    }

    const firstResponse = await axios.get('http://localhost:5000/api/items/search',
      settings)
      .then(response => {
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

    return (
      <>
        <div className="container" id="homePage">
          {items.map(item => {
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