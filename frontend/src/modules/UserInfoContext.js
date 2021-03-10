import React, { useContext, useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import jwt_decode from "jwt-decode";

const UserInfoContext = React.createContext()
const UserInfoUpdateContext = React.createContext()
const HomeFilterUpdateContext = React.createContext()
const BlogFilterUpdateContext = React.createContext()

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

export function UserInfoProvider({ children }) {
    const [token, setToken] = useLocalStorage('token')
    const [name, setName] = useLocalStorage('name')
    const [id, setId] = useLocalStorage('id')
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

    const[homeFilter, setHomeFilter] = useState(homeObjectArray);
    const[blogFilter, setBlogFilter] = useState(blogObjectArray);

    function updateUser(data) {
        let decodedToken = jwt_decode(data.token)
        console.log(jwt_decode(data.token))
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

    return (
        <UserInfoContext.Provider value={{ token, name, id, homeFilter, blogFilter }}>
            <UserInfoUpdateContext.Provider value={updateUser}>
                <HomeFilterUpdateContext.Provider value={updateHomeFilter}>
                    <BlogFilterUpdateContext.Provider value={updateBlogFilter}>
                        {children}
                    </BlogFilterUpdateContext.Provider>
                </HomeFilterUpdateContext.Provider>
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>
    )
}