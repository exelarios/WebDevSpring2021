import React, { useState, useEffect } from 'react'
import SideNav from './SideNav/SideNav';
import Home from './Home/Home';
import RightSide from './RightSide/RightSide';
import Blog from './Blog/Blog';
import SearchBar from './SearchBar/SearchBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import UploadModal from './RightSide/UploadModal';
import HomeCardModal from './Home/HomeCardModal';
import ThreadCardModal from './Blog/ThreadCardModal';
import { UserInfo } from './UserInfoContext'
import axios from 'axios'

export const API_URL = 'http://localhost:5000'

function MainPage() {
    const [sideNavActive, setSideNavActive] = useState(true)
    const [isTop, setisTop] = useState(true)
    const [items, setItems] = useState([]);
    const { token } = UserInfo()

    

    const closeSideNav = () => {
        setSideNavActive(false)
    }

    const openSideNav = () => {
        setSideNavActive(true)
    }

    const fetchItems = async pageFunction => {
        let secondResponse = []
        let index = 0
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
    
      const firstResponse = await axios.get('http://localhost:5000/api/items/search?page=1',
        settings)
        .then(response => {
        console.log(response.data)
          return response.data.items
        }, (error) => {
          console.error(error)
          return []
        })
    
        if(firstResponse !== undefined) {
          firstResponse.forEach(item => {
            secondResponse[index] = axios.get(`http://localhost:5000/api/users/${item.seller}`, settings).then(response => {{
              return response
            }}, (error) => {
              console.error(error)
              return "Deleted User"
            })
            index++
          })
        }
        axios.all(secondResponse).then(axios.spread((...responses) => {
          for(let counter = 0; counter < responses.length; counter++) {
            if(responses[counter] !== "Deleted User") {
              firstResponse[counter].seller = `${responses[counter].data.firstName} ${responses[counter].data.lastName}`
            } else {
              firstResponse[counter].seller = responses[counter]
            }
          }
          pageFunction(firstResponse)
        })).catch(errors => {
          console.error(errors)
        })
    }

    const checkTop = () => {
        const valueisTop = window.scrollY < 30
        setisTop(valueisTop)
    }

    useEffect(() => {
        window.addEventListener('scroll', checkTop);

        return function cleanup() {
            window.removeEventListener('scroll', checkTop)
        }
    }, []) 
        
    

    const store = '/home/store/upload'
    const blog = '/home/blog/upload'

    return (
        <div id="mainPage">
            <SearchBar sideNavActive={sideNavActive} openSideNav={openSideNav} isTop={isTop} />
            <SideNav sideNavActive={sideNavActive} />
            <div onClick={closeSideNav}id="mainContainer">
                <div id="buffer"></div>
                <Route path="/home/store" render={() => (
                    <Home fetchItems={fetchItems} items={items} setItems={setItems}/>
                )}/>
                <Route path="/home/blog" component={Blog}/>
                <Route path="/home" component={RightSide}/>
            </div>
            <Switch>
                <Route exact path={(window.location.pathname === '/home/store/upload') ? store : blog} component={UploadModal}/>
                <Route path="/home/store/:id" render={({ match }) => (
                    <HomeCardModal match={match} fetchItems={fetchItems} setItems={setItems}/>
                )}/>
                <Route path="/home/blog/:id" component={ThreadCardModal} />
            </Switch>
        </div>
    )
}

export default withRouter(MainPage)