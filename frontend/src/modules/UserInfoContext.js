import React, { useContext, useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import jwt_decode from "jwt-decode";
import axios from 'axios'

const UserInfoContext = React.createContext()
const UserInfoUpdateContext = React.createContext()
const HomeFilterUpdateContext = React.createContext()
const BlogFilterUpdateContext = React.createContext()
const ItemsUpdateContext = React.createContext()
const ThreadsUpdateContext = React.createContext()
const FetchItemsContext = React.createContext()

export function UserInfo() {
    return useContext(UserInfoContext)
}

export function UserInfoUpdate() {
    return useContext(UserInfoUpdateContext)
}

export function HomeFilterUpdate() {
    return useContext(HomeFilterUpdateContext)
}

export function BlogFilterUpdate() {
    return useContext(BlogFilterUpdateContext)
}

export function ItemsUpdate() {
    return useContext(ItemsUpdateContext)
}

export function ThreadsUpdate() {
    return useContext(ThreadsUpdateContext)
}

export function FetchItems() { //Fetches item array for home
    return useContext(FetchItemsContext)
}

export function UserInfoProvider({ children }) {
    const homeObjectArray = [
        {
            category: "Apparel",
            checked: false,
            id: 0
        },
        {
            category: "Electronics",
            checked: false,
            id: 1
        },
        {
            category: "Books",
            checked: false,
            id: 2
        },
        {
            category: "Lab Equipment",
            checked: false,
            id: 3
        },
        {
            category: "Others",
            checked: false,
            id: 4
        }
    ]

    const blogObjectArray = [
        {
            category: "Housing",
            checked: false,
            id: 0
        },
        {
            category: "Classes",
            checked: false,
            id: 1
        },
        {
            category: "Items",
            checked: false,
            id: 2
        },
        {
            category: "Events",
            checked: false,
            id: 3
        },
        {
            category: "Others",
            checked: false,
            id: 4
        }
    ]

    const [token, setToken] = useLocalStorage('token')
    const [name, setName] = useLocalStorage('name')
    const [id, setId] = useLocalStorage('id')
    const [items, setItems] = useState([])
    const [threads, setThreads] = useState([])
    const [homeFilter, setHomeFilter] = useState(homeObjectArray);
    const [blogFilter, setBlogFilter] = useState(blogObjectArray);

    
    const fetchItems = async pageFunction => { //Grabs all items, grabs a user depending on each item's id and returns the name to the item
        let secondResponse = []
        let index = 0
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
    
      const firstResponse = await axios.get('http://localhost:5000/api/items/search?page=2',
        settings)
        .then(response => {
          return response.data.items
        }, (error) => {
          console.error(error)
          return []
        })
    
        if(firstResponse !== undefined) {
          firstResponse.forEach(item => {
            secondResponse[index] = axios.get(`http://localhost:5000/api/users/${item.seller}`,
            settings)
            .then(response => {{
              return response
            }}, (error) => {
              return "Deleted User"
            })
            index++
          })
        }
        axios.all(secondResponse).then(axios.spread((...responses) => {
          for(let counter = 0; counter < responses.length; counter++) {
            if(responses[counter] !== "Deleted User") {
              firstResponse[counter].seller = `${responses[counter].data.firstName} ${responses[counter].data.lastName}`
              firstResponse[counter].thumbnail.main = `${responses[counter].data.picture}`
            } else {
              firstResponse[counter].seller = responses[counter]
            }
          }
          pageFunction(firstResponse)
        })).catch(errors => {
          console.error(errors)
        })
    }

    function updateUser(data) { 
        let decodedToken = jwt_decode(data.token)
        setToken(data.token)
        setName(`${decodedToken.firstName} ${decodedToken.lastName}`)
        setId(decodedToken.id)
        
    }

    function updateHomeFilter(filter) {
        setHomeFilter(filter)
    }

    function updateBlogFilter(filter) {
        setBlogFilter(filter)
    }

    function updateItems(data) {
        setItems(data)
    }

    function updateThreads(data) {
        setThreads(data)
    }

    return (
        <UserInfoContext.Provider value={{ token, name, id, homeFilter, blogFilter, items, threads }}>
            <UserInfoUpdateContext.Provider value={updateUser}>
                <HomeFilterUpdateContext.Provider value={updateHomeFilter}>
                    <BlogFilterUpdateContext.Provider value={updateBlogFilter}>
                        <ItemsUpdateContext.Provider value={updateItems}>
                            <ThreadsUpdateContext.Provider value={updateThreads}>
                                <FetchItemsContext.Provider value={fetchItems}>
                                    {children}
                                </FetchItemsContext.Provider>
                            </ThreadsUpdateContext.Provider>
                        </ItemsUpdateContext.Provider>
                    </BlogFilterUpdateContext.Provider>
                </HomeFilterUpdateContext.Provider>
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>
    )
}