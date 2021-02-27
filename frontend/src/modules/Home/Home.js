import React, { useState, useEffect } from 'react'
import './Home.css';
import HomeCard from './HomeCard';
import axios from 'axios'
import { Link, Route } from 'react-router-dom';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const settings = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzg4NzBiMzEyNTkwNzVmYjQ3MDUxNCIsImlhdCI6MTYxNDM4NDQ3MSwiZXhwIjoxNjE0NDcwODcxfQ.ddB0NlNVNemn9FntIvpNT6-Y19ffLP-OLXx31gFP3jU"
        }
    }

    const firstResponse = await axios.get('http://localhost:5000/api/items/search',
      settings)
      .then(response => {
        return response.data.items
      }, (error) => {
      console.error(error)
    })

/*     console.log(firstResponse)
    firstResponse.map(items => {
      axios.get(`http://localhost:5000/api/users/${items.seller}`,
      settings)
      .then(response => {
        items.seller = `${response.data.firstName} ${response.data.lastName}`
      })
    }) */
    
    setItems(firstResponse)
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