import React, { useContext, useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import jwt_decode from "jwt-decode";
import useRenderStorePage from './hooks/useRenderStorePage'
import useRenderBlogPage from './hooks/useRenderBlogPage'

const UserInfoContext = React.createContext();
const UserInfoUpdateContext = React.createContext();
const HomeFilterUpdateContext = React.createContext();
const BlogFilterUpdateContext = React.createContext();
const StorePageNumberUpdateContext = React.createContext();
const BlogPageNumberUpdateContext = React.createContext();
const RefreshStoreContext = React.createContext();
const NameQueryUpdateContext = React.createContext();

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

export function StorePageNumberUpdate() {
    return useContext(StorePageNumberUpdateContext)
}

export function BlogPageNumberUpdate() {
    return useContext(BlogPageNumberUpdateContext)
}

export function RefreshStore() {
    return useContext(RefreshStoreContext)
}

export function NameQueryUpdate() {
    return useContext(NameQueryUpdateContext)
}

export function UserInfoProvider({ children }) {

    //Object array representing the filters and their given states
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

    const [token, setToken] = useLocalStorage('token');
    const [name, setName] = useLocalStorage('name');
    const [id, setId] = useLocalStorage('id');
    const [homeFilter, setHomeFilter] = useState(homeObjectArray);
    const [blogFilter, setBlogFilter] = useState(blogObjectArray);
    const [pageRefresh, setPageRefresh] = useState(false)
    //Home Page states
    const [items, setItems] = useState([]);
    const [storePageNumber, setStorePageNumber] = useState(1);
    const [storeName, setStoreName] = useState("");
    const [storeCategory, setStoreCategory] = useState("");
    //Blog Page states
    const [threads, setThreads] = useState([]);
    const [blogPageNumber, setBlogPageNumber] = useState(1);
    const [blogName, setBlogName] = useState("");
    const [blogCategory, setBlogCategory] = useState("");

    const { storeLoading, storeHasMore } = useRenderStorePage(token, setItems, storePageNumber, storeName, storeCategory, setPageRefresh, pageRefresh);
    const { blogLoading, blogHasMore } = useRenderBlogPage(token, setThreads, blogPageNumber, blogName, blogCategory);

    function refreshStorePage() {
        setItems([]);
        setStoreName("");
        setStoreCategory("");
        setStorePageNumber(1);
        setPageRefresh(true);
    }

    function updateUser(data) { 
        let decodedToken = jwt_decode(data.token);
        setToken(data.token);
        setName(`${decodedToken.firstName} ${decodedToken.lastName}`);
        setId(decodedToken.id);
    }

    function updateHomeFilter(filter) {
        setHomeFilter(filter);
    }

    function updateBlogFilter(filter) {
        setBlogFilter(filter);
    }

    function updateStorePageNumber(page) {
        setStorePageNumber(page);
    }

    function updateBlogPageNumber(page) {
        setBlogPageNumber(page);
    }

    function updateNameQuery(pageType, nameQuery) {
        if(pageType === "store") {
            setItems([]);
            setStoreName(nameQuery);
        } else {
            setThreads([]);
            setBlogName(nameQuery);
        }
    }

    return (
        <UserInfoContext.Provider value={{ token, name, id, homeFilter, blogFilter, storePageNumber, items, storeLoading, storeHasMore, threads, blogLoading, blogHasMore}}>
            <UserInfoUpdateContext.Provider value={updateUser}>
                <HomeFilterUpdateContext.Provider value={updateHomeFilter}>
                    <BlogFilterUpdateContext.Provider value={updateBlogFilter}>
                        <StorePageNumberUpdateContext.Provider value={updateStorePageNumber}>
                            <RefreshStoreContext.Provider value={refreshStorePage}>
                                <NameQueryUpdateContext.Provider value={updateNameQuery}>
                                    <BlogPageNumberUpdateContext.Provider value={updateBlogPageNumber}>
                                        {children}
                                    </BlogPageNumberUpdateContext.Provider>
                                </NameQueryUpdateContext.Provider>
                            </RefreshStoreContext.Provider>
                        </StorePageNumberUpdateContext.Provider>
                    </BlogFilterUpdateContext.Provider>
                </HomeFilterUpdateContext.Provider>
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>
    )
}